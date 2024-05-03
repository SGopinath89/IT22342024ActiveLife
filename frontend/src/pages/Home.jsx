import React from 'react'
import { Workouts } from './Workouts/Workouts'
import { Diets } from './Diets/Diets'
import { Instructors } from './instructors/instructors'

export const Home = () => {
  return (
    <div>Home
      <Workouts/>
      <Diets/>
      <Instructors/>
    </div>
    
  )
}
export default Home