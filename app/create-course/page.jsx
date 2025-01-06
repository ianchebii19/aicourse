'use client';

import { Button } from '@/components/ui/button';
import React, { useContext, useEffect, useState } from 'react';
import { HiMiniSquares2X2 } from 'react-icons/hi2';
import { MdTopic } from 'react-icons/md';
import { SlOptionsVertical } from 'react-icons/sl';
import SelectCategory from './-components/SelectCategories';
import Topic from './-components/Topic';
import Option from './-components/Option';
import { UserInputContext } from '../_context/UserContext';
import { GenerateCourseLayout_AI } from '@/configs/AiModel';
import { CourseList } from '@/configs/schema';

import { useUser } from '@clerk/nextjs';
import { db } from '@/configs/db';
import { v4 as uuidv4 } from 'uuid'; // Importing uuid library
import { useRouter } from 'next/router';

const CreateCourse = () => {
  const StepperOptions = [
    { id: 1, name: 'Category', icon: <HiMiniSquares2X2 /> },
    { id: 2, name: 'Topic', icon: <MdTopic /> },
    { id: 3, name: 'Option', icon: <SlOptionsVertical /> },
  ];

  const { userCourseInput } = useContext(UserInputContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const { user } = useUser();
  const router = useRouter();

  const generateCourseLayout = async () => {
    try {
      const BASIC_PROMPT =
        'Generate a course tutorial with the following details including fields such as Course Name, Description, Chapter Name, About, Duration.';
      const USER_INPUT_PROMPT = `
        Category: ${userCourseInput?.category || 'N/A'}, 
        Topic: ${userCourseInput?.topic || 'N/A'}, 
        Level: ${userCourseInput?.level || 'N/A'}, 
        Duration: ${userCourseInput?.duration || 'N/A'}, 
        No. of Chapters: ${userCourseInput?.noOfChapters || 'N/A'}
      `;
      const FINAL_PROMPT = `${BASIC_PROMPT}\n${USER_INPUT_PROMPT}`;

      console.log('Prompt sent to AI:', FINAL_PROMPT);
      const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
      const parsedResult = JSON.parse(result.response?.text() || '{}');
      console.log('AI-generated course layout:', parsedResult);

      await saveCourseLayoutInDB(parsedResult);
    } catch (error) {
      console.error('Error generating course layout:', error);
    }
  };

  const saveCourseLayoutInDB = async (courseLayout: any) => {
    try {
      const id = uuidv4(); // Generate a unique course ID

      const result = await db.insert(CourseList).values([
        {
          courseId: id,
          name: userCourseInput?.topic ?? '',
          level: userCourseInput?.level ?? '',
          category: userCourseInput?.category ?? '',
          courseOutput: courseLayout, // Fixed property name
          createdBy: user?.primaryEmailAddress?.emailAddress ?? '',
          userName: user?.fullName ?? '',
          userProfileImage: user?.imageUrl ?? '',
        },
      ]);

      console.log('Course layout saved successfully:', result);
      router.replace(`/create-course/${id}`);
    } catch (error) {
      console.error('Error saving course layout:', error);
    }
  };

  return (
    <div>
      <div className="flex flex-col text-xl justify-center m-10 items-center">
        <h2 className="text-primary text-2xl font-bold">Create Course</h2>
        <div className="flex">
          {StepperOptions.map((item, index) => (
            <div className="flex items-center" key={item.id}>
              <div className="flex flex-col items-center w-[50px] md:w-[100px]">
                <div
                  className={`bg-gray-300 text-white rounded-full p-2 ${
                    activeIndex >= index && 'bg-purple-600'
                  }`}
                >
                  {item.icon}
                </div>
                <div>
                  <h2 className="text-center">{item.name}</h2>
                </div>
              </div>
              {index < StepperOptions.length - 1 && (
                <div className="h-1 w-[50px] md:w-[100px] lg:w-[170px] bg-gray-300 rounded-full"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-10 md:px-20 lg:px-40">
        {activeIndex === 0 && <SelectCategory />}
        {activeIndex === 1 && <Topic />}
        {activeIndex === 2 && <Option />}
        <div className="flex justify-between mt-4">
          <Button
            disabled={activeIndex === 0}
            onClick={() => setActiveIndex(activeIndex - 1)}
          >
            Previous
          </Button>
          {activeIndex < 2 ? (
            <Button onClick={() => setActiveIndex(activeIndex + 1)}>
              Next
            </Button>
          ) : (
            <Button onClick={generateCourseLayout}>Generate Course</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
