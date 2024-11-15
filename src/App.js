import { Box, Tab, Tabs } from "@mui/material";
import MapTest from "./components/MapTest";
import InfoBlog from "./components/InfoBlog";
import { useEffect, useState } from "react";
import Carousel from "./components/Carousel";
import MapWithCities from "./components/MapWithCities";
import logoIcon from "./images/png/logo.png"
import styled from "@emotion/styled";
import { fetchData } from "./services/requests";
import Cities from "./components/Cities";

function App() {
  const [data, setData] = useState({
    cities: [],
    parties: [],
    infoCity: {},
    infoRegion: {},
  })

  const [votesOfCities, setVotesOfCities] = useState([])
  const [statisticParam,setStatisticParam] = useState("")


  // dont touch )
  const [value, setValue] = useState(0);
  const [regionTitle, setRegionTitle] = useState({
    name: "",
    region_id: null,
  })
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  console.log("изменние табов", value);
  useEffect(() => {
    if (value === 0) {
      setData({
        cities: [],
        parties: [],
        infoCity: {},
        infoRegion: {},
      });
      setVotesOfCities([])
      setStatisticParam("")
      console.log("Данные очищены");
    }
  }, [value, setData]);


  // tabs logic
  const [tab, setTab] = useState("region")
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    // if (value === 0) {
    //   setTab("region")
    // } else {
    //   setTab("city")
    // }

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

  async function getCitiesWithParty(e) {
    const result = await fetchData(`cities/?party=${e.party_slug}`)
    console.log(result);
    setTab("region")
    setVotesOfCities(result)
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "auto" }}>
      <Box sx={{ background: "white", textAlign: "center", padding: "0" }}>
        {/* <h1 style={{ color: "var(--main)", fontWeight: "500", fontSize: "35px" }}>Парламент 2024</h1> */}
        <img style={{ height: "130px" }} src={logoIcon} alt="Логотип" />
      </Box>
      <Box>
        <TabPanel value={value} index={1}>
          <Carousel setStatisticParam={setStatisticParam} getCitiesWithParty={getCitiesWithParty} data={data} tabStatus={tab} />
        </TabPanel>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Tabs
          value={value}
          variant="scrollable"
          onChange={handleChange}
          textColor="inherit"
          TabIndicatorProps={{
            style: {
              backgroundColor: "white",
            },
          }}
        >
          <Tab value={0} {...a11yProps(0)} sx={{ "&.Mui-selected": { color: "white" } }} label="ЕДИНЫЙ ОКРУГ" />
          {value !== 0 && <Tab value={1} {...a11yProps(1)} sx={{ "&.Mui-selected": { color: "white" } }} label={value === 0 ? "" : regionTitle?.name} /> }
        </Tabs>
      </Box>
      <ContinerBlog>
        <TabPanel value={value} index={0}>
          <MapTest setRegionTitle={setRegionTitle} setValue={setValue} setData={setData} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          {/* <MapWithCities setTab={setTab} setData={setData} /> */}
          <WrapperCities>
            <Cities setStatisticParam={setStatisticParam} setTab={setTab} setData={setData} regionTitle={regionTitle} />
            <InfoBlog statisticParam={statisticParam} setTab={setTab} setData={setData} votesOfCities={votesOfCities} tabStatus={tab} data={data} />
          </WrapperCities>
        </TabPanel>
      </ContinerBlog>
    </Box>
  );
}

export default App;

const WrapperCities = styled(Box)`
  width: 100%;
  display:grid;
  gap:2%;
  grid-template-columns:65% 33%;
  align-items: start;
  margin: 0 auto;

  @media screen and (max-width:1200px) {
    grid-template-columns: 65% 33%;
  }

  @media screen and (max-width:992px) {
    grid-template-columns: 55% 43%;
  }

  @media screen and (max-width:767px) {
    grid-template-columns: 1fr;
    width:90%;
  }

`

const ContinerBlog = styled(Box)`
  display:grid;
  grid-template-columns: 100%;
  align-items:center;
  justify-content: center;
  width: 80%;
  margin:50px auto;
  max-width:1400px;


  @media screen and (max-width:1200px) {
    /* grid-template-columns: 70% 30%; */
    width: 80%;
  }

  @media screen and (max-width:992px) {
    /* grid-template-columns: 70% 30%; */
    width: 90%;

  }

  @media screen and (max-width:767px) {
    /* grid-template-columns: 1fr; */
    width:100%;
  }
`
