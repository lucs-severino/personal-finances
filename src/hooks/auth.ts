import type { User } from "../@types/Auth"
import { useAppDispatch } from "../redux/hooks"
import { setAuthStatus, setAuthToken, setUser } from "../redux/slices/authSlice"
import { getUser, signIn, signUp } from "../services/request"

const LOCAL_STOREGE_KEY = import.meta.env.VITE_LOCAL_STOREGE_AUTH_KEY

export const userAuth = () => {
    const  dispatch = useAppDispatch()

    // Function to authenticate the user
    const authenticate = (user: User, authToken: string) => {
        dispatch(setUser(user))
        dispatch(setAuthToken(authToken))
        dispatch(setAuthStatus('autenticated'))

        localStorage.setItem(LOCAL_STOREGE_KEY, authToken)
    }

    //Get token from local storege
    const handleGetToken = () => localStorage.getItem(LOCAL_STOREGE_KEY)

    // Get the user using authToken saved in Local storage
    const handleAutenticateUser = async () => {
        const request = await getUser()
        const authToken = handleGetToken()

        if(!request.data || !authToken ) {
            dispatch(setAuthStatus('not_autenticated'))
            return
        }

        const { data } = request;
        authenticate(data.user, authToken)
    }

    // Function to signIn
    const handleSignIn = async ({email, password}: { email: string, password: string }) => {
        const request = await signIn(email, password)

        if(request.data){
            const { data } = request;

            authenticate(data.user, data.authToken);
            return true;
        }

        dispatch(setAuthStatus('not_autenticated'))
        return request.error
    }

    // Function to signUp
    const handleSignUp = async ({name , email, password}: {name: string, email: string, password: string }) => {
        const request = await signUp(name, email, password)

        if(request.data){
            const { data } = request;

            authenticate(data.user, data.authToken);
            return true;
        }

        dispatch(setAuthStatus('not_autenticated'))
        return request.error
    }

    // Function to signOut
    const handleSingOUt = () => {
        dispatch(setUser(null))
        dispatch(setAuthToken(null))
        dispatch(setAuthStatus('not_autenticated'))

        localStorage.removeItem(LOCAL_STOREGE_KEY)
    }

    return {
        handleGetToken,
        handleAutenticateUser,
        handleSignIn,
        handleSignUp,
        handleSingOUt
    }
}