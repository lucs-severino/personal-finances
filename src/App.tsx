import { useEffect } from "react";
import { userAuth } from "./hooks/auth";
import { useTheme } from "./hooks/theme";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./themes/lightTheme";
import { darkTheme } from "./themes/darkTheme";

const App = () => {
    const {handleAutenticateUser} = userAuth()
    const {handleInitTheme, theme} = useTheme()

    useEffect(() => {
        // Authenticate user using token saved in local storege
         handleAutenticateUser()

        // Appli theme saved by user to local storage
        handleInitTheme()

    }, []) 

    return (
        <ThemeProvider theme ={theme == 'light' ? lightTheme: darkTheme}>
            Meu texto teste
        </ThemeProvider>
    )
}

export default App;