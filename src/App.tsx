import { SplitText,ScrollTrigger } from "gsap/all"
import gsap from "gsap"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
gsap.registerPlugin(ScrollTrigger,SplitText) //Both plugins can now be used globally in our application
// Split Text allow us to break text into individual characters for
//detailed text animation 

export const App = () => {
  return (
    <main>
      <Navbar/>
      <Hero/>
    </main>
  )
}
