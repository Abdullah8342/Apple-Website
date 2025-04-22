import { gsap } from 'gsap'
import { useEffect } from 'react';

const Test = () => {
    useEffect(() => {
        const tl = gsap.timeline({

            delay: 0.5,
        })
        tl.to('#Heading', {
            y: 0,
            duration: 1,
            opacity: 1,
        })
            .to('.li', {
                duration: 1,
                opacity: 1,
                stagger: 0.5,
            })
            .to('#Main', {
                duration: 1,
                opacity: 1,
            })
    }, [])
    return (
        <>
            <section className=' overflow-hidden' style={{ maxWidth: '1800px', margin: '0em auto', fontFamily: 'sans-serif' }}>
                <div className='' >
                    <div style={{ margin: '0.5em 1em' }} className='flex justify-between items-center'>
                        <section>
                            <header>
                                <h1 style={{ fontSize: '20px', fontWeight: 'bold', opacity: '0' }} id='Heading'>Abdullah</h1>
                            </header>
                        </section>
                        <section>
                            <nav>
                                <ul className='flex gap-5'  id='List'>
                                    <li className='li' style={{ opacity: '0' }}>
                                        <a href="#" >Home</a>
                                    </li>
                                    <li className='li' style={{ opacity: '0' }}>
                                        <a href="#" >About</a>
                                    </li>
                                    <li className='li' style={{ opacity: '0' }}>
                                        <a href="#" >Contact</a>
                                    </li>
                                </ul>
                            </nav>
                        </section>
                    </div>
                </div>
                <div style={{ height: '75vh' }} className='flex flex-center'>
                    <main className='' id='Main' style={{ opacity: '0' }}>
                        <section>
                            <header>
                                <h1 style={{ fontSize: '5vw' }}>HELLO WORLD</h1>
                            </header>
                        </section>
                    </main>
                </div>
            </section>
        </>
    );
};

export default Test;
