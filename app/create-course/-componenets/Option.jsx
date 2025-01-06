import React, { useContext } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { UserInputContext } from '@/app/_context/UserContext';

const Option = () => {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleInputChange = (fieldName: string, value: string | number) => {
    setUserCourseInput((prev: any) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <div className="px-10 md:px-20 lg:px-44 mb-30">
      <div className="grid grid-cols-2 gap-10">
        {/* Difficulty Level */}
        <div>
          <label htmlFor="difficulty-level">Difficulty Level</label>
          <Select onValueChange={(value) => handleInputChange('level', value)}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="expert">Expert</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Course Duration */}
        <div>
          <label htmlFor="course-duration">Course Duration</label>
          <Select onValueChange={(value) => handleInputChange('duration', value)}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1 Hour">1 Hour</SelectItem>
              <SelectItem value="2 Hours">2 Hours</SelectItem>
              <SelectItem value="More than 3 Hours">More than 3 Hours</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Add Video */}
        <div className="my-10">
          <label htmlFor="add-video">Add Video</label>
          <Select onValueChange={(value) => handleInputChange('display', value)}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Number of Chapters */}
        <div className="my-10">
          <label htmlFor="number-of-chapters">Number of Chapters</label>
          <Input
            type="number"
            placeholder="Enter number of chapters"
            onChange={(e) => handleInputChange('noOfChapters', parseInt(e.target.value, 10))}
          />
        </div>
      </div>
    </div>
  );
};

export default Option;
