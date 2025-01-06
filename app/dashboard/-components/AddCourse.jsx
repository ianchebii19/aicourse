'use client'
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';
const AddCourse = () => {
  const { user } = useUser();

  return (
    <div>
      <div className='flex items-center justify-between p-5 '>
        <h3 className='text-xl'>Hello, {user?.fullName}</h3>
        <Link href='/create-course'>
        <Button className='mt-4 text-md'>
          +Create AI Course
        </Button>
        </Link>
      </div>
    </div>
  );
};

export default AddCourse;
