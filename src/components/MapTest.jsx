import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { fetchData } from '../services/requests';
import {paths} from "../data/region"

const MapTest = ({ setData ,setValue,setRegionTitle}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [datan,setDatan] = useState({})

  
  const getCities = async (id) => {
    console.log("id",id);
    try {
      const result = await fetchData(id)
      console.log("cities podrobno=", result)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box sx={{ width: "100%", height: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
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
                region_id:path.region_id,
              }));
              console.log(path);
            }}
          />
        ))}
      </svg>

    </Box>
  );
};

export default MapTest;
