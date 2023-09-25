import React  from "react";
import { Navigate, Outlet} from "react-router-dom";
import { isLoggedIn } from "../Auth";

export default function PrivateRoute() {
  return (
    <>
      {isLoggedIn() ? <Navigate to={"/user/dashboard"}/> : <Outlet /> }
    </>
  );
}
