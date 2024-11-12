import { Box } from "@mui/material";

function InfoBlog({ data }) {
    return (
        <Box sx={{ margin: "10px" }}>
            <Box sx={{ background: "white", color: "var(--main)", padding: "10px" }}>
                <h2 style={{ fontWeight: "300", fontSize:"20px" }}>{data?.name}</h2>
            </Box>
            <Box sx={{display:"flex",flexDirection:"column",gap:"10px",padding:"0 10px"}}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "white", marginTop: "10px" }}>
                    <p>Атажурт</p>
                    <p>100%</p>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "white", marginTop: "10px" }}>
                    <p>Атажурт</p>
                    <p>100%</p>
                </Box>
            </Box>
        </Box>
    );
}

export default InfoBlog;
