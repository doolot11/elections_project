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
              city_main:'bishkek'
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
              city_main:'osh'
            }));
        }} className='osh'></span>
        </Tooltip>

    </Container>
  );
};

export default MapTest;


const ContainerSvg = styled(Box)`

`

const Container = styled(Box)`
  position: relative;

  .bishkek {
    position: absolute;
    z-index: 1;
    top: 7%;
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


  @media screen and (max-width:1200px) {
    .bishkek , .osh {
      width: 22px;
      height:22px;
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
`