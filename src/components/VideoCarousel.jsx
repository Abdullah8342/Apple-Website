import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
import { useEffect, useRef, useState } from "react";

import { hightlightsSlides } from "../constants";
import { pauseImg, playImg, replayImg } from "../utils";

const VideoCarousel = () => {
    const videoRef = useRef([])
    const videoSpanRef = useRef([])
    const videoDivRef = useRef([])

    // video and indicator
    let stateObject = { isEnd: false, startPlay: false, videoId: 0, isLastVideo: false, isPlaying: false }
    const [video, setVideo] = useState(stateObject)

    // Destructuring
    const [loardedData, setLoardedData] = useState([])
    const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video

    // Slider animation to move the video out of the screen and bring the next video in
    useGSAP(() => {
        gsap.to('#slider', {
            transform: `translateX(${-100 * videoId}%)`,
            duration: 2,
            ease: 'power1.inOut',
        })

        gsap.to("#video", {
            scrollTrigger: {
                trigger: "#video",
                toggleActions: "restart none none none",
            },
            onComplete: () => {
                setVideo((pre) => ({
                    ...pre,
                    startPlay: true,
                    isPlaying: true,
                }));
            },
        });
    }, [isEnd, videoId]);


    useEffect(() => {
        let currentProgress = 0;
        let span = videoSpanRef.current;

        if (span[videoId]) {
            // animation to move the indicator
            let anim = gsap.to(span[videoId], {
                onUpdate: () => {
                    // get the progress of the video
                    const progress = Math.ceil(anim.progress() * 100);

                    if (progress != currentProgress) {
                        currentProgress = progress;

                        // set the width of the progress bar
                        gsap.to(videoDivRef.current[videoId], {
                            width:
                                window.innerWidth < 760
                                    ? "10vw" // mobile
                                    : window.innerWidth < 1200
                                        ? "10vw" // tablet
                                        : "4vw", // laptop
                        });

                        // set the background color of the progress bar
                        gsap.to(span[videoId], {
                            width: `${currentProgress}%`,
                            backgroundColor: "white",
                        });
                    }
                },

                // when the video is ended, replace the progress bar with the indicator and change the background color
                onComplete: () => {
                    if (isPlaying) {
                        gsap.to(videoDivRef.current[videoId], {
                            width: "12px",
                        });
                        gsap.to(span[videoId], {
                            backgroundColor: "#afafaf",
                        });
                    }
                },
            });

            if (videoId == 0) {
                anim.restart();
            }

            // update the progress bar
            const animUpdate = () => {
                anim.progress(
                    videoRef.current[videoId].currentTime /
                    hightlightsSlides[videoId].videoDuration
                );
            };

            if (isPlaying) {

                gsap.ticker.add(animUpdate);
            } else {

                gsap.ticker.remove(animUpdate);
            }
        }
    }, [videoId, startPlay]);

    useEffect(() => {
        if (loardedData.length > 3) {
            if (!isPlaying) {
                videoRef.current[videoId].pause();
            } else {
                startPlay && videoRef.current[videoId].play()
            }
        }
    }, [startPlay, videoId, isPlaying, loardedData])

    const handelProcess = (type, i) => {
        switch (type) {
            case "video-end":
                setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }))
                console.log(type)
                break;
            case "video-last":
                setVideo((pre) => ({ ...pre, isLastVideo: true }))
                console.log(type)
                break;
            case "video-reset":
                setVideo((pre) => ({ ...pre, isLastVideo: false, videoId: 0 }))
                console.log(type)
                break;
            case "pause":
                setVideo((pre) => ({ ...pre, isPlaying: !isPlaying }))
                console.log(type)
                break;
            case "play":
                setVideo((pre) => ({ ...pre, isPlaying: !isPlaying }))
                console.log(type)
                break;
            default:
                return video
        }
    }
    const handelLoadedMetaDate = (i, e) => setLoardedData((pre) => [...pre, e]);

    return (
        <>
            <div className="flex items-center">
                {hightlightsSlides.map((list, i) => (
                    <div key={list.id} id="slider" className="sm:pr-20 pr-10 " style={{ padding: '0em 1em 0em 0em' }}>
                        <div className="video-carousel_container ">
                            <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                                <video id="video" playsInline={true}
                                    className={`${list.id == 2 && "translate-x-44"}pointer-event-none`} preload="auto" muted
                                    ref={(el) => (videoRef.current[i] = el)}
                                    onEnded={() => i !== 3 ? handelProcess("video-end", i) : handelProcess("video-last")}
                                    onPlay={() => setVideo((pre) => ({ ...pre, isPlaying: true }))}
                                    onLoadedMetadata={(e) => handelLoadedMetaDate(i, e)}
                                >
                                    <source src={list.video} />
                                </video>
                            </div>
                            <div className="absolute top-12 left-[5%] z-10">
                                {list.textLists.map((text, i) => (
                                    <p
                                        key={i}
                                        className="md:text-2xl text-xl font-medium"
                                    >
                                        {text}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}

            </div>
            <div className="flex-center relative mt-10" style={{ marginTop: '10px' }}>
                <div className=" flex gap-2 flex-center py-5 px-7 bg-gray-400 rounded-full" style={{ padding: '15px 20px' }}>
                    {videoRef.current.map((_, i) => (
                        <span
                            key={i}
                            className="mx-2 w-3 h-3 bg-gray-300 rounded-full relative cursor-pointer"
                            style={{ width: '10px', height: '10px' }}
                            ref={(el) => (videoDivRef.current[i] = el)}
                        >
                            <span
                                className="absolute h-full w-full rounded-full"
                                ref={(el) => (videoSpanRef.current[i] = el)}
                            />
                        </span>
                    ))}
                </div>
                <button className="control-btn">
                    <img src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg} alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'}
                        onClick={isLastVideo ?
                            () => handelProcess('video-reset') : !isPlaying ?
                                () => handelProcess('play') :
                                () => handelProcess('pause')
                        }
                    />
                </button>
            </div>
        </>
    )
}

export default VideoCarousel
