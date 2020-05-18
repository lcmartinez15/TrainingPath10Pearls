const { createContainer, asClass, asValue, asFunction } = require("awilix");

//config
const config = require("../config");
const app = require(".");

//services
const { HomeService, UserService, AuthService } = require("../services");

//controllers
const {
    HomeController,
    UserController,
    AuthController,
} = require("../controllers");

//routes
const {
    HomeRoutes,
    UserRoutes,
    AuthRoutes,
} = require("../routes/index.routes");
const Routes = require("../routes");

//models
const { User } = require("../models");

//repository
const { UserRepository } = require("../repositories");

const container = createContainer();

//register
container
    .register({
        app: asClass(app).singleton(),
        router: asFunction(Routes).singleton(),
        config: asValue(config),
    })
    .register({
        HomeService: asClass(HomeService).singleton(),
        UserService: asClass(UserService).singleton(),
        AuthService: asClass(AuthService).singleton(),
    })
    .register({
        HomeController: asClass(HomeController.bind(HomeController)).singleton(),
        UserController: asClass(UserController.bind(UserController)).singleton(),
        AuthController: asClass(AuthController.bind(AuthController)).singleton(),
    })
    .register({
        HomeRoutes: asFunction(HomeRoutes).singleton(),
        UserRoutes: asFunction(UserRoutes).singleton(),
        AuthRoutes: asFunction(AuthRoutes).singleton(),
    })
    .register({
        User: asValue(User),
    })
    .register({
        UserRepository: asClass(UserRepository).singleton(),
    });

module.exports = container;