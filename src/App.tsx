import { useEffect } from "react";
import { useAuth } from "./hooks/auth";
import { useTheme } from "./hooks/theme";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./themes/lightTheme";
import { darkTheme } from "./themes/darkTheme";
import { MainRoutes } from "./routes";

const App = () => {
    const {handleAutenticateUser} = useAuth()
    const {handleInitTheme, theme} = useTheme()

    useEffect(() => {
        // Authenticate user using token saved in local storege
         handleAutenticateUser()

        // Appli theme saved by user to local storage
        handleInitTheme()

    }, []) 

    return (
        <ThemeProvider theme ={theme == 'light' ? lightTheme: darkTheme}>
            <MainRoutes/>
        </ThemeProvider>
    )
}

export default App;