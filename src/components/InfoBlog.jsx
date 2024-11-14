import { Box } from "@mui/material";
import Counter from "../ui/CounterAnimate";
import { useEffect, useState } from "react";
import { fetchData } from "../services/requests";

function InfoBlog({data}) {
    return (
        <Box sx={{ margin: "10px" }}>
            <Box sx={{ background: "white", color: "var(--main)", padding: "10px" }}>
                <h2 style={{ fontWeight: "300", fontSize:"20px" }}>{data?.name}</h2>
            </Box>
            <Box sx={{display:"flex",flexDirection:"column",gap:"10px",padding:"0 10px"}}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "white", marginTop: "10px" }}>
                    <p>Атажурт</p>
                    <Counter targetNumber={100} parametrs={"%"}/>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "white", marginTop: "10px" }}>
                    <p>Атажурт</p>
                    <Counter targetNumber={100} parametrs={"%"}/>
                </Box>
            </Box>
        </Box>
    );
}

export default InfoBlog;
