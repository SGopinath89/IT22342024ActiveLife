import React from 'react'
import { NavLink, useLocation, useNavigation } from 'react-router-dom'
import { useState} from 'react'
import { ThemeProvider, THEME_ID, createTheme } from '@mui/material/styles';
import { Switch } from '@mui/material';
import { useEffect } from 'react';
import photoURL from "../../assets/home/user.png"
import {FaBars} from "react-icons/fa"
import {motion} from "framer-motion"
const navLinks=[
    {name:'Home', route:'/'},
    {name:'Wourkout', route:"/workouts"},//section id
    {name:'Diets', route:"/diets"},//section id
    {name:'Doctors and Instructors', route:"/Instructors"},//section id
]
const theme = createTheme({
    palette:{
        primary:{
            main:"#ff0000",

        },
        secondary:{
            main:"#00ff00",
        },
    },
});
export const NavBar = () => {
    const [navBg, setNavBg] = useState('bg-[#15151580');
    const navigation=useNavigation();
    const location=useLocation();
    const [isMobileMenuOpen,setisMobileMenuOpen]=useState(false);
    const [isHome,setIsHome]=useState(false);
    const [isLogin,setIsLogin]=useState(false);
    const [scrollPosition,setScrollPosition]=useState(0);
    const [isFixed, setIsFixed]=useState(false);
    const [isDarkMode, setIsDarkMode]=useState(false);
    const user=false;

    const toggleMobileMenu=()=>{
        setisMobileMenuOpen(!isMobileMenuOpen)
    };

    useEffect(()=>{
        const darkClass='dark';
        const root = window.document.documentElement;
        if(isDarkMode){
            root.classList.add(darkClass);
        }else{
            root.classList.remove(darkClass);
        }
    },[isDarkMode]);

    useEffect(()=>{
        setIsHome(location.pathname==='/');
        setIsLogin(location.pathname==='/login');
        setIsFixed(location.pathname==='/register' || location.pathname==='/login');
    },[location]);

    useEffect(()=>{
        const handleScroll=()=>{
            const currentPosition=window.pageYOffset;
            setScrollPosition(currentPosition);
        };
        window.addEventListener('scroll',handleScroll);
        return()=>window.removeEventListener('scroll',handleScroll)
    },[]);

    useEffect(()=>{
        if(scrollPosition>100){
            if(isHome){
                setNavBg('bg-white backdrop-filter backdrop-blur-xl bg-opacity-0 dark:text-white text:black')
            }else{
                setNavBg('bg-white dark:bg-black dark:text-white text-black')
            }
        }else{
            setNavBg(`${isHome|| location.pathname==='/' ? 'bg-transparent':'bg-white dark:bg-black'} dark:text-white text-balck` )
        }
    },[scrollPosition]);

    const handleLogout=()=>{
        console.log("Logged Out");
    }

    return (
        <motion.nav 
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration:0.5}}
        className={`${isHome ?navBg:"bg-white dark:bg-black backdrop-blur-2xl"}${isFixed ? 'static':'fixed'}top-0 transition-colors duration-500 ease-in-out w-full z-10`}>
            <div className='lg:w-[95%] mx-auto sm:px-6 lg:px-6'>
                <div className='px-4 py-4 flex item-center justify-between'>
                    {/* logo */}
                    <div>
                        <h1 className='text-2x1 inline-flex gap-3 items-center font-bold text-black dark:text-white'><img src="/logo.png" alt="" className='w-8 h-8'/>ACTIVE-LIFE</h1>
                    </div>
                    {/*mobile menu icons 
                    <div className="md:hidden flex items-center">
                        <button type="button" onClick={toggleMobileMenu} className="text-gray-300 hover:text-white">
                            <FaBars className="h-6 w-6 "/>
                        </button>
                    </div>*/}
                    {/*nav links */}
                    <div className='hidden md:block text-black dark:text-white'>
                        <div className='flex'>
                            <ul className='ml-10 flex items-center space-x-4 pr-4'>
                                {
                                    navLinks.map((link)=>(
                                        <li key={link.route}>
                                            <NavLink to={link.route} className={({isActive})=>
                                                `fontbold ${isActive ?'text-secondary':`${navBg.includes('bg-transparent')?
                                            'text-black dark:text-white':'text-black dark:text-white'}`} hover:text-secondary duration-300`
                                                }>{link.name}
                                            </NavLink>
                                        </li>
                                    ))
                                }
                                {/*Based on users */}
                                {
                                    user ? null:isLogin?<li>
                                        <NavLink to="/register" className={({isActive})=>
                                            `fontbold ${isActive ?'text-secondary':`${navBg.includes('bg-transparent')?
                                            'text-black dark:text-white':'text-black dark:text-white'}`} hover:text-secondary duration-300`
                                        }>
                                        Register
                                        </NavLink>
                                    </li>: <li>
                                    <NavLink to="/login" className={({isActive})=>
                                        `fontbold ${isActive ?'text-secondary':`${navBg.includes('bg-transparent')?
                                        'text-black dark:text-white':'text-black dark:text-white'}`} hover:text-secondary duration-300`
                                    }>
                                    Login
                                    </NavLink>
                                </li>
                                }

                                {
                                    user && <li>
                                        <img src={photoURL} alt="" className="h-[40px] rounded-full w-[40px]"/>
                                    </li>
                                }
                                {
                                    user && <li>
                                        <NavLink onClick={handleLogout} className={'font-bold px-3 py-2 bg-secondary text-white rounded-xl'}>
                                            Logout
                                        </NavLink>
                                    </li>
                                }
                                {/*Color toggle*/}
                                <li>
                                    <ThemeProvider theme={theme}>
                                        <div className="flex flex-col justify-center items-center">
                                            <Switch onChange={()=>setIsDarkMode(!isDarkMode)}>
                                                <h1 className="text-[8px]">ight/Dark</h1>
                                            </Switch>
                                        </div>
                                    </ThemeProvider>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </motion.nav>
    )
}
