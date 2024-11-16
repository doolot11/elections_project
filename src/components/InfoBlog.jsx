import { Box, Modal, Skeleton, Typography } from "@mui/material";
import Counter from "../ui/CounterAnimate";
import { useEffect, useState } from "react";
import { fetchData } from "../services/requests";
import styled from "@emotion/styled";
import SelectCustom from "../ui/SelectCustom";
import ModalWindow from "../ui/ModalWindow";
import cities from "../data/cities.json"
import { ReactComponent as MoreIcon } from "../images/svg/more.svg"


function InfoBlog({ loadingCities, data, votesOfCities, tabStatus, setData, setTab, statisticParam, detailInfo }) {

    const [modal, setModal] = useState(false)
    const [modalParty, setModalParty] = useState(false)

    const handleOpenModal = () => setModal(true)
    const handleCloseModal = () => setModal(false)

    console.log("detailInfo in modal",);

    
    return (
        <>
            <ModalWindow open={modal} handleClose={handleCloseModal} width="450px">
                <Typography sx={{ fontSize: "18px", fontWeight: "400" }}>Подробная информация</Typography>
                <Box sx={{borderTop: "1px solid black",borderBottom:"1px solid black",padding:"5px 0",display:"flex",flexDirection:"column",gap:"8px" }}>
                    <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:"15px",width:"100%"}}>
                        <p style={{ fontSize: "13px",width:"80%" }}>Число избирателей включенных в список избирателей на избирательном участке</p>
                        <p style={{ fontSize: "13px",width:"" }}>{detailInfo?.three}</p>
                    </Box>
                    <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:"15px",width:"100%"}}>
                        <p style={{ fontSize: "13px",width:"80%" }}>Общее число избирателей получивших избирательных бюллетеней</p>
                        <p style={{ fontSize: "13px",width:"" }}>{detailInfo?.five}</p>
                    </Box>
                    <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:"15px",width:"100%"}}>
                        <p style={{ fontSize: "13px",width:"80%" }}>Число действительных избирательных бюллетеней</p>
                        <p style={{ fontSize: "13px",width:"" }}>{detailInfo?.seven}</p>
                    </Box>
                    <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:"15px",width:"100%"}}>
                        <p style={{ fontSize: "13px",width:"80%" }}>Число недействительных избирательных бюллетеней</p>
                        <p style={{ fontSize: "13px",width:"" }}>{detailInfo?.eight}</p>
                    </Box>
                </Box>
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
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "black", marginTop: "10px", gap: "15px" }}>
                                        <p style={{ fontSize: "13px" }}>{i?.name}</p>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                            <Counter targetNumber={i?.percent} parametrs={"%"} />
                                            <p style={{ fontSize: "13px", color: "var(--green)" }}>{`(${i?.count})`}</p>
                                        </Box>
                                    </Box>
                                ))
                            }
                        </>)
                }
            </ModalWindow>
            <ModalWindow open={modalParty} handleClose={() => setModalParty(false)} width="450px">
                <Typography sx={{ fontSize: "18px", fontWeight: "400", borderBottom: "1px solid black" }}>Подробная информация</Typography>
                {
                    votesOfCities?.map(i => (
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "black", marginTop: "10px", gap: "15px" }}>
                            <p style={{ fontSize: "13px" }}>{cities.find((city) => city.slug === i.city_slug)?.name}</p>
                            <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <Counter targetNumber={i?.percent} parametrs={"%"} />
                                <p style={{ fontSize: "13px", color: "var(--green)" }}>{`(${i?.count})`}</p>
                            </Box>
                        </Box>
                    ))
                }

            </ModalWindow>
            <Adaptive sx={{ background: "white", padding: "5px", borderRadius: "5px" }}>
                <ContainerTitle sx={{ background: "white", color: "var(--main)", padding: "10px" }}>
                    <p>Статистика  {statisticParam ? `- ${statisticParam}` : ""}</p>
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
                <Box sx={{ padding: "0 7px" }}>
                    {loadingCities &&
                        <>
                            {[...Array(10)].map((_, index) => (
                                <Box key={"city" + index + "c"} sx={{
                                    display: "flex", justifyContent: "space-between",
                                    margin: "15px 0"
                                }}>
                                    <Skeleton variant="rectangular" sx={{ width: "100%", height: "10px" }}>

                                    </Skeleton>
                                </Box>
                            ))}
                        </>
                    }
                </Box>
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
                                votesOfCities?.slice(0, 10).map(i => (
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "black", marginTop: "10px", gap: "15px" }}>
                                        <p style={{ fontSize: "13px" }}>{cities.find((city) => city.slug === i.city_slug)?.name
                                        }</p>
                                        <Counter targetNumber={i?.percent} parametrs={"%"} />
                                    </Box>
                                ))
                            }
                        </>) :
                            (<>
                                {
                                    data?.cities?.slice(0, 10).map(i => (
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "black", marginTop: "10px", gap: "15px" }}>
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
                                votesOfCities?.slice(0, 10).map(i => (
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "black", marginTop: "10px", gap: "15px" }}>
                                        <p style={{ fontSize: "13px" }}>{cities.find((city) => city.slug === i.city_slug)?.name
                                        }</p>
                                        <Counter targetNumber={i?.percent} parametrs={"%"} />
                                    </Box>
                                ))
                            }
                        </>) :
                            (<>
                                {
                                    data?.cities?.slice(0, 10).map(i => (
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "black", marginTop: "10px", gap: "15px" }}>
                                            <p style={{ fontSize: "13px" }}>{i?.name} 12</p>
                                            <Counter targetNumber={i?.percent} parametrs={"%"} />
                                        </Box>
                                    ))
                                }
                            </>)
                    }
                </NewMobile>

                {
                    (data?.cities?.length && tabStatus === "city") ?
                        <More>
                            <MoreIcon />
                            <p onClick={() => handleOpenModal()} style={{ fontSize: "13.5px", textTransform: "", cursor: "pointer" }}>Посмотреть подробнее...</p>
                        </More> : <></>
                }
                {

                    (data?.cities?.length && tabStatus === "region") ?
                        <More>
                            <MoreIcon />
                            <p onClick={() => setModalParty(true)} style={{ fontSize: "13.5px", textTransform: "", cursor: "pointer" }}>Посмотреть подробнее...</p>
                        </More> : <></>
                }
            </Adaptive>
        </>
    );
}

export default InfoBlog;

const Adaptive = styled(Box)`
    @media screen and (max-width:767px) {
    margin-top:20px;
  }
`

const More = styled('div')`
    margin-top:30px;
    display:flex;
    align-items:center;
    gap:5px;

    & svg {
        width:20px;
        height:20px;
    }

    &:hover {
        & p {
            color:var(--main)
        }
    }
`

const NewDesktop = styled(Box)`
    padding: 0 5px;
    div:first-child{
        border-bottom: 1px solid black;
        padding-bottom:3px;
    }


    @media screen and (max-width:767px ) {
        display:none;
    }
`


const NewMobile = styled(Box)`
    padding: 0 5px;
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
