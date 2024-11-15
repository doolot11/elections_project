import React, { useRef, useState } from 'react';
import { Box, Skeleton } from '@mui/material';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import Counter from '../ui/CounterAnimate';
import styled from '@emotion/styled';

export default function Carousel({statusParties, data, tabStatus, getCitiesWithParty , setStatisticParam }) {
  return (
    <Continer>
      <Swiper
        slidesPerView={5}
        navigation={true}
        spaceBetween={20}
        modules={[Pagination, Navigation]}
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
          992: {
            width: 992,
            slidesPerView: 4,
          },
          1200: {
            width: 1200,
            slidesPerView: 5,
          },
          1400: {
            width: 1400,
            slidesPerView: 6,
          }
        }}
      >
        {statusParties && <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {
            [...Array(5)].map((_, index) => (
              <Skeleton key={"skeleton" + index} sx={{ width: "200px", height: "160px" }} variant='rectangular'></Skeleton>
            ))
          }
        </Box>}
        {
          // tabStatus === "region" ? (<></>) :
            (<>
              {
                data?.cities?.map(i => (
                  <SwiperSlide onClick={() => {
                    getCitiesWithParty(i)
                    setStatisticParam(i?.name)
                    }}>
                    <Box sx={{ height: "auto", overflow: 'hidden', textAlign: "center", background: "rgba(0, 0, 0, 0.46)", width: "210px" }}>
                      <Box sx={{height: "150px", display: "flex", justifyContent: "center", alignItems: "center", paddiing: "4px"}}>
                        <img style={{  width: "100%" }} src={i?.logo} alt="Логотип партии" />
                      </Box>
                      <Box sx={{ padding: "5px 0", textAlign: "center" }}>
                        <p style={{ color: "white", fontSize: "25px", fontWeight: "700", textAlign: "center" }}>
                          <Counter targetNumber={i?.percent} parametrs={"%"} />
                        </p>
                      </Box>
                    </Box>
                    {/* <Box sx={{ padding: "5px 0", textAlign: "center" }}>
                      <p style={{ color: "white", fontSize: "25px", fontWeight: "700", textAlign: "center" }}>
                        <Counter targetNumber={i?.percent} parametrs={"%"} />
                      </p>
                    </Box> */}
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