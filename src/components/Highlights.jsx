import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { rightImg, watchImg } from "../utils"
import VideoCarousel from "./VideoCarousel"

const Highlights = () => {
  useGSAP(() => {
    gsap.to('#title', {
      opacity: 1,
      delay: 1.5,
    })
    gsap.to('.link', { opacity: 1, delay: 1.5, stagger: 0.25 })
  }, [])
  return (
    <>
      <section
        id="highlights"
        className="w-screen overflow-hidden h-full common-padding bg-zinc"
      >
        <div className="screen-max-width ">
          <div className="mb-12 w-full md:flex items-end justify-between"
            style={{ marginBottom: '20px' }}>
            <h1 id="title" className="section-heading">Get the Highlights.</h1>
            <div className="flex flex-wrap items-end gap-5">
              <p className="link flex gap-2">
                Watch the film <img src={watchImg} alt="watch" className="ml-2" />
              </p>
              <p className="link flex gap-2">
                Watch the event
                <img src={rightImg} alt="watch" className="ml-2" />
              </p>
            </div>
          </div>
          <VideoCarousel />
        </div>
      </section>
    </>
  )
}

export default Highlights