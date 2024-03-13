import React from "react";
import { useNavigate } from "react-router-dom";
import Topartists from "./topArtists";
import { useSelector } from "react-redux";

const TopArtistsWrapper = (props) => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  return <Topartists {...props} navigate={navigate} />;
};

export default TopArtistsWrapper;
