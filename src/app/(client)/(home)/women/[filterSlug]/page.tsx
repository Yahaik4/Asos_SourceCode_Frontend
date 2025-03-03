'use client'
import { usePathname } from "next/navigation"
import DropDownText from "@/components/DropDownText";
import DropDownList from "@/app/(client)/components/DropDownList";
import ProductItem from "@/app/(client)/components/ProductItem";

import imgProduct from '../../../../../../public/Home/Women/Products/product1.avif'
import imgProductHover from '../../../../../../public/Home/Women/Products/productHover1.avif'

const page: React.FC = () => {
    const pathname = usePathname();
    

    return(
        <div className="mb-16">
            <div id="slug" className="flex py-4 px-24 text-sm text-gray-700 border border-gray-300">
                <li className="list-none">Home</li>
                {pathname.split('/').slice(1).map(item => {
                    return <li key={item} className="flex pl-4 capitalize">
                        <p>></p>
                        <div className="ml-4">
                            {item}
                        </div>
                    </li>
                })}
            </div>
            <div className="mt-5 flex flex-col items-center mb-8">
                <h1 className="text-2xl font-bold tracking-widest">Men's adidas</h1>
                <DropDownText>
                adidas needs no introduction. With a history stretching back over 60 years, the brand’s sports and streetwear designs have become key players in wardrobes everywhere. For that fresh-kit motivation, filter by adidas Performance for everything from techy tracksuits to sweat-wicking shorts, vests and compression tights. Inspired by street culture and retro styles, adidas Originals brings those fresh, archive-inspired T-shirts and sweatshirts we all know and love, alongside iconic Superstar, Stan Smith, Gazelle and Continental 80 trainers. Scroll the adidas at ASOS edit to check out our favourites – if you’re not already
                </DropDownText>
            </div>
            <div className="w-full mb-10 px-8 py-2 grid grid-cols-6 gap-2 bg-stone-100 ">
                <div className="">
                    <DropDownList title="Sort" items={["Footwear", "Tops"]}/>
                </div>
                <div className="">
                    <DropDownList title="Category" items={["Footwear", "Tops"]}/>
                </div>
                <div className="">
                    <DropDownList title="Product Type" items={["Footwear", "Tops"]}/>
                </div>
                <div className="">
                    <DropDownList title="Style" items={["Footwear", "Tops"]}/>
                </div>
                <div className="">
                    <DropDownList title="Sort" items={["Footwear", "Tops"]}/>
                </div>
                <div className="">
                    <DropDownList title="Sort" items={["Footwear", "Tops"]}/>
                </div>
                <div className="">
                    <DropDownList title="Sort" items={["Footwear", "Tops"]}/>
                </div>
                <div className="">
                    <DropDownList title="Sort" items={["Footwear", "Tops"]}/>
                </div>
            </div>
            <div className="grid grid-cols-4 px-16 gap-2">
                <ProductItem img={imgProduct} 
                description="adidas Originals Handball Spezial gum sole trainers in brown and white" 
                price="90" imgHover={imgProductHover}/>

                <ProductItem img={imgProduct} 
                description="adidas Originals Handball Spezial gum sole trainers in brown and white" 
                price="90" imgHover={imgProductHover}/>

                <ProductItem img={imgProduct} 
                description="adidas Originals Handball Spezial gum sole trainers in brown and white" 
                price="90" imgHover={imgProductHover}/>

                <ProductItem img={imgProduct} 
                description="adidas Originals Handball Spezial gum sole trainers in brown and white" 
                price="90" imgHover={imgProductHover}/>
                
                <ProductItem img={imgProduct} 
                description="adidas Originals Handball Spezial gum sole trainers in brown and white" 
                price="90" imgHover={imgProductHover}/>

                <ProductItem img={imgProduct} 
                description="adidas Originals Handball Spezial gum sole trainers in brown and white" 
                price="90" imgHover={imgProductHover}/>

                <ProductItem img={imgProduct} 
                description="adidas Originals Handball Spezial gum sole trainers in brown and white" 
                price="90" imgHover={imgProductHover}/>

                <ProductItem img={imgProduct} 
                description="adidas Originals Handball Spezial gum sole trainers in brown and white" 
                price="90" imgHover={imgProductHover}/>
                
            </div>

            <div className="w-full flex flex-col items-center mt-3">
                <p className="text-[#666] text-sm font-normal">You've viewed 72 of 268 products</p>
                <progress className="my-2 h-[3px] appearance-none w-[200px]"></progress>
                <button className="tracking-widest font-bold py-3 px-28 border-2 border-gray-300 mt-2">LOAD MORE</button>
            </div>
        </div>
    )
}

export default page