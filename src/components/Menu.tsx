"use client"
import { useRef, useState } from "react";
import { allCocktails } from "../../constants"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Menu = () => {
  const contentRef=useRef<HTMLDivElement>(null)

  const [currentIndex,setCurrentIndex]=useState(0)

  useGSAP(()=>{
    gsap.fromTo('#title',{
      opacity:0
    },{
      opacity:1,
      duration:1
    })
    gsap.fromTo('.cocktail img',{
      opacity:0,
      xPercent:-100
    },{
      xPercent:0,
      opacity:1,
      duration:1,
      ease:'power1.inOut'
    }) //sliding animation for drinks

    gsap.fromTo('.details h2',{
      yPercent:100,
      opacity:0,
    },{
      yPercent:0,
      opacity:100,
      ease:'power1.inOut'
    })
    gsap.fromTo('.details p',{
      yPercent:100,
      opacity:0,
    },{
      yPercent:0,
      opacity:100,
      ease:'power1.inOut'
    })

  },[currentIndex]) 
  //[currentIndex]-->reruns this whenever the variable changes
  
  const totalCocktails=allCocktails.length
  const goToSlide=(index:number)=>{

    const newIndex=(index+totalCocktails)%totalCocktails
    setCurrentIndex(newIndex)
  }
  
  const getCocktailAt=(indexOffset:number)=>{
    return allCocktails[(currentIndex+indexOffset+totalCocktails)%totalCocktails]
  }

  const currentCocktail=getCocktailAt(0)
  const prevCocktail=getCocktailAt(-1)
  const nextCocktail=getCocktailAt(1)

  return (
    <section id="menu" aria-labelledby="menu-heading">
      {/* aria-labelledby is an accessibility attribute used in HTML to connect an element to another element that provides its label. */}
      {/* <img src="/images/slider-left-leaf.png" alt="left-leaf" id="m-left-leaf" />
	    <img src="/images/slider-right-leaf.png" alt="right-leaf" id="m-right-leaf" /> */}
      <h2 id="menu-heading" className="sr-only">
      {/* sr-only-->This hides the element visually but keeps it accessible. */}
      Cocktail Menu  
      </h2> 
      <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
        {allCocktails.map((cocktail,index)=>{
          const isActive=index===currentIndex;
          return(
            <button key={cocktail.id} 
            className={
              `${isActive?"text-white border-white"
              :"text-white/50 border-white/50"}`}
              onClick={()=>goToSlide(index)}
              >
              {cocktail.name}
            </button>
          )
        })}
      </nav>
      <div className="content">
        <div className="arrows">
          <button className="text-left" onClick={()=>goToSlide(currentIndex-1)}>
          <span>{prevCocktail.name}</span>
          <img src="/images/right-arrow.png" alt="right-arrow" area-hidden="true" />
          </button>
           <button className="text-left" onClick={()=>goToSlide(currentIndex+1)}>
          <span>{nextCocktail.name}</span>
          <img src="/images/left-arrow.png" alt="left-arrow" area-hidden="true" />
          </button>
        </div>
        <div className="cocktail">
          <img src={currentCocktail.image} alt="" />
        </div>

        <div className="recipe">
          <div ref={contentRef} className="info">
            <p>Recipe for:</p>
            <p id="title">{currentCocktail.name}</p>
          </div>
          <div className="details">
            <h2>{currentCocktail.title}</h2>
            <p>{currentCocktail.description}</p>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Menu