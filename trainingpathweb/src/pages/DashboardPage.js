import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

const DashboardPage = () => {
  return (
    <Fragment>
      <Navbar />
      <h1> DashboardPage </h1>
    </Fragment>
  );
};

export default DashboardPage;
