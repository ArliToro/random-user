import './App.css'
import React from "react";
import {Route, Routes, NavLink} from "react-router-dom";
import FirstPage from "./pages/firstPage/firstPage.tsx";
import SecondPage from "./pages/secondPage/secondPage.tsx";
import {AppBar, Box, Toolbar} from "@mui/material";

const App: React.FC = () => {

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" className="navbar">
                    <Toolbar>
                        <NavLink to='/' >First Page</NavLink>
                        <NavLink to='/secondPage' >Second Page</NavLink>
                    </Toolbar>
                </AppBar>
            </Box>
            <Routes>
                <Route path='/' element={<FirstPage/>} />
                <Route path='/secondPage' element={<SecondPage/>} />
            </Routes>
        </>
    )
}

export default App;
