import { UserInputContext } from '@/app/_context/UserContext';
import CategoryList from '@/app/_shared/CategoryList';
import React, { useContext, useState } from 'react';

const SelectCategory = () => {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleCategoryChange = (category: string) => {
    setUserCourseInput((prev: any) => ({
      ...prev,
      category: category,
    }));
  };

  return (
    <div>
      <h2>Select topic categories</h2>
      <div className="grid grid-cols-3 gap-8 sm:mx-10 md:m-10">
        {CategoryList.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col border bg-slate-100 p-8 rounded-xl hover:bg-purple-200 ${userCourseInput?.category==item.name&& 'bg-purple-200'}`}
            onClick={() => handleCategoryChange(item.name)}
          >
            <div className="items-center text-xl mb-4">{item.icon}</div>
            <h2>{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectCategory;
