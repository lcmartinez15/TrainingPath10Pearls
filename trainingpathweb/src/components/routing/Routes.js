import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AlertApp from "../general/Alert";
import LoginPage from "../../pages/LoginPage";
import DashboardPage from "../../pages/DashboardPage";
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

const Routes = () => {
  console.log("redireccion ");
  return (
    <section className="container">
      <AlertApp />
      <Switch>
        <PrivateRoute exact path="/dashboard" component={DashboardPage} />
        <PrivateRoute exact path="/courses" component={Courses} />
        <PrivateRoute exact path="/users" component={Users} />
        <PrivateRoute exact path="/categories" component={CategoryPage} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/registerUser" component={Register} />
        <PrivateRoute exact path="/addCourse" component={RegisterCourse} />
        <PrivateRoute exact path="/addCategory" component={RegisterCategory} />
        <PrivateRoute
          exact
          path="/editCategory/:idCategory"
          component={EditCategory}
        />
        <PrivateRoute
          exact
          path="/searchCourse"
          component={RegisCoursesUdemyterCourse}
        />
        <PrivateRoute exact path="/viewUser/:idUser" component={ProfileUser} />
        <PrivateRoute
          exact
          path="/availableCourse/:idUser"
          component={AvailableCourse}
        />
        <PrivateRoute
          exact
          path="/logProcess/:courseId"
          component={LogProcess}
        />

        {/* <Route component={NotFound} /> */}
      </Switch>
    </section>
  );
};

export default Routes;
