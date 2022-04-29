import {
    browserLocalPersistence, getAuth,
    signInWithEmailAndPassword, User,
    UserCredential
} from "firebase/auth";
import {createContext, useContext, useEffect, useState} from "react";
import "../src/config/firebase.config";

const UserProvider = createContext<any>({
    user: null,
    error: null,
    isLoaded: false,
    loginWithEmail: async () => {},
    logout: async () => {}
});

export default function MyAuth() {
    return useContext(UserProvider);
}

export function AuthProvider(props: any) {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | any>("");
    const [isLoaded, setIsLoaded] = useState(false);

    const loginWithEmail = async (username: string, password: string) => {
        const auth = getAuth();
        await auth.setPersistence(browserLocalPersistence);
        try {
            const user: UserCredential = await signInWithEmailAndPassword(auth, username, password);
            setUser(user.user);
        }
        catch (e) {
            setError(e);
        }
        setIsLoaded(true);
    }

    const logout = async () => {
        const auth = getAuth();
        await auth.signOut();
        setUser(null);
        setError( null)
        setIsLoaded(true);
    }

    const value = {user, error, isLoaded, loginWithEmail, logout};

    useEffect(() => {
        const auth = getAuth();
        auth.onAuthStateChanged((user) => {
            console.log("ran on auth state changed");
            setUser(user);
            setIsLoaded(true);
        });
    }, [])

    return (
        <UserProvider.Provider value={value} {...props}/>
    )

}
export {UserProvider};
