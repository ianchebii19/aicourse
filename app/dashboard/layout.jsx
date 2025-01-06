import React from 'react';
import SideBar from './-components/Sidebar';
import Header from './-components/Header';
import { UserButton } from '@clerk/nextjs';
import AddCourse from './-components/AddCourse';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
     <div className=''>
     <SideBar  />
     </div>
   
       
     
      <main className="flex-1 md:ml-64">
        {/* Header */}
        <header className="flex justify-between items-center p-5 shadow-sm">
          <Header />
          <UserButton />
        </header>

        {/* Page Content */}
        <section className="p-4">
          {children}
          
        </section>
      </main>
    </div>
  );
};

export default DashboardLayout;
