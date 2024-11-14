import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectCustom({ title, data, tabStatus }) {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
        if (tabStatus === "region" || age?.length) {
            console.log("region");
        } else {
            console.log("city");
        }
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
                {tabStatus === "region" ? "Выберите область" : "Выберите город"}
            </InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={age}
                label="Age"
                onChange={handleChange}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
