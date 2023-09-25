import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../Auth";

export default function PrivateRoute() {
  return (
    <>
      {isLoggedIn() ? <Outlet /> : <Navigate to={"/login"} />}
    </>
  );
}
