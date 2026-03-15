import React from 'react'
import {navLinks} from "../../constants/index"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
const Navbar = () => {
    useGSAP(()=>{
        // Tweening in animation is short for inbetweening and it's the process of
        // generating images that go between keyframes
        const navTween=gsap.timeline({
            scrollTrigger:{
                trigger:'nav',
                start:'bottom top'//when bottom of the navbar reaches the top of the viewport that is when the animation is triggered
            }
        })

        navTween.fromTo('nav',{
            backgroundColor:'transparent'
        },{
            backgroundColor:'#00000050',
            backgroundFilter:'blur(10px)',
            duration:1,
            ease:'power1.inOut'
        })
    }) //when we scroll later the background turns to transparent background allowing us to read the text underneath
  return (
   <nav>
    <div>
        <a href="#home" className="flex items-center gap-2">
            <img src='/images/logo.png' alt='logo'/>
            <p>Velvet Pour</p>
        </a>
        <ul>
           {navLinks.map((link)=>(
            <li key={link.id}>
             <a href={`#${link.id}`}>{link.title}</a>
            </li>
           ))}
        </ul>
    </div>
   </nav>
  )
}

export default Navbar