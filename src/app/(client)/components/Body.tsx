import Image, { StaticImageData } from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

interface bodyProps{
    heroImg: StaticImageData;
    sessionImg1: StaticImageData;
    sessionImg2: StaticImageData;
    slide: StaticImageData[];
    categoryName: string[];
}

const Body: React.FC<bodyProps> = ({heroImg, sessionImg1, sessionImg2, slide, categoryName}) => {
    console.log(slide.length);
    const pathname = usePathname();
    const router = useRouter();
    const gender = pathname.split('/')[1];
    
    function handleOnClick(category: string){
        const param = `/${gender}/${category}`
        router.push(param)
    }

    return (
        <div className='mb-16'>
            <div onClick={() => handleOnClick('All')} className='w-full h-[700px] relative mb-12'>
                <Image layout='fill' className='aspect-video' src={heroImg} alt=""/>
            </div>
            <div className="flex gap-1 w-full">
                <div onClick={() => {
                    if (categoryName && categoryName[0]) {
                        handleOnClick(categoryName[0]);
                    } else {
                        console.error("Category name is not available.");
                    }
                }}              
                className='w-1/2 h-[610px] relative mb-12'>
                    <Image layout='fill' className='aspect-video' src={sessionImg1} alt=""/>
                    <div className='absolute'></div>
                    <p className='absolute bottom-0 p-4 text-center text-lg font-bold text-white 
                    bg-gradient-to-t w-full from-black/70 '>{categoryName[0]}</p>
                </div>
                <div onClick={() => {
                    if (categoryName && categoryName[0]) {
                        handleOnClick(categoryName[1]);
                    } else {
                        console.error("Category name is not available.");
                    }
                }}  
                className='w-1/2 h-[610px] relative mb-12'>
                    <Image layout='fill' className='aspect-video' src={sessionImg2} alt=""/>
                    <p className='absolute bottom-0 p-4 text-center text-lg font-bold text-white 
                    bg-gradient-to-t w-full from-black/70 '>{categoryName[1]}</p>
                </div>
            </div>
            <div className="text-center text-3xl pb-14 font-bold">
                Denim fits
            </div>
            <div className='flex flex-wrap gap-1'>
                {slide.length > 0 &&
                    slide.map((item,index) => {
                        return  <div key={index}
                        onClick={() => {
                            if (categoryName && categoryName[0]) {
                                handleOnClick(categoryName[index+2]);
                            } else {
                                console.error("Category name is not available.");
                            }
                        }}  
                        className='basis-[calc(16.666%-4px)] flex-shrink-0 relative'>
                            <Image className='w-full' src={item} alt=""/>
                            <p className='absolute bottom-0 p-4 text-center text-lg font-bold text-white 
                            bg-gradient-to-t w-full from-black/30'>{categoryName[index+2]}</p>
                        </div> 
                    })
                }
                {slide.length === 0 && <p></p>}
            </div>
        </div>
    )
}

export default Body