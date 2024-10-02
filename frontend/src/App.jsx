import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home'
import Prediction from './components/Prediction';
import Contact from './components/shared/Contact';



const appRouter= createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
},

{
  path: '/Prediction',
  element: <Prediction/>,
},


])

function App() {

  return (
    <>
     <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
