import { useGSAP } from "@gsap/react"
import { SplitText } from "gsap/all"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import gsap from "gsap"
import { useRef } from "react"
import {useMediaQuery} from "react-responsive"

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoTimelineRef=gsap.timeline({})

  const isMobile=useMediaQuery({maxWidth:767}) //If it is upto 767 it is mobile else it is web

  useGSAP(()=>{
    const heroSplit=new SplitText('.title',{type:'chars,words'}); //Split by each letter
    const paragraphSplit=new SplitText('.subtitle',{type:'lines'}) //Split line by line
    
    heroSplit.chars.forEach((char)=>char.classList.add('text-gradient'))

    gsap.from(heroSplit.chars,{
      yPercent:100,
      duration:1.8,
      ease:'expo.out', //Gives us smooth springy feel
      stagger:0.05 //each character will come after another creating a wave effect
    });
    gsap.from(paragraphSplit.lines,{
      opacity:0,
      yPercent:100,
      duration:1.8,
      ease:'expo.out',
      stagger:0.06,
      delay:1 //so that it happens after the title finishes animating
    })
    gsap.timeline({
      scrollTrigger:{
        trigger:"#hero",
        start:'top top',
        end:'bottom top',
        scrub:true //Animating progress will be directly related to the scroll
      }
    }).to('.right-leaf',{y:200},0)
      .to('.left-leaf',{y:-200},0)
      // While scrolling we observe that the top leaf move up while we scroll and the bottom leaf move down while scrolling

      //The drink animation effect is just a video that is playing frame by frame as the user scroll through it
  
    const startValue=isMobile?'top 50%':'center 60%' //'top 50%' when top of video reaches 50% down the screen the animation starts 
    const endValue=isMobile?'120% TOP': 'bottom top' 
    let tl = gsap.timeline({
	 scrollTrigger: {
		trigger: "video",
		start: startValue,
		end: endValue,
		scrub: true, //Animation progress is directly tied to scroll position , 0%-->video frame 0 50%-->video middle
		pin: true,//The video stays fixed while scrolling.
	 },
	});
  if(videoRef.current)
    // Wait until video metadata loads 
  // Metadata includes duration,width,height,frame info . We need this because videoRef.current.duration is unknown until metadata loads
  videoRef.current.onloadedmetadata = () => {
  if(videoRef.current)
	 tl.to(videoRef.current, {
  // currentTime-->It represents the current playback time in seconds. Animates for currentTime=0 to currentTime=full video duration
		currentTime: videoRef.current.duration, //updating currentTime based on video duration
	 });
	};
  // We might observe that our video might be skipping frames sometimes 
  // This happens because most videos have a key frame every few seconds but for
  // scrub based animation we want every single frame to be a key frame it can be fixed
  // with FFmpeg(opensource tool for processing video and audio files)
  },[])
  return (
    <>
    <section id="hero" className="noisy">
      <h1 className="title">MOJITO</h1>
      <img 
      src="/images/hero-left-leaf.png" 
      alt="left-leaf"
      className="left-leaf" 
       />
       <img 
      src="/images/hero-right-leaf.png" 
      alt="right-leaf"
      className="right-leaf" 
       />
       <div className="body">
        <div className="content">
          <div className="space-y-5 hidden md:block">
            <p>Cool. Crisp. Classic</p>
            <p className="subtitle">
              Sip the Sprit<br/> of Summer
            </p>
          </div>
          <div className="view-cocktails">
            <p className="subtitle">
              Every cocktail on our menu is a blend of premium ingredients, creative
              flair, and timeless recipes - designed to delight your senses.
            </p>
            <a href="#cocktails">View Cocktails</a>
          </div>
        </div>
       </div>
    </section>
    <div className="video absolute inset-0">
      <video 
      ref={videoRef}
      src="/videos/output.mp4"
      muted
      playsInline //remove the video elements like trackbar
      preload="auto" //loads automatically
      />
    </div>
    </>
  )
}

export default Hero