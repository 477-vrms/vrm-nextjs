import Router from "next/router";
import MyAuth from "../../lib/auth";
import Head from "next/head";
import { useRouter } from 'next/router'

export default function VrmArmDetail() {
    const {user, isLoaded } = MyAuth();
    const router = useRouter()
    const { id } = router.query
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
            <div>Arm Detail to Look into</div>
        </div>
    )
}