import {Button} from "@mui/material";
import {TextField, Typography} from "@mui/material";
import {useState} from "react";
import MyAuth from "../lib/auth";
import Router from "next/router";
import Head from 'next/head'

export default function LoginPage(props: any) {
    const spacingStyle = {margin: 10}
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const {user, isLoaded, loginWithEmail} = MyAuth();
    if (
        isLoaded === false ||
        isLoaded && user
    ) {
        if (user) {
            Router.replace("/vrms").then();
        }
        return <div>
            <Head>
                <title>VRm: Login Page</title>
                <meta name={"description"} content={"Login Page for VRm"}/>
                <link rel={"icon"} href={"/favicon.ico"} />
            </Head>
        </div>
    }
    else if (user) {
        return <></>
    }
    return (
        <div style={{maxWidth: 500, margin: "0 auto"}}>
            <Head>
                <title>VRm: Login Page</title>
                <meta name={"description"} content={"Login Page for VRm"}/>
                <link rel={"icon"} href={"/favicon.ico"} />
            </Head>
            {message &&
                <Typography variant={"subtitle2"} style={{color: "red"}}> {message} </Typography>
            }
            <div style={spacingStyle}>
                <TextField
                    style={{width: "100%"}}
                    onChange={(event) => {
                        setEmail(event.target.value);
                        setMessage("");
                    }}
                    label="Email"
                    variant="filled" />
            </div>
            <div style={spacingStyle}>
                <TextField
                    onChange={(event) => {
                        setPassword(event.target.value)
                        setMessage("");
                    }}
                    style={{width: "100%"}}
                    label="Password"
                    type="password"
                    variant="filled" />
            </div>
            <div style={spacingStyle}>
                <Button
                    style={{width: "100%"}}
                    variant="contained"
                    onClick={async () => {
                        await loginWithEmail(email, password);
                    }}>Login</Button>
            </div>
        </div>
    )
}