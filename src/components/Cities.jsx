import { Box } from "@mui/material";
import styled from "@emotion/styled";
import cities from "../data/cities.json"
import { fetchData } from "../services/requests";
import {ReactComponent as CityIcon} from "../images/svg/city.svg"

function Cities({ regionTitle ,setData,setTab,setStatisticParam }) {

  const getCities = async (id) => {
    console.log("id", id);
    // setTab("city")
    try {
      const result = await fetchData(`get-parties/?city=${id}`)
      console.log("cities podrobno=", result)
      setData((prevData) => ({
        ...prevData,
        cities: result,
        // infoCity: info,
      }));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Adaptive sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
      {
        cities?.filter(i => i.region_id === regionTitle.region_id).map(i => (
          <CityCard
            onClick={() => {
              getCities(i?.slug)
              setData(i.data)
              setTab("city")
              setStatisticParam(i?.name)
            }}
          >
            <CityIcon/>
            <p>{i?.name}</p>
            </CityCard>
        ))
      }
    </Adaptive>
  );
}

export default Cities;

const Adaptive = styled(Box)`

  @media screen and (max-width:1100px) {
    grid-template-columns: repeat(3 , 1fr);
  }

  @media screen and (max-width:992px) {
    grid-template-columns: repeat(2 , 1fr);
  }

  @media screen and (max-width:767px) {
    grid-template-columns: repeat(3 , 1fr);
  }
  @media screen and (max-width:700px) {
    grid-template-columns: repeat(2 , 1fr);
  }
`

const CityCard = styled(Box)`
  background: white;;
  padding:5px;
  border-radius:5px;
  display:flex;
  align-items:center;
  gap:5px;

  & svg {
    width: 20px;
    height:20px;
  }

  &:hover {
    transition: all 0.5s ease;
    background: #A9A9A9;
    cursor: pointer;
    color: white;
  }


  @media screen and (max-width:767px){
    & svg {
    width: 18px;
    height:18px;
  }
  }
`


