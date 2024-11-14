import { Box, Typography } from "@mui/material";
import Counter from "../ui/CounterAnimate";
import { useEffect, useState } from "react";
import { fetchData } from "../services/requests";
import styled from "@emotion/styled";
import SelectCustom from "../ui/SelectCustom";
import ModalWindow from "../ui/ModalWindow";

function InfoBlog({ data, tabStatus }) {
    console.log("data in city", data);

    const [modal, setModal] = useState(false)

    const handleOpenModal = () => setModal(true)
    const handleCloseModal = () => setModal(false)

    return (
        <>
            <ModalWindow open={modal} handleClose={handleCloseModal} width="380px">
            <Typography sx={{fontSize:"18px",fontWeight:"700",borderBottom:"1px solid black"}}>Подробная информация</Typography>
                {
                    tabStatus === "region" ? (<></>) :
                        (<>
                            {
                                data?.cities?.map(i => (
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "black", marginTop: "10px" }}>
                                            <p style={{ fontSize: "13px" }}>{i?.name}</p>
                                            <Counter targetNumber={i?.percent} parametrs={"%"} />
                                        </Box>
                                ))
                            }
                        </>)
                }
            </ModalWindow>
            <Box sx={{ margin: "10px" }}>
                <ContainerTitle sx={{ background: "white", color: "var(--main)", padding: "10px" }}>
                    <h2 style={{ fontWeight: "300", fontSize: "20px" }}>{data?.infoCity?.name}</h2>
                    <div>
                        <SelectCustom tabStatus={tabStatus} title={"Выберите город"} />
                    </div>
                </ContainerTitle>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "2px", padding: "0 10px", height: "100%", overflowY: "scroll", maxHeight: "400px", overflowY: "scroll" }}>
                    {
                        tabStatus === "region" ? (<></>) :
                            (<>
                                {
                                    data?.cities?.map(i => (
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "white", marginTop: "10px" }}>
                                            <p style={{ fontSize: "13px" }}>{i?.name}</p>
                                            <Counter targetNumber={i?.percent} parametrs={"%"} />
                                        </Box>
                                    ))
                                }
                            </>)
                    }
                </Box>
                {
                    ((data?.cities?.length && tabStatus === "city") || (data?.region?.length && tabStatus === "region")) ? <p onClick={() => handleOpenModal()} style={{ fontSize: "13px", textTransform: "uppercase", cursor: "pointer", marginTop: "30px" }}>Посмотреть подробнее...</p> : <></>
                }
            </Box>
        </>
    );
}

export default InfoBlog;

const ContainerTitle = styled(Box)`
    background: white;
    color:var(--main);
    padding: 10px;

    div {
        display: none;
        width: 100%;
    }
    
    @media screen and (max-width:767px) {
        padding:3px;
        border-radius: 10px;

        h2 {
            display:none;
        }
        div {
            display:flex;
        }
    }
`
