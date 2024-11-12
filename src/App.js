import { Box } from "@mui/material";
import MapTest from "./components/MapTest";
import InfoBlog from "./components/InfoBlog";
import { useState } from "react";
import Carousel from "./components/Carousel";

function App() {
  const [data,setData] = useState()
  console.log("main data=",data);
  
  return (

    <Box sx={{display:"flex",flexDirection:"column",gap:"auto"}}>
      <Box sx={{background:"white",textAlign:"center",padding:"10px"}}>
        <h1 style={{color:"#20B2AA",fontWeight:"500",fontSize:"35px"}}>Парламент 2024</h1>
      </Box>
      <Box sx={{width:"80%",maxWidth:"1200px",margin:"0 auto"}}>
        <Carousel/>
      </Box>
      <Box sx={{display:"grid",gridTemplateColumns:"80% 20%",alignItems:"start",width:"80%",maxWidth:"1200px",margin:"0 auto"}}>
        <MapTest setData={setData}/>
        <InfoBlog data={data}/>
      </Box>
    </Box>
  );
}

export default App;
