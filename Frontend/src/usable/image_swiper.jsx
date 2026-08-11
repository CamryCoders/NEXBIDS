import {Swiper,SwiperSlide} from 'swiper/react'
import {Autoplay,Navigation,Pagination} from 'swiper/modules'

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Imageslider=({images})=>{
    
    return (
        <Swiper
modules={[Autoplay,Navigation,Pagination]}
spaceBetween={20}
slidesPerView={1}
// navigation
pagination={{clickable:true}}
autoplay={{
    delay:1500,
    disableOnInteraction:true,
}}
loop={true}
>

    {images.map((image,index)=>(
        <SwiperSlide key={index}>
            <img
            src={image.url}
            className="w-full h-[400px] object-cover rounded-lg"
            />
        </SwiperSlide>
    ))}

        </Swiper>
    )
}

export {Imageslider}