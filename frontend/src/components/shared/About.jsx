import React from 'react'
import './About.css'

function About() {
     return (
          <div id="about" className='h-[32rem] homepage bg-gradient-to-b from-[#D6EFD8] to-[#f0f0f0]'>

               <h2 className='about-header' id='about'>About Us</h2>

               <div className="sections-container">

                    <div className="section">
                         <h2>Symptom Seer</h2>
                         <p>Easily check your symptoms and get preliminary insights.</p>
                    </div>
                    <div className="section">
                         <h2>Personalized Recommendations</h2>
                         <p>Receive tailored health advice based on your profile.</p>
                    </div>
                    <div className="section">
                         <h2>Community Support</h2>
                         <p>Connect with others and share experiences in our health forum.</p>
                    </div>

               </div>
          </div>
     )
}

export default About