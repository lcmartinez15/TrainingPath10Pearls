import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AlertApp from "../general/Alert";
import LoginPage from "../../pages/LoginPage";
import DashboardPage from "../../pages/DashboardPage";
import DashBoardUser from "../../pages/DashBoardUser";
import Courses from "../../pages/Courses";
import Users from "../../pages/Users";
import Profile from "../../pages/Profile";
import CategoryPage from "../../pages/Category";
import Register from "../../components/users/Register";
import RegisterCourse from "../../components/courses/RegisterCourse";
import RegisCoursesUdemyterCourse from "../../components/udemyCourse/courses";
import RegisterCategory from "../../components/category/RegisterCategory";
import EditCategory from "../../components/category/EditCategory";
import ProfileUser from "../users/UserDetail";
import AvailableCourse from "../../components/trainingPath/AvailableCourse";
import LogProcess from "../logProcess/LogProcess";
import ResetPassword from "../auth/ResetPassword";
import ResetPasswordPage from "../../pages/ResetPasswordPage";

const Routes = () => {
  console.log("redireccion ");
  return (
    <section className="container">
      <AlertApp />
      <Switch>
        <PrivateRoute exact path="/dashboard" component={DashboardPage}  roles={["admin"]}/>
        <PrivateRoute exact path="/userdashboard" component={DashBoardUser}  roles={["dev"]}/>
        <PrivateRoute exact path="/courses" component={Courses} roles={["admin","dev"]}/>
        <PrivateRoute exact path="/users" component={Users} roles={["admin"]}/>
        <PrivateRoute exact path="/categories" component={CategoryPage} roles={["admin"]}/>
        <PrivateRoute exact path="/profile" component={Profile} roles={["admin", "dev"]}/>
        <PrivateRoute exact path="/registerUser" component={Register} roles={["admin"]}/>
        <PrivateRoute exact path="/addCourse" component={RegisterCourse} roles={["admin"]}/>
        <PrivateRoute exact path="/addCategory" component={RegisterCategory} roles={["admin"]}/>
        <PrivateRoute exact path="/editCategory/:idCategory" component={EditCategory} roles={["admin"]}/>
        <PrivateRoute
          exact
          path="/searchCourse"
          component={RegisCoursesUdemyterCourse} roles={["admin"]}
        />
        <PrivateRoute exact path="/viewUser/:idUser" component={ProfileUser} roles={["admin","dev"]}/>
        <PrivateRoute
          exact
          path="/availableCourse/:idUser"
          component={AvailableCourse} roles={["admin","dev"]}
        />
        <PrivateRoute
          exact
          path="/logProcess/:courseId"
          component={LogProcess} roles={["admin","dev"]}
        />

        {/* <PrivateRoute
          exact
          path="/reset/:id/:token"
          component={ResetPasswordPage} roles={["admin","dev"]}
          isReset= {true}
        /> */}
        {/* <Route component={NotFound} /> */}
      </Switch>
    </section>
  );
};

export default Routes;
