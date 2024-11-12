import { Box, Tab, Tabs } from "@mui/material";
import MapTest from "./components/MapTest";
import InfoBlog from "./components/InfoBlog";
import { useState } from "react";
import Carousel from "./components/Carousel";
import MapWithCities from "./components/MapWithCities";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

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

function App() {
  const [data, setData] = useState()
  const [value, setValue] = useState(0);
  console.log("main data=", data);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (

    <Box>
      <Box sx={{ background: "white", textAlign: "center", padding: "10px" }}>
        <h1 style={{ color: "#20B2AA", fontWeight: "500", fontSize: "35px" }}>Парламент 2024</h1>
      </Box>
      <Box>
        <Carousel />
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
      <Box sx={{ display: "grid", gridTemplateColumns: "80% 20%", alignItems: "start" }}>
        <TabPanel value={value} index={0}>
          <MapTest setData={setData} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MapWithCities setData={setData} />
        </TabPanel>
        <InfoBlog data={data} />
      </Box>
    </Box>
  );
}

export default App;
