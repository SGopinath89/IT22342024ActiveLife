import React from 'react'
import { Workouts } from '../Workouts/Workouts'
import { Diets } from '../Diets/Diets'
import { Instructors } from '../instructors/instructors'
import Banner from './Banner'
import Popular from './Popular/Popular'

export const Home = () => {
  return (
    <div>
      <Banner/>
      <Popular/>
    </div>
    
  )
}
export default Home