import { UserInputContext } from '@/app/_context/UserContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React, { useContext } from 'react';

const Topic = () => {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleInputChange = (fieldName: string, value: string) => {
    setUserCourseInput((prev: any) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <div>
      <div className="my-10 mx-16 lg:mx-44">
        <label htmlFor="topic">
          Write the topic which you want to generate (e.g., Python, Java, etc.)
        </label>
        <Input
          id="topic"
          placeholder="Topic"
          value={userCourseInput.topic || ''}
          onChange={(e) => handleInputChange('topic', e.target.value)}
        />
      </div>
      <div className="my-10 mx-16 lg:mx-44">
        <label htmlFor="courseDetails">
          Tell what to include in your course (Optional)
        </label>
        <Textarea
          id="courseDetails"
          placeholder="About your course"
          value={userCourseInput.courseDetails || ''}
          onChange={(e) => handleInputChange('courseDetails', e.target.value)}
        />
      </div>
    </div>
  );
};

export default Topic;
