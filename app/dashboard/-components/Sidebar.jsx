"use client";
import React from 'react';

import { IoHomeOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { GiArmorUpgrade } from "react-icons/gi";
import { FaWpexplorer } from "react-icons/fa";
import Link from 'next/link'; // Correct import
import { Progress } from '@/components/ui/progress';

const SideBar = () => {
  const Menu = [
    {
      id: 1,
      name: "Home",
      icon: <IoHomeOutline />,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Explore",
      icon: <FaWpexplorer />,
      path: "/dashboard/explore",
    },
    {
      id: 3,
      name: "Upgrade",
      icon: <GiArmorUpgrade />,
      path: "/dashboard/upgrade",
    },
    {
      id: 4,
      name: "Logout",
      icon: <FiLogOut />,
      path: "/dashboard/logout",
    },
  ];

  return (
    <div className="fixed h-full p-5 shadow-md hidden md:block md:w-64">
      <div className="text-purple-600 font-bold text-xl">Gen_Course</div>
      <hr className="my-5" />

      <ul >
        {Menu.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-3 my-3 p-2 cursor-pointer text-gray-600 hover:bg-gray-200 hover:rounded-md"
          >
            <Link href={item.path} className="flex items-center gap-3 w-full">
              <div className="text-2xl">{item.icon}</div>
              <div>{item.name}</div>
            </Link>
          </li>
        ))}
      </ul>
      
      <div className="absolute bottom-10 w-[80%]">
        <Progress value={33} />
      </div>
    </div>
  );
};

export default SideBar;
