import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { heroVideo, smallHeroVideo } from '../utils'
import { useEffect, useState } from 'react'

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo)
  const handelVideoSrcSet = () => {
    (window.innerWidth < 760) ? setVideoSrc(smallHeroVideo) : setVideoSrc(heroVideo)
  }



  useEffect(() => {

    window.addEventListener('resize', handelVideoSrcSet)
    return () => {
      window.removeEventListener('resize', handelVideoSrcSet);
    }
  }, [])

  useGSAP(() => {
    gsap.to('#hero', {
      y: 0,
      opacity: 1,
      delay: 1.5,
    })
    gsap.to('#cta', {
      opacity: 1,
      delay: 1.5,
      y: 0,
    })
  }, [])
  return (
    <>
      <section className="w-full nav-height bg-black relative">
        <div className="h-5/6 w-full flex-center flex-col">
          <p id="hero" className="hero-title ">Iphone 15 Pro</p>
          <div className='md:10/12 w-9/12'>
            <video autoPlay muted playsInline={true} key={videoSrc}
              className='pointer-events-none'
            >
              <source src={videoSrc} type='video/mp4' />
            </video>
          </div>
        </div>
        <div className="flex flex-col items-center opacity-0 translate-y-20" id='cta'>
          <a href="#highlights" className='btn'>Buy</a>
          <p className='font-normal text-xl'>From $199/month or $999</p>
        </div>
      </section>
    </>
  )
}

export default Hero
