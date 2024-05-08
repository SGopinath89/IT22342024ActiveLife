import React from 'react'
import { Workouts } from '../Workouts/Workouts'
import { Diets } from '../Diets/Diets'
import { Instructors } from '../instructors/instructors'
import Banner from './Banner'

export const Home = () => {
  return (
    <div>
      <Banner/>
      <Workouts/>
      <Diets/>
      <Instructors/>
    </div>
    
  )
}
export default Home