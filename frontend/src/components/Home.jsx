import React from 'react'
import Navbar from './shared/Navbar'
import Landing from './shared/Landing'
import Contact from './shared/Contact'
import About from './shared/About'

function Home() {
  return (
     <>
    <Navbar />
     <Landing />
     <About />
     <Contact/>
     </>
  )
}

export default Home