import Image, { StaticImageData } from 'next/image';

interface bodyProps{
    heroImg: StaticImageData;
    sessionImg1: StaticImageData;
    sessionImg2: StaticImageData;
    slide: StaticImageData[];   
}

const Body: React.FC<bodyProps> = ({heroImg, sessionImg1, sessionImg2, slide}) => {
    console.log(slide.length);
    
    return (
        <div className='mb-16'>
            <div className='w-full h-[700px] relative mb-12'>
                <Image layout='fill' className='aspect-video' src={heroImg} alt=""/>
            </div>
            <div className="flex gap-1 w-full">
                <div className='w-1/2 h-[610px] relative mb-12'>
                    <Image layout='fill' className='aspect-video' src={sessionImg1} alt=""/>
                    <div className='absolute'></div>
                    <p className='absolute bottom-0 p-4 text-center text-lg font-bold text-white 
                    bg-gradient-to-t w-full from-black/70 '>New Season</p>
                </div>
                <div className='w-1/2 h-[610px] relative mb-12'>
                    <Image layout='fill' className='aspect-video' src={sessionImg2} alt=""/>
                    <p className='absolute bottom-0 p-4 text-center text-lg font-bold text-white 
                    bg-gradient-to-t w-full from-black/70 '>Denim brands</p>
                </div>
            </div>
            <div className="text-center text-3xl pb-14 font-bold">
                Denim fits
            </div>
            <div className='flex justify-between'>
                {slide.length > 0 &&
                    slide.map((item,index) => {
                        return <Image key={index} className='w-[250px]' src={item} alt=""/>
                    })
                }
                {slide.length === 0 && <p></p>}
            </div>
        </div>
    )
}

export default Body