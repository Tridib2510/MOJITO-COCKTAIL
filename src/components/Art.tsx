import gsap from "gsap"
import { useMediaQuery } from "react-responsive"
import { featureLists, goodLists } from "../../constants"
import { useGSAP } from "@gsap/react"

const Art = () => {
    const isMobile=useMediaQuery({maxWidth:767})
    useGSAP(()=>{
        const start=isMobile?'top 20%':'top top';
        const maskTimeline= gsap.timeline({
            scrollTrigger:{
                trigger:'#art',
                start, //
                end:'bottom center', //Bottom of the section enters the center of the screen
                scrub:1.5, //The animation progress will follow the scroll with some delay
                pin:true
            }
        })
        maskTimeline.to('.will-fade',{
            opacity:0,
            stagger:0.2,
            ease:'power1.inOut'
        }) //As we scroll up all the elements with class will-fade will fade and when we scroll up they will again reappear
        .to('.masked-img',{
            scale:1.3,
            maskPostion:'center',
            maskSize:'400%'
        }) //The mask widens and show the under image
        .to('#masked-content',{
            opacity:1,
            duration:1,
            ease:'power1.inOut'
        })
    },[])
  return (
    <div id="art">
        <div className="container mx-auto h-full pt-20">
        <h2 className="will-fade">The ART</h2>
        <div className="content">
            <ul className="space-y-4 will-fade">
                {goodLists.map((feature,index)=>(
                    <li key={index} className="flex items-center gap-2">
                        <img src="/images/check.png" alt="check" />
                        <p>{feature}</p>
                    </li>
                ))}
            </ul>
            <div className="cocktail-img">
                <img src="/images/under-img.jpg" 
                className="abs-center masked-img size-full object-contain"
                 alt="cocktail" />
                 {/* masked-img-->Taking that image and positioning it nicely in the center
                  and applying a mask(which is a picture of a single regular drink)*/}
            </div>
            <ul className="space-y-4 will-fade">
                {featureLists.map((feature,index)=>(
                    <li key={index} className="flex items-center justify-start gap-2">
                        <img src="/images/check.png" alt="check" />
                        <p className="md:w-fit w-60">{feature}</p>
                    </li>
                ))}
            </ul>
        </div>
         <div className="masked-container">
            <h2 className="will-fade"> Sip-Worthy Perfection</h2>
            <div id="masked-content">
                <h3>Made with Craft, Poured with Passion</h3>
                <p>This isn't just a drink. It's a carefully crafted moment made just for you</p>
            </div>
            {/*As the user scrolls we will ping the section
            fade out inital content like the ul lists
             scale and revel the image mask 
             and finally fade in the closing image 
             It will be linked to the scroll of our mouse wheal
             */}
         </div>
        </div>
    </div>
  )
}

export default Art