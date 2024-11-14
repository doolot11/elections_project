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
import styled from '@emotion/styled';

export default function Carousel({data,tabStatus}) {
  console.log("data carousel",data);
  
  return (
    <Continer>
      <Swiper
        slidesPerView={5}
        navigation={true}
        spaceBetween={20}
        modules={[Pagination , Navigation]}
        className="mySwiper"
        breakpoints={{
          200: {
            width: 200,
            slidesPerView: 0.8,
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
          {
            tabStatus === "region" ? (<></>) :
                (<>
                    {
                        data?.cities?.map(i => (
                          <SwiperSlide>
                          <Box sx={{height:"auto",overflow:'hidden',textAlign:"center",background:"rgba(0, 0, 0, 0.46)"}}>
                            <img style={{objectFit:"cover", textAlign:"center"}} src={i?.logo} alt="Логотип партии" />
                            <Box sx={{padding:"5px 0",textAlign:"center"}}>
                            <p style={{color:"white",fontSize:"25px",fontWeight:"700",textAlign:"center"}}>
                              <Counter targetNumber={i?.percent} parametrs={"%"} />
                            </p>
                            </Box>
                          </Box>
                      </SwiperSlide>
                        ))
                    }
                </>)
        }
        
       
        
      </Swiper>
    </Continer>
  );
}

const Continer = styled(Box)`
  padding:30px 50px;
  width:80%;
  margin:0 auto;
  max-width:1400;

  @media screen and (max-width:767px) {
    width:90%;
  }
`