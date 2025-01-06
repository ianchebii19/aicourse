import { Button } from '@/components/ui/button'
import Link from 'next/link'

import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-between p-5 shadow-sm'>
      <div className='text-purple-600 font-bold text-xl'>Gen_Course</div>
      <Link href="/dashboard">
      <Button className='bg'>Get Started</Button>
      </Link>
    </div>
  )
}

export default Header
