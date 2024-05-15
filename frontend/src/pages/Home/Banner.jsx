import React from 'react'
import bgImg from '../../assets/home/home.jpg'
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import icon1 from '../../assets/home/healthy.png'
import icon2 from '../../assets/home/diet.png'
import icon3 from '../../assets/home/instructor.png'
import icon4 from '../../assets/home/workout.png'
const Banner = () => {
  return (
    <div className='' style={{backgroundImage:`url(${bgImg})`, backgroundSize:'cover'}}>
        <div className="min-h-screen flex justify-start pl-11 text-white bg-black bg-opacity-60">
            {/**/}
            <div>
                <div className="space-y-4">
                  <br/><br/>
                  <div data-aos="fade-down" style={{ width: '100px', height: '100px', position: 'absolute', top: '100px', left: '1100px' }}> 
                    <img src={icon1} alt="icon1" />
                  </div>
                  
                  <div data-aos="fade-right" style={{ width: '100px', height: '100px', position: 'absolute', top: '300px', left: '850px' }}> 
                    <img src={icon3} alt="icon1" />
                  </div>
                  
                  <div data-aos="fade-left" style={{ width: '100px', height: '100px', position: 'absolute', top: '300px', left: '1350px' }}> 
                    <img src={icon4} alt="icon1" />
                  </div>
                  <div data-aos="fade-up" style={{ width: '100px', height: '100px', position: 'absolute', top: '550px', left: '1100px' }}> 
                    <img src={icon2} alt="icon1" />
                  </div>
                 
                  <h1 className="md:text-7xl text-4xl font-bold" data-aos="fade-up"> Welcome to Active-Life!!</h1>
                  <br/>
                  <h2 className="md:text-4xl text-2xl md:w-1/2" data-aos="fade-up">Your ultimate companion on your journey to optimal health and fitness!</h2> 
                  <br/>
                  <p className='md:w-1/2'>Active-Life is designed to revolutionize the way you approach your wellness goals by providing you with 
                    comprehensive tools and insights. Whether you're looking to lose weight, build muscle, improve your 
                    cardiovascular endurance, or simply adopt a healthier lifestyle, we've got you covered.
                  </p>
                  <p className='md:w-1/2'>  
                    With our intuitive interface, you can easily track your daily activity, including steps taken, calories burned, 
                    and active minutes. Set personalized goals and let Active-Life motivate you with real-time progress updates and achievements. 
                    Our diverse range of workout plans, from yoga and Pilates to HIIT and strength training, ensures that there's something 
                    for everyone, regardless of fitness level or preference.
                  </p>
                  <p className='md:w-1/2'>  
                    But we don't stop there. Active-Life goes beyond physical activity to help you make smarter choices in nutrition. 
                    Access a vast database of healthy recipes, track your meals, and monitor your macros to fuel your body optimally. 
                    Plus, stay motivated and connected with our supportive community of like-minded individuals, sharing tips, challenges, 
                    and successes.
                  </p> 
                  <p className='md:w-1/2 '> 
                    Join us today and embark on a transformative journey towards a happier, healthier you. 
                    It's time to take control of your wellness—let Active-Life be your guide!
                  </p>
                  <br/>
                  <div className='flex flex-wrap items-center gap-5' >
                    <button className='px-7 py-3 rounded-lg border hover:bg-secondary font-bold uppercase' >
                      View Workouts
                    </button>
                    <button className='px-7 py-3 rounded-lg border hover:bg-secondary font-bold uppercase'>
                      View Diets
                    </button>
                    
                  </div>
                  <br/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Banner