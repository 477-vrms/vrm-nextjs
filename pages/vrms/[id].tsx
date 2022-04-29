import Router from "next/router";
import MyAuth from "../../lib/auth";
import Head from "next/head";
import { useRouter } from 'next/router'
import {getDatabase, onValue, ref} from "firebase/database";
import {useEffect, useState} from "react";
import {Card, CardContent, Typography} from "@mui/material";
import Image from "next/image";


export default function VrmArmDetail() {
    const [joints, setJoints] = useState<any>(undefined);
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
                        <Card>
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
            </div>
        </div>
    )
}