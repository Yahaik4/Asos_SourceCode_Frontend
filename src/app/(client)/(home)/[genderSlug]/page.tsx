'use client'
import Body from '../../components/Body'
import { usePathname } from 'next/navigation'

import img from '../../../../../public/Home/Women/homeNav.avif' 
import side2 from '../../../../../public/Home/Women/slide2.avif'
import side3 from '../../../../../public/Home/Women/silde3.avif'
import side4 from '../../../../../public/Home/Women/silde4.avif'
import side5 from '../../../../../public/Home/Women/slide5.avif'
import side6 from '../../../../../public/Home/Women/silde6.avif'
import mainImgHome from '../../../../../public/Home/Women/mainImgHomeWomen.avif'
import sessionImg1 from '../../../../../public/Home/Women/sessionImg1.avif'
import sessionImg2 from '../../../../../public/Home/Women/sessionImg2.avif'


import men from '../../../../../public/Home/Women/homeNav.avif' 

export default function(){
    const pathname = usePathname();

    return (
        <>
            {(pathname.includes("/women")) &&
                <Body heroImg={mainImgHome} sessionImg1={sessionImg1} sessionImg2={sessionImg2} slide={[img, side2, side3, side4, side5, side6]} ></Body>
            }
            {
                (pathname.includes("/men")) &&
                <Body heroImg={men} sessionImg1={men} sessionImg2={men} slide={[men, men, men, men, men, men]} ></Body>
            }
        </>
    )
}