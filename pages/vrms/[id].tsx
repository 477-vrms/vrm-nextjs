import Router from "next/router";
import MyAuth from "../../lib/auth";
import Head from "next/head";
import { useRouter } from 'next/router'
import {getDatabase, onValue, ref} from "firebase/database";
import {useEffect, useState} from "react";
import {Card, CardContent, Chip, Typography} from "@mui/material";
import Image from "next/image";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function VrmArmDetail() {
    const [joints, setJoints] = useState<any>(undefined);
    const [wsData, setWsData] = useState<any>(null);
    const [connected, setConnected] = useState<boolean>(false);

    const {user, isLoaded } = MyAuth();
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        const database = getDatabase();
        const fbDatabaseRef = ref(database, 'joints/' + id);
        onValue(fbDatabaseRef, (snapshot => {
            const data = snapshot.val();
            setJoints(data);
        }));
    }, [id])

    useEffect(() => {
        if (user) {
            user.getIdToken().then((token: string) => {
                const ws = new WebSocket("wss://ecess-api.matthewwen.com/vrms/debug", [token]);
                ws.onmessage = (ev => {
                    setConnected(true);
                    const data = JSON.parse(ev.data);
                    if (data.removed) {
                        setConnected(false);
                    }
                    setWsData(data);
                });
                ws.onclose = ev => {
                    setConnected(false);
                }
            })
        }

    }, [user])

    if (
        isLoaded === false ||
        isLoaded && !user
    ) {
        if (isLoaded) {
            Router.replace("/login").then();
        }
        return <div>
            <Head>
                <title>VRm: Arm {id}</title>
                <meta name={"description"} content={"Arm Data for " + id}/>
            </Head>
        </div>
    }
    return (
        <div>
            <Head>
                <title>VRm: Arm {id}</title>
                <meta name={"description"} content={"Arm Data for " + id}/>
            </Head>
            <div style={{marginTop: 10}}>
                {joints === null &&
                    <Typography style={{textAlign: "center"}}>Sorry, Arm is Not Found</Typography>
                }
                {joints &&
                    (
                        <Card style={{margin: 5}}>
                            <CardContent>
                                <Image src={"/joint-position.jpg"} alt={"description of Joint Data"} height={"200"} width={"600"}/>
                                <Typography variant={"h6"}>Joint Positions</Typography>
                                <p>Joint 1: {joints?.J1 || 0}</p>
                                <p>Joint 2: {joints?.J2 || 0}</p>
                                <p>Joint 3: {joints?.J3 || 0}</p>
                                <p>Joint 4: {joints?.J4 || 0}</p>
                                <p>Joint 5: {joints?.J5 || 0}</p>
                                <p>Joint 6: {joints?.J6 || 0}</p>
                                <p>Joint 7: {joints?.J7 || 0}</p>
                                <p>Joint 8: {joints?.J8 || 0}</p>
                            </CardContent>
                        </Card>
                    )
                }
                {
                    !connected &&
                    <Card style={{margin: 5}}>
                        <CardContent>
                            <Typography style={{color: "red", textAlign: "center"}}>You are Not Connected</Typography>
                        </CardContent>
                    </Card>

                }
                {wsData &&
                    <Card style={{margin: 5}}>
                        <CardContent>
                            <div style={{margin: 10}}>
                                <Typography>Moving Joints Pipeline</Typography>
                                <Chip
                                    style={{backgroundColor: wsData?.vrZeroMqConnected ? "green": "red"}}
                                    label={"VR Headset Connected"}/>
                            </div>

                            <div style={{margin: 10}}>
                                <Typography>Video Streaming Pipeline</Typography>
                                <div style={{display: "flex"}}>
                                    <Chip
                                        style={{backgroundColor: wsData?.vrUdpConnected ? "green": "red"}}
                                        label={"VR Headset Streaming Video"}/>
                                    <div style={{display: "grid", placeItems: "center"}}>
                                        <ArrowForwardIcon sx={{fontSize: 20}}/>
                                    </div>
                                    <Chip
                                        style={{backgroundColor: (wsData?.vrUdpConnected && wsData?.piUdpConnected)  ? "green": "red"}}
                                        label={"Pi Video Streaming Video"}/>
                                    <div style={{display: "grid", placeItems: "center"}}>
                                        <ArrowForwardIcon sx={{fontSize: 20}}/>
                                    </div>
                                    <Chip
                                        style={{backgroundColor: (
                                            wsData?.vrUdpConnected && wsData?.piUdpConnected &&
                                                wsData?.isStreaming
                                            ) ? "green": "red"}}
                                        label={"Streaming Video"} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                }
            </div>
        </div>
    )
}