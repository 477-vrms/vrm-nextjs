import type { NextPage } from 'next'
import Head from 'next/head'
import {app} from "../src/config/firebase.config"
import MyAuth from "../lib/auth";
import Router from "next/router";

export default function Home() {
    const {user, isLoaded} = MyAuth();
    if (isLoaded) {
        if (user) {
            Router.replace("/vrms").then();
        }
        else {
            Router.replace("/login").then();
        }
    }
    return (
        <div>
            <Head>
                <title>ECE 477 Team 2 Vrm</title>
                <meta name="description" content="Senior Design Website for Vrm" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
        </div>
    )
}
