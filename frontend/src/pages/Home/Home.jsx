import React from 'react'
import Banner from './Banner'
import Popular from './Popular/Popular'

export const Home = () => {
  console.log(import.meta.env.VITE_APIKEY)
  return (
    <div>
      <Banner/>
      <Popular/>
    </div>
    
  )
}
export default Home