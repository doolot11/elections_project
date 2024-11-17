import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { fetchData } from '../services/requests';
import { paths } from "../data/region"
import styled from '@emotion/styled';
import Tooltip from '@mui/material/Tooltip';


const MapTest = ({ setData, setValue, setRegionTitle }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [datan, setDatan] = useState({})
  const [] = useState()


  const getCities = async (id) => {
    try {
      const result = await fetchData(id)
      console.log("cities podrobno=", result)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container sx={{ width: "100%", height: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <svg
        xmlnsMapsvg="http://mapsvg.com"
        xmlnsDc="http://purl.org/dc/elements/1.1/"
        xmlnsRdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
        xmlnsSvg="http://www.w3.org/2000/svg"
        xmlns="http://www.w3.org/2000/svg"
        mapsvgGeoViewBox="69.259411 43.256543 80.288715 39.169714"
        width="100%"
        height="auto"
        viewBox="0 0 820 500"
      // viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet"
      // viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet"
      >
        {paths.map((path, index) => (
          <path
            key={path.id}
            d={path.d}
            // d={path?.find(i => i.id ===)}
            style={{
              stroke: 'var(--main)',
              fill: clickedIndex === index
                ? '#A9A9A9'
                : hoveredIndex === index
                  ? '#D3D3D3'
                  : 'white',
              strokeWidth: 2,
              transition: 'all 0.5s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => {
              setClickedIndex(index);
              setData(path.data);
              setValue(1)
              // setRegionTitle(path?.data?.name)
              setRegionTitle((prevState) => ({
                ...prevState,
                name: path?.data?.name,
                region_id: path.region_id,
              }));
              console.log(path);
            }}
          />
        ))}
      </svg>


      <Tooltip title="г.Бишкек">
        <span onClick={() => {
          setValue(1)
          setRegionTitle((prevState) => ({
            ...prevState,
            name: "г.Бишкек",
            region_id: '',
            city_main: 'bishkek'
          }));
        }} className='bishkek'></span>
      </Tooltip>

      {/* <Tooltip title="Ош"><span className='osh'></span></Tooltip> */}
      <Tooltip title="г.Ош">
        <span onClick={() => {
          setValue(1)
          setRegionTitle((prevState) => ({
            ...prevState,
            name: "г.Ош",
            region_id: '',
            city_main: 'osh'
          }));
        }} className='osh'></span>
      </Tooltip>
      <span className='chui_title region-title'>Чуйская <br className='active_mobile'></br> область</span>
      <span className='osh_title region-title'>Ошская <br className='active_mobile'></br> область</span>
      <span className='kol_title region-title'>Иссык-Кульская <br className='active_mobile'></br> область</span>
      <span className='naryn_title region-title'>Нарынская <br className='active_mobile'></br> область</span>
      <span className='talas_title region-title'>Таласская <br className='active_mobile'></br> область</span>
      <span className='batken_title region-title'>Баткенская <br className='active_mobile'></br> область</span>
      <span className='jalalabad_title region-title'>Джалал-Абадская <br className='active_mobile'></br> область</span>
      
      <span className='bishkek_title region-title'>г.Бишкек <br className='active_mobile'></br> </span>
      <span className='osh_titles region-title'>г.Ош <br className='active_mobile'></br> </span>

    </Container>
  );
};

export default MapTest;


const ContainerSvg = styled(Box)`

`

const Container = styled(Box)`
  position: relative;

  .active_mobile {
    display:none;
  } 
  .bishkek_title {
    position: absolute;
    top: 7%;
    left: 43.5%;
    z-index: 1;
    color:red;
  }

  .osh_titles {
    position: absolute;
    bottom: 45%;
    left: 38.5%;
    z-index: 1;
    color:red;
  }
  

  .bishkek {
    position: absolute;
    z-index: 1;
    top: 6%;
    left: 40%;
    width: 25px;
    height:25px;
    background-color: red;
    border-radius: 50%;
  }

  .osh {
    position: absolute;
    z-index: 1;
    bottom: 45%;
    left: 35%;
    width: 25px;
    height:25px;
    background-color: red;
    border-radius: 50%;
  }
  .chui_title {
    position: absolute;
    z-index: 1;
    top: 11%;
    left: 40%;
    font-weight: bold;
  }
  .kol_title {
    position: absolute;
    z-index: 1;
    top: 18%;
    left: 67%;font-weight: bold;
  }
  .batken_title {
    position: absolute;
    z-index: 1;
    top: 63%;
    left: 5%;
    font-weight: bold;
  }
  .jalalabad_title {
    position: absolute;
    z-index: 1;
    top: 28%;
    left: 16%;
    font-weight: bold;
  }
  .naryn_title {
    position: absolute;
    z-index: 1;
    top: 35%;
    left: 49%;font-weight: bold;
  }
  .talas_title {
    position: absolute;
    z-index: 1;
    top: 13%;
    left: 17%;font-weight: bold;
  }
  .osh_title {
    position: absolute;
    z-index: 1;
    top: 57%;
    left: 28%;font-weight: bold;
  }


  @media screen and (max-width:1200px) {
    .bishkek , .osh {
      width: 22px;
      height:22px;
    }

    .region-title {
      font-size:14px;;
    }
  }

  @media screen and (max-width:992px) {
    .active_mobile{
      display:block;
    }
  }

  @media screen and (max-width:767px) {
    .region-title {
      font-size:12px;;
    }
  }
  @media screen and (max-width:1200px) {
    .bishkek , .osh {
      width: 22px;
      height:22px;
    }
  }

  @media screen and (max-width:576px) {
    .bishkek , .osh {
      width: 15px;
      height:15px;
    }
  }
  @media screen and (max-width:576px) {
    .osh_title , .chui_title, .batken_title ,.talas_title,.jalalabad_title,.naryn_title,.kol_title {
     font-size: 10px;
     font-weight: 400;
    }
  }
`