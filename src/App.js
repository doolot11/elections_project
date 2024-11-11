import { Box } from "@mui/material";
import MapTest from "./components/MapTest";
import InfoBlog from "./components/InfoBlog";
import { useState } from "react";
import Carousel from "./components/Carousel";

function App() {
  const [data,setData] = useState()
  console.log("main data=",data);
  
  return (

    <Box>
      <Box sx={{background:"white",textAlign:"center",padding:"10px"}}>
        <h1 style={{color:"#20B2AA",fontWeight:"500",fontSize:"35px"}}>Парламент 2024</h1>
      </Box>
      <Box>
        <Carousel/>
      </Box>
      <Box sx={{display:"grid",gridTemplateColumns:"80% 20%",alignItems:"start"}}>
        <MapTest setData={setData}/>
        <InfoBlog data={data}/>
      </Box>
    </Box>
  );
}

export default App;
