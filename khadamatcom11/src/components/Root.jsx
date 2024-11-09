import { Outlet } from "react-router-dom";
import React from "react";
export default function LayOut(){
    return(
        <>
        <h1> LayOut</h1>
        <Outlet/>
        </>
    );
}