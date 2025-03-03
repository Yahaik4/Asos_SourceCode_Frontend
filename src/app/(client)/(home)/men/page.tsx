'use client'
import Body from '../../components/Body'


import side1 from '../../../../../public/Home/Men/slide1.avif' 
import side2 from '../../../../../public/Home/Men/slide2.avif'
import side3 from '../../../../../public/Home/Men/slide3.avif'
import side4 from '../../../../../public/Home/Men/slide4.avif'
import side5 from '../../../../../public/Home/Men/silde5.avif'
import side6 from '../../../../../public/Home/Men/silde6.avif'
import mainImgHome from '../../../../../public/Home/Men/heroImg.webp'
import sessionImg1 from '../../../../../public/Home/Men/sessionImg1.avif'
import sessionImg2 from '../../../../../public/Home/Men/sessionImg2.avif'

export default function(){
    return (
        <>
            <Body heroImg={mainImgHome} sessionImg1={sessionImg1} sessionImg2={sessionImg2} slide={[side1, side2, side3, side4, side5, side6]} ></Body>
        </>
    )
}