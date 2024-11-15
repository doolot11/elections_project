import { Box, Modal, Skeleton, Typography } from "@mui/material";
import Counter from "../ui/CounterAnimate";
import { useEffect, useState } from "react";
import { fetchData } from "../services/requests";
import styled from "@emotion/styled";
import SelectCustom from "../ui/SelectCustom";
import ModalWindow from "../ui/ModalWindow";
import cities from "../data/cities.json"

function InfoBlog({ loadingCities, data, votesOfCities, tabStatus, setData, setTab }) {
    console.log("data in infoBlock", data, tabStatus);

    const [modal, setModal] = useState(false)
    const [modalParty, setModalParty] = useState(false)

    const handleOpenModal = () => setModal(true)
    const handleCloseModal = () => setModal(false)

    return (
        <>
            <ModalWindow open={modal} handleClose={handleCloseModal} width="400px">
                <Typography sx={{ fontSize: "18px", fontWeight: "700", borderBottom: "1px solid black" }}>Подробная информация</Typography>
                {
                    tabStatus === "region" ? (<>
                        {/* {
                            votesOfCities?.map(i => (
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "black", marginTop: "10px" }}>
                                    <p style={{ fontSize: "13px" }}>{cities.find((city) => city.slug === i.city_slug)?.name
                                    }</p>
                                    <Counter targetNumber={i?.percent} parametrs={"%"} />
                                </Box>
                            ))
                        } */}
                    </>) :
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
            <ModalWindow open={modalParty} handleClose={() => setModalParty(false)} width="400px">
                <Typography sx={{ fontSize: "18px", fontWeight: "700", borderBottom: "1px solid black" }}>Подробная информация</Typography>

                {
                    votesOfCities?.map(i => (
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "black", marginTop: "10px" }}>
                            <p style={{ fontSize: "13px" }}>{cities.find((city) => city.slug === i.city_slug)?.name
                            }</p>
                            <Counter targetNumber={i?.percent} parametrs={"%"} />
                        </Box>
                    ))
                }

            </ModalWindow>
            <Box sx={{ background: "white", padding: "5px", borderRadius: "5px" }}>
                <ContainerTitle sx={{ background: "white", color: "var(--main)", padding: "10px" }}>
                    <p style={{ fontFamily: "gotham" }}>Статистика</p>
                    {/* <h2 style={{ fontWeight: "300", fontSize: "20px" }}>
                        {data?.infoCity?.name}
                        {
                            tabStatus === "city" ? data?.infoCity?.name : votesOfCities?.[0]?.name
                        }
                    </h2>
                    <div>
                        <SelectCustom setData={setData} setTab={setTab} data={data?.cities} tabStatus={tabStatus} title={"Выберите город"} />
                    </div> */}
                    
                </ContainerTitle>
                {/* <Desktop sx={{display: "flex", flexDirection: "column", gap: "2px", padding: "0 10px", height: "100%", width:"100%", overflowY: "scroll", maxHeight: "400px", overflowY: "scroll" , borderRadius:"5px" }}>
                    {
                        tabStatus === "region" ? (<>
                            {
                                votesOfCities?.map(i => (
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "white", marginTop: "10px" }}>
                                        <p style={{ fontSize: "13px" }}>{cities.find((city) => city.slug === i.city_slug)?.name
                                        }</p>
                                        <Counter targetNumber={i?.percent} parametrs={"%"} />
                                    </Box>
                                ))
                            }
                        </>) :
                            (<>
                                {
                                    data?.cities?.map(i => (
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "white", marginTop: "10px" }}>
                                            <p style={{ fontSize: "13px" }}>{i?.name} 12</p>
                                            <Counter targetNumber={i?.percent} parametrs={"%"} />
                                        </Box>
                                    ))
                                }
                            </>)
                    }
                </Desktop>
                <Mobile>
                {
                        tabStatus === "region" ? (<>
                            {
                                votesOfCities?.map(i => (
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "white", marginTop: "10px" }}>
                                        <p style={{ fontSize: "13px" }}>{cities.find((city) => city.slug === i.city_slug)?.name
                                        }</p>
                                        <Counter targetNumber={i?.percent} parametrs={"%"} />
                                    </Box>
                                ))
                            }
                        </>) :
                            (<>
                                {
                                    data?.cities?.map(i => (
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "white", marginTop: "10px" }}>
                                            <p style={{ fontSize: "13px" }}>{i?.name} 12</p>
                                            <Counter targetNumber={i?.percent} parametrs={"%"} />
                                        </Box>
                                    ))
                                }
                            </>)
                    }
                </Mobile> */}

                <NewDesktop>
                    {
                        tabStatus === "region" ? (<>
                            {
                                votesOfCities?.map(i => (
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "black", marginTop: "10px" }}>
                                        <p style={{ fontSize: "13px" }}>{cities.find((city) => city.slug === i.city_slug)?.name
                                        }</p>
                                        <Counter targetNumber={i?.percent} parametrs={"%"} />
                                    </Box>
                                ))
                            }
                        </>) :
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
                </NewDesktop>

                <NewMobile>
                    {
                        tabStatus === "region" ? (<>
                            {
                                votesOfCities?.map(i => (
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "black", marginTop: "10px" }}>
                                        <p style={{ fontSize: "13px" }}>{cities.find((city) => city.slug === i.city_slug)?.name
                                        }</p>
                                        <Counter targetNumber={i?.percent} parametrs={"%"} />
                                    </Box>
                                ))
                            }
                        </>) :
                            (<>
                                {
                                    data?.cities?.map(i => (
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "black", marginTop: "10px" }}>
                                            <p style={{ fontSize: "13px" }}>{i?.name} 12</p>
                                            <Counter targetNumber={i?.percent} parametrs={"%"} />
                                        </Box>
                                    ))
                                }
                            </>)
                    }
                </NewMobile>

                {
                    (data?.cities?.length && tabStatus === "city") ? <p onClick={() => handleOpenModal()} style={{ fontSize: "13px", textTransform: "uppercase", cursor: "pointer", marginTop: "30px" }}>Посмотреть подробнее...</p> : <></>
                }
                {
                    (data?.cities?.length && tabStatus === "region") ? <p onClick={() => setModalParty(true)} style={{ fontSize: "13px", textTransform: "uppercase", cursor: "pointer", marginTop: "30px" }}>Посмотреть подробнее...</p> : <></>
                }
            </Box>
        </>
    );
}

export default InfoBlog;

const NewDesktop = styled(Box)`

    @media screen and (max-width:767px ) {
        display:none;
    }
`


const NewMobile = styled(Box)`
    display: none;
    @media screen and (max-width:767px ) {
        display:block;
    }
`


// old
// const Mobile = styled(Box)`
//     display:none;
//  @media screen and (max-width:767px){
//         display:block;
//     }
// `

// const Desktop = styled(Box)`

//     @media screen and (max-width:767px){
//         display:none;
//     }
// `

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
