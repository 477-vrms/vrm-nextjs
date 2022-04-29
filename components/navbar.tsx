import Router from "next/router";
import {Button, Typography} from "@mui/material";
import Link from "next/link";
import React from "react";
import MyAuth from "../lib/auth";

export default function Navbar() {
    const {user, isLoaded, logout} = MyAuth();
    return (
        <div style={{
            zIndex: 100,
            position: "sticky",
            display: "flex",
            overflow: "hidden",
            top: 0,
            height: 50,
            backgroundColor: "#222",
            padding: "2px 20px",
            width: "100%"}}>
            <div style={{marginTop: "auto", marginBottom: "auto", flex: 1}}>
                <Link href={"/"} passHref>
                    <Typography>
                        VRms
                    </Typography>
                </Link>
            </div>
            {isLoaded &&
                (user ?
                        <Button
                            onClick={async () => {
                                await logout();
                            }}
                            style={{backgroundColor: "#651"}}>
                            Logout
                        </Button>:
                        <Button
                            style={{backgroundColor: "#651"}}
                            onClick={() => {
                                Router.replace("/login").then();
                            }}
                        >
                            Login
                        </Button>
                )
            }
        </div>
    )

}