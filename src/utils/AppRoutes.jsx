import React from "react";
import Home from "../Components/Home/Home";
import MovieDetails from "../Components/MoviesDetails/MoviesDetails";
import Navbar from "../Components/Navbar/Navbar";

const AppRoutes = [
  {
    path: "/",
    element: <><Navbar/><Home /></>,
  },
  {
    path: "/MovieDetails/:id",
    element: <><Navbar/><MovieDetails/></>,
  },
  
];

export default AppRoutes;
