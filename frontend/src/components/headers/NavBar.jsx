import React from 'react'
import { NavLink, useLocation, useNavigate, useNavigation } from 'react-router-dom'
import { useState} from 'react'
import { ThemeProvider, THEME_ID, createTheme } from '@mui/material/styles';
import { Switch } from '@mui/material';
import { useEffect } from 'react';
import photoURL from "../../assets/home/user.png"
import {FaBars} from "react-icons/fa"
import {motion} from "framer-motion"
import useUser from '../../hooks/useUser';
import Swal from 'sweetalert2';
import { IoMdLogOut } from "react-icons/io";
import useAuth from '../../hooks/useAuth';

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
    const {currentUser} = useUser();
    const {logout} = useAuth();
    const [isMobileMenuOpen,setisMobileMenuOpen]=useState(false);
    const [isHome,setIsHome]=useState(false);
    const [isLogin,setIsLogin]=useState(false);
    const [scrollPosition,setScrollPosition]=useState(0);
    const [isFixed, setIsFixed]=useState(false);
    const [isDarkMode, setIsDarkMode]=useState(false);
    
    const navigate = useNavigate();
    
    //const user=location.state?.user;
    //console.log(user)
    const role=currentUser?.role;;
    const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  // Add event listener for scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


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

    const handleLogOut = ()=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Log Out Me!"
          }).then((result) => {
            if (result.isConfirmed) {
                logout(currentUser.email, currentUser.password).then(Swal.fire({                
                title: "Loged Out!",
                text: "You have logged out from your acoount.",
                icon: "success"
              }) 
            ).catch((err)=>
                    console.log(err)
            );
            navigate("/");
              
            }
          });
    }

    return (
        <motion.nav 
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration:0.5}}
            className={`navbar ${isScrolled ? 'scrolled' : ''} ${isHome ? navBg : "bg-white dark:bg-black backdrop-blur-2xl"} ${isFixed ? 'static' : 'fixed'} top-0 transition-colors duration-500 ease-in-out w-full z-10`}>

            <div className='lg:w-[95%] mx-auto sm:px-6 lg:px-6'>
                <div className='px-4 py-4 flex item-center justify-between'>
                    {/* logo */}
                    <div>
                        <h1 className='text-2x1 inline-flex gap-3 items-center font-bold text-black dark:text-white'><img src="/logo.png" alt="" className='w-8 h-8'/>ACTIVE-LIFE</h1>
                    </div>
                    {/*nav links */}
                    <div className='hidden md:block text-white dark:text-white'>
                        <div className='flex'>
                            <ul className='ml-10 flex items-center space-x-4 pr-4'>
                                {
                                    navLinks.map((link)=>(
                                        <li key={link.route}>
                                            <NavLink to={link.route} className={({isActive})=>
                                                `font-bold ${isActive ?'text-secondary':`${navBg.includes('bg-transparent')?
                                            'text-white dark:text-white':'text-black dark:text-white'}`} hover:text-secondary duration-300`
                                                }>{link.name}
                                            </NavLink>
                                        </li>
                                    ))
                                }
                                {/*Based on users */}
                                {
                                    role ? null:isLogin?<li>
                                        <NavLink to="/register" className={({isActive})=>
                                            `fontbold ${isActive ?'text-secondary':`${navBg.includes('bg-transparent')?
                                            'text-black dark:text-white':'text-black dark:text-white'}`} hover:text-secondary duration-300`
                                        }>
                                        Register
                                        </NavLink>
                                    </li>: <li>
                                    <NavLink to="/login" className={({isActive})=>
                                        `fontbold ${isActive ?'text-secondary':`${navBg.includes('bg-transparent')?
                                        'text-white dark:text-white font-bold':'text-black dark:text-white'}`} hover:text-secondary duration-300`
                                    }>
                                    Login
                                    </NavLink>
                                </li>
                                }

                                {
                                    (role === "user"|| role === "admin") && <li>
                                        <NavLink to="/dashboard" className={'font-bold px-3 py-2 bg-secondary text-white rounded-xl'}>
                                            Dashboard
                                        </NavLink>
                                    </li>
                                }
                                {
                                    (role === "user"|| role === "admin") && <li>
                                        <button
                                            onClick={()=>handleLogOut()}
                                            className=" flex items-center gap-x-4 p-2 rounded-md text-white
                                                duration-150 cursor-pointer font-bold text-sm  bg-secondary hover:text-black">
                                            <IoMdLogOut className='text-2xl'/>
                                                LogOut
                                        </button>
                                    </li>
                                }
                                {

                                }
                                {/*Color toggle*/}
                                <li>
                                    <ThemeProvider theme={theme}>
                                        <div className="flex flex-col justify-center items-center">
                                            <Switch onChange={()=>setIsDarkMode(!isDarkMode)}>
                                                
                                            </Switch>
                                            <h1 className="text-[8px] text-black font-bold dark:text-white">Light/Dark</h1>
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
