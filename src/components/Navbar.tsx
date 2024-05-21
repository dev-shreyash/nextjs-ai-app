"use client"

import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react';
import { User } from 'next-auth'
import { Button } from './ui/button'


const Navbar = () => {
    const { data: session } = useSession();
    const user:User = session?.user
  return (
    <nav className='p-4 md:p-6 shadow-md'>
        <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
            <Link className='text-xl font-bold mb-4 md:mb-0' href='/'>Get Adviced</Link>
            {
                session?(
                    <>
                    <Link href='/dashboard'> 
                    <span className="mr-4">Welcome, {user?.username || user?.email}</span>
                    </Link>
                    <Button className="w-full md:w-auto bg-slate-900 text-white" variant='outline' onClick={()=> signOut()}>Logout</Button>
                    </>
                ):(
                    <Link href='/sign-in'>
                        <Button className="w-full md:w-auto bg-slate-900 text-white" variant={'outline'}>Login</Button>
                    
                    </Link>
                )
            }
        </div>
    </nav>
  )
}

export default Navbar
