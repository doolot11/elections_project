import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import cities from "../data/cities.json"
import { fetchData } from '../services/requests';


export default function SelectCustom({ title, data, tabStatus ,setData,setTab}) {
    const [age, setAge] = React.useState('');

    const getCities = async (id,info) => {
        console.log("id", id);
        try {
            const result = await fetchData(`get-parties/?city=${id}`)
            console.log("cities podrobno=", result)
            setData((prevData) => ({
                ...prevData,
                cities: result,
                infoCity:info,
            }));
            setTab("city")
        } catch (error) {
            console.log(error);
        }
    }
    
    const handleChange = (event) => {
        setAge(event.target.value);
        if (tabStatus === "region" || age?.length) {
            console.log("region");
        } else {
            console.log("city");
        }

        console.log("select data",age);
        getCities(age)
    };
    console.log("age", age);
    

    // Define options as an array depending on tabStatus
    const options = tabStatus === "region" 
        ? [
            { value: "чуй", label: "Нет" },
            { value: 10, label: "Чуй" },
            { value: 20, label: "Нарый" },
            { value: 30, label: "и тд" }
          ]
        : [
            { value: "", label: "None" },
            { value: 10, label: "Бишкек" },
            { value: 20, label: "Чолпон Ата" },
            { value: 30, label: "Thirty" }
          ];

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">
                {/* {tabStatus === "region" ? "Выберите область" : "Выберите город"} */}
                Выберите город
            </InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={age}
                label="Age"
                onChange={handleChange}
            >
                {cities?.map((option) => (
                    <MenuItem key={option.name} value={option.slug}>
                        {option.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
