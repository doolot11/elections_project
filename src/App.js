import { Box, Tab, Tabs } from "@mui/material";
import MapTest from "./components/MapTest";
import InfoBlog from "./components/InfoBlog";
import { useEffect, useState } from "react";
import Carousel from "./components/Carousel";
import MapWithCities from "./components/MapWithCities";
import logoIcon from "./images/png/logo.png"
import styled from "@emotion/styled";
import { fetchData } from "./services/requests";

function App() {
  const [data, setData] = useState({
    cities: [],
    parties: [],
    infoCity:{},
    infoRegion:{}
  })

  const getCities = async () => {
    try {
      const result = await fetchData("api/1")
      console.log("cities=", result)
    } catch (error) {
      console.log(error);
    }
  }

  const getParties = async() => {
    try {
        const result = await fetchData("api/2")
        console.log("parties=",result)
    } catch (error) {
        console.log(error);
    }
  }
  
  useEffect(()=>{
    // getCities()
    // getParties()
  },[])



  // dont touch )
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => { setValue(newValue); }


  // tabs logic
  const [tab,setTab] = useState("region")
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    
    if(value === 0){
      setTab("region")
    }else {
      setTab("city")
    }

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            {children}
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "auto" }}>
      <Box sx={{ background: "white", textAlign: "center", padding: "0" }}>
        {/* <h1 style={{ color: "var(--main)", fontWeight: "500", fontSize: "35px" }}>Парламент 2024</h1> */}
        <img style={{ height: "130px" }} src={logoIcon} alt="Логотип" />
      </Box>
      <Box>
        <Carousel data={data} tabStatus={tab} />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Tabs
          value={value}
          variant="scrollable"
          onChange={handleChange}
          textColor="inherit"
          TabIndicatorProps={{
            style: {
              backgroundColor: "white", // цвет линии под активным табом
            },
          }}
        >
          <Tab value={0} {...a11yProps(0)} sx={{ "&.Mui-selected": { color: "white" } }} label="ЕДИНЫЙ ОКРУГ" />
          < Tab value={1} {...a11yProps(1)} sx={{ "&.Mui-selected": { color: "white" } }} label="ОДНОМАНДАТНЫЕ ОКРУГА" />
        </Tabs>
      </Box>
      <ContinerBlog>
        <TabPanel value={value} index={0}>
          <MapTest setData={setData} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MapWithCities setData={setData} />
        </TabPanel>
        <InfoBlog tabStatus={tab} data={data} />
      </ContinerBlog>
    </Box>
  );
}

export default App;


const ContinerBlog = styled(Box)`
  display:grid;
  grid-template-columns: 80% 20%;
  align-items:start;
  width: 80%;
  margin:50px auto;
  max-width:1400px;


  @media screen and (max-width:1200px) {
    grid-template-columns: 70% 30%;
  }

  @media screen and (max-width:992px) {
    grid-template-columns: 70% 30%;
  }

  @media screen and (max-width:767px) {
    grid-template-columns: 1fr;
    width:90%;
  }
`
