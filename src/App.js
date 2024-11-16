import { Box, Tab, Tabs, Typography } from "@mui/material";
import MapTest from "./components/MapTest";
import InfoBlog from "./components/InfoBlog";
import { useEffect, useState } from "react";
import Carousel from "./components/Carousel";
import MapWithCities from "./components/MapWithCities";
import logoIcon from "./images/png/logo.png"
import styled from "@emotion/styled";
import { fetchData } from "./services/requests";
import Cities from "./components/Cities";
import SneckBar from "./ui/SneckBar";
import SneckCity from "./ui/SneckCity";


function App() {
  const [data, setData] = useState({
    cities: [],
    parties: [],
    infoCity: {},
    infoRegion: {},
  })

  const [votesOfCities, setVotesOfCities] = useState([])
  const [statisticParam, setStatisticParam] = useState("")
  const [detailInfo, setDetailInfo] = useState({})


  // dont touch )
  const [value, setValue] = useState(0);
  const [regionTitle, setRegionTitle] = useState({
    name: "",
    region_id: null,
  })
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

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
      setRegionTitle({
        name: "",
        region_id: null,
      })
      setDetailInfo({})
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
  const [loadingCities, isLoadingCities] = useState(false)
  async function getCitiesWithParty(e) {
    isLoadingCities(true)
    const result = await fetchData(`cities/?party=${e.party_slug}`)
    setTab("region")
    setVotesOfCities(result)
    isLoadingCities(false)
  }
  const [statusParties, setStatusParties] = useState(false)
  function isLoadingParties(e) {
    setStatusParties(e)

  }

  console.log("detailInfo", detailInfo);

  return (
    <>
      <NotifContinainer>
        <div className="desk">
          {
            value === 0 ? <SneckBar v={"top"} h={"right"} text={"Нажмите по региону для подробной информации"} /> : <SneckCity v={"top"} h={"right"} text={"Выберите город для подробной информации"} />
          }
        </div>
        <div className="mob">
          {
            value === 0 ? <SneckBar v={"bottom"} h={"center"} text={"Нажмите по региону для подробной информации"} /> : <SneckCity v={"bottom"} h={"center"} text={"Выберите город для подробной информации"} />
          }
        </div>

      </NotifContinainer>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "auto" }}>
        <ContainerMainTitle>
          {/* <h1 style={{ color: "var(--main)", fontWeight: "500", fontSize: "35px" }}>Парламент 2024</h1> */}
          <Box className="title-container">
            <Box>
              <img onClick={() => setValue(0)} style={{ height: "110px", padding: "10px 0", cursor: "pointer" }} src={logoIcon} alt="Логотип" />
            </Box>
            <Typography sx={{ "h2": { xs: { fontSize: "14px" }, md: { fontSize: "24px" } } }}>
              <h2>Выборы депутатов местных кенешей Кыргызской Республики - 17 ноября 2024 года </h2>
            </Typography>
          </Box>
        </ContainerMainTitle>
        {
          (value === 1 && (data?.cities?.length || data?.parties?.length)) &&
          <Box sx={{ textAlign: "center", padding: "10px 0" }}>
            <h3 style={{ fontWeight: "500", color: "white" }}>Итоги голосования на выборах депутатов местных кенешей</h3>
          </Box>
        }

        <Box>
          <TabPanel value={value} index={1}>
            <Carousel statusParties={statusParties} setStatisticParam={setStatisticParam} getCitiesWithParty={getCitiesWithParty} data={data} tabStatus={tab} />
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
            <Tab value={0} {...a11yProps(0)} sx={{ "&.Mui-selected": { color: "white" }, fontFamily: "roboto" }} label="Регионы" />
            {value !== 0 && <Tab value={1} {...a11yProps(1)} sx={{ "&.Mui-selected": { color: "white" }, fontFamily: "roboto" }} label={value === 0 ? "" : regionTitle?.name} />}
          </Tabs>
        </Box>
        <ContinerBlog>
          <TabPanel value={value} index={0}>
            <MapTest setRegionTitle={setRegionTitle} setValue={setValue} setData={setData} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            {/* <MapWithCities setTab={setTab} setData={setData} /> */}
            <WrapperCities>
              <Cities setDetailInfo={setDetailInfo} isLoadingParties={isLoadingParties} setStatisticParam={setStatisticParam} setTab={setTab} setData={setData} regionTitle={regionTitle} />
              <InfoBlog detailInfo={detailInfo} loadingCities={loadingCities} statisticParam={statisticParam} setTab={setTab} setData={setData} votesOfCities={votesOfCities} tabStatus={tab} data={data} />
            </WrapperCities>
          </TabPanel>
        </ContinerBlog>
      </Box>
    </>
  );
}

export default App;

const NotifContinainer = styled(Box)`
  .mob {
    display: none;
  }
  @media screen and (max-width:767px) {
    .desk {
      display:none;
    }
    .mob{
      display: block;
    }
  }
`

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

const ContainerMainTitle = styled(Box)`
  background: white;
  .title-container {
    width:80%;
    margin:0 auto;
    display:flex;
    align-items: center;
    gap:20px;

    @media screen and (max-width:767px) {
      width:90%;
    }
  }
`

const ContinerBlog = styled(Box)`
  display:grid;
  grid-template-columns: 80%;
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