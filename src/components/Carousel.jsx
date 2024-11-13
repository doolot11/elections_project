import React, { useRef, useState } from 'react';
import { Box } from '@mui/material';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



// import required modules
import { Pagination , Navigation} from 'swiper/modules';
import Counter from '../ui/CounterAnimate';

export default function Carousel() {
  return (
    <Box sx={{padding:"30px 50px",width:"80%",margin:"0 auto",maxWidth:"1400px"}}>
      <Swiper
        slidesPerView={5}
        navigation={true}
        spaceBetween={20}
        modules={[Pagination , Navigation]}
        className="mySwiper"
        breakpoints={{
          200: {
            width: 200,
            slidesPerView: 1,
          },
          576: {
            width: 576,
            slidesPerView: 2,
          },
          768: {
            width: 768,
            slidesPerView: 2.5,
          },
          992:{
            width: 992,
            slidesPerView: 4,
          },
          1200:{
            width: 1200,
            slidesPerView: 5,
          },
          1400:{
            width: 1400,
            slidesPerView: 6,
          }
        }}        
      >
        <SwiperSlide>
            <Box sx={{height:"auto",overflow:'hidden',textAlign:"center",background:"rgba(0, 0, 0, 0.46)"}}>
              <img style={{objectFit:"cover", textAlign:"center"}} src="data:image/jpeg;base64,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" alt="" />
              <Box sx={{padding:"5px 0",textAlign:"center"}}>
              <p style={{color:"white",fontSize:"25px",fontWeight:"700",textAlign:"center"}}>
                <Counter targetNumber={20} parametrs={"%"} />
              </p>
              </Box>
            </Box>
        </SwiperSlide>
        <SwiperSlide>
            <Box sx={{height:"auto",overflow:'hidden',textAlign:"center",background:"rgba(0, 0, 0, 0.46)"}}>
              <img style={{objectFit:"cover", textAlign:"center"}} src="data:image/jpeg;base64,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" alt="" />
              <Box sx={{padding:"5px 0",}}>
              <p style={{color:"white",fontSize:"25px",fontWeight:"700"}}>
                <Counter targetNumber={20} parametrs={"%"} />
              </p>
              </Box>
            </Box>
        </SwiperSlide>
        <SwiperSlide>
            <Box sx={{height:"auto",overflow:'hidden',textAlign:"center",background:"rgba(0, 0, 0, 0.46)"}}>
              <img style={{objectFit:"cover", textAlign:"center"}} src="data:image/jpeg;base64,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" alt="" />
              <Box sx={{padding:"5px 0"}}>
              <p style={{color:"white",fontSize:"25px",fontWeight:"700"}}>
                <Counter targetNumber={20} parametrs={"%"} />
              </p>
              </Box>
            </Box>
        </SwiperSlide>
        <SwiperSlide>
            <Box sx={{height:"auto",overflow:'hidden',textAlign:"center",background:"rgba(0, 0, 0, 0.46)"}}>
              <img style={{objectFit:"cover", textAlign:"center"}} src="data:image/jpeg;base64,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" alt="" />
              <Box sx={{padding:"5px 0"}}>
              <p style={{color:"white",fontSize:"25px",fontWeight:"700"}}>
                <Counter targetNumber={20} parametrs={"%"} />
              </p>
              </Box>
            </Box>
        </SwiperSlide>
       
        
      </Swiper>
    </Box>
  );
}
