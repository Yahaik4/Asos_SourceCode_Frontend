'use client'
import Body from '../../components/Body'
import { usePathname, notFound } from 'next/navigation'

import img from '../../../../../public/Home/Women/homeNav.avif' 
import side2 from '../../../../../public/Home/Women/slide2.avif'
import side4 from '../../../../../public/Home/Women/silde4.avif'
import side5 from '../../../../../public/Home/Women/slide5.avif'
import side6 from '../../../../../public/Home/Women/silde6.avif'
import mainImgHome from '../../../../../public/Home/Women/mainImgHomeWomen.avif'
import sessionImg1 from '../../../../../public/Home/Women/sessionImg1.avif'
import sessionImg2 from '../../../../../public/Home/Women/sessionImg2.avif'

import hoodieWomen from '../../../../../public/Home/Women/hoodieWomen.png'
import jacketWomen from '../../../../../public/Home/Women/jacketWomen.png'
import sneaderWomen from '../../../../../public/Home/Women/sneakerWomen.png'
import bootWomen from '../../../../../public/Home/Women/bootsWomen.png'
import sandalWomen from '../../../../../public/Home/Women/sandalWomen.png'
import formalShoeWomen from '../../../../../public/Home/Women/fomalShoeWomen.png'
import pantWomen from '../../../../../public/Home/Women/silde3.avif'
import loaFersWomen from '../../../../../public/Home/Women/loadFersWomen.png'
import ringWomen from '../../../../../public/Home/Women/ringWomen.png'
import necklaceWomen from '../../../../../public/Home/Women/necklaceWomen.png'
import braceletsWomen from '../../../../../public/Home/Women/BraceletsWomen.png'
import earringsWomen from '../../../../../public/Home/Women/earringsWomen.png'
import watchWomen from '../../../../../public/Home/Women/watchesWomen.jpg'

import { fetchAllCategory } from '@/Services/categoryService'
import { useFetch } from '@/Hook/useFetch'
import { useEffect } from 'react'

import men from '../../../../../public/Home/Women/homeNav.avif' 
import { Category } from '@/app/models/Category'

export default function(){
    const pathname = usePathname();
    const VALID_GENDERS = ['women', 'men'];
    var categoryName = [];
    const { isFetching, fetchedData: categories, error } = useFetch<Category[]>(fetchAllCategory, []);
    console.log(categories);
    for(var item of categories){
        categoryName.push(item.name);
    }
    console.log( categoryName);
    

    if(isFetching) return <p>Loading...</p>
    if(error) return <p>Error: {error.message}</p>

    if (!VALID_GENDERS.includes(pathname.split('/')[1])) {
        notFound();
    }


    return (
        <>
            {(pathname.includes("/women")) &&
                <Body heroImg={mainImgHome} sessionImg1={sessionImg1} 
                    sessionImg2={sessionImg2} slide={[hoodieWomen, jacketWomen, pantWomen, sneaderWomen, bootWomen, sandalWomen, formalShoeWomen, loaFersWomen,
                        ringWomen, necklaceWomen, braceletsWomen, earringsWomen
                    ]} 
                    categoryName={categoryName}
                >    
                </Body>
            }
            {
                (pathname.includes("/men")) &&
                <Body heroImg={men} sessionImg1={men} 
                    sessionImg2={men} slide={[men, men, men, men, men, men]} 
                    categoryName={categoryName}
                >
                </Body>
            }
        </>
    )
}