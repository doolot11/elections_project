import { Box } from "@mui/material";
import styled from "@emotion/styled";
import cities from "../data/cities.json"
import { fetchData } from "../services/requests";


function Cities({ regionTitle, setData, setTab,isLoadingParties }) {

  const getCities = async (id) => {
    console.log("id", id);
    // setTab("city")
    isLoadingParties(true)
    try {
      
      const result = await fetchData(`get-parties/?city=${id}`)
      console.log("cities podrobno=", result)
      setData((prevData) => ({
        ...prevData,
        cities: result,
        // infoCity: info,
      }));
      isLoadingParties(false)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
      {
        cities?.filter(i => i.region_id === regionTitle.region_id).map(i => (
          <CityCard
            onClick={() => {
              getCities(i?.slug)
              setData(i.data)
              setTab("city")
            }}
          >{i.name}</CityCard>
        ))
      }
    </Box>
  );
}

export default Cities;


const CityCard = styled(Box)`
  background: white;;
  padding:5px;
  border-radius:5px;

  &:hover {
    transition: all 0.5s ease;
    background: #A9A9A9;
    cursor: pointer;
    color: white;
  }
`


