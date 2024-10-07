import React from 'react'
import Navbar from './shared/Navbar'
import Landing from './shared/Landing'
import About from './shared/About'
import Contact from './shared/Contact'

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