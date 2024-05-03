import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
const navLinks=[
    {name:'Home', route:'#'},
    {name:'Wourkout', route:"/workouts"},//section id
    {name:'Diets', route:"/diets"},//section id
    {name:'Doctors and Instructors', route:"/inst"},//section id
]

export const NavBar = () => {
    const [navBg, setNavBg] = useState('bg-[#15151580')
  return (
    <nav>
        <div className='lg:w-[95%] mx-auto sm:px-6 lg:px-6'>
            <div className='px-4 py-4 flex item-center justify-center'>
                {/* logo */}
                <div>
                    <h1 className='text-2x1 inline-flex gap-3 items-center font-bold'><img src="/logo.png" alt="" className='w-8 h-8'/>ACTIVE-LIFE</h1>
                </div>
                {/*mobile menu icons */}
                {/*nav links */}
                <div className='hidden md:block text-black dark:text-white'>
                    <div className='flex'>
                        <ul className='ml-10 flex items-center space-x-4 pr-4'>
                            {
                                navLinks.map((link)=>(
                                    <li key={link.route}>
                                        <NavLink to={link.route}className={({isActive})=>
                                            `fontbold ${isActive ?'text-secondary':`${navBg.includes('bg-transparent')?
                                        'text-white':'text-black dark:text-white'}`} hover:text-secondary duration-300`
                                            }>{link.name}</NavLink>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </nav>
  )
}
