import MyAuth from "../../lib/auth";
import Router from "next/router";
import Head from "next/head";
import Image from "next/image";
import {Card, CardActionArea, CardContent, Typography} from "@mui/material";

export default function VrmsLandingPage() {
    const {user, isLoaded} = MyAuth();
    const items = ["person"]
    if (
        isLoaded === false ||
        isLoaded && !user
    ) {
        if (isLoaded) {
            Router.replace("/login").then();
        }
        return (
            <div>
                <Head>
                    <title>VRm: Dashboard</title>
                    <meta name={"description"} content={"Dashboard to View All Visible Arms"}/>
                </Head>
            </div>
        )
    }
    return (
        <div>
            <Head>
                <title>VRm: Dashboard</title>
                <meta name={"description"} content={"Dashboard to View All Visible Arms"}/>
            </Head>
            <div style={{marginTop: 20}}>
                {items.map((item) => (
                    <Card key={item}>
                        <CardActionArea
                            onClick={async () => {
                                await Router.push("/vrms/" + item);
                            }}
                        >
                            <CardContent style={{display: "flex", flexWrap: "wrap"}}>
                                <Image src={"/arm.jpg"} height={100} width={100} alt={"Picture of Arm"}/>
                                <div style={{marginLeft: 10}}>
                                    <Typography>Arm: {item}</Typography>
                                </div>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </div>
        </div>
    )
}