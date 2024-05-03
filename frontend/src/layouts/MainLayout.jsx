import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavBar } from '../components/headers/NavBar'

export const MainLayout = () => {
  return (
    <main className="dark:bg-black overflow-hidden">
        <NavBar/>
        <Outlet/>
        <footer>Footer</footer>
    </main>
  )
}
export default MainLayout