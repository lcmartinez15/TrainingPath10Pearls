const { createContainer, asClass, asValue, asFunction } = require("awilix");

//config
const config = require("../config");
const app = require(".");

//services
const {
    HomeService,
    UserService,
    AuthService,
    CourseService,
    CategoryService,
    ChapterService,
} = require("../services");

//controllers
const {
    HomeController,
    UserController,
    AuthController,
    CourseController,
    CategoryController,
} = require("../controllers");

//routes
const {
    HomeRoutes,
    UserRoutes,
    AuthRoutes,
    CourseRoutes,
    CategoryRoutes,
} = require("../routes/index.routes");
const Routes = require("../routes");

//models
const {
    User,
    Category,
    Course,
    Logprocess,
    UserTrainingPath,
    Chapter,
} = require("../models");

//repository
const {
    UserRepository,
    CategoryRepository,
    CourseRepository,
    ChapterRepository,
    LogProcessRepository,
    UserTrainigPathRepository,
} = require("../repositories");

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
        CourseService: asClass(CourseService).singleton(),
        CategoryService: asClass(CategoryService).singleton(),
        ChapterService: asClass(ChapterService).singleton(),
    })
    .register({
        HomeController: asClass(HomeController.bind(HomeController)).singleton(),
        UserController: asClass(UserController.bind(UserController)).singleton(),
        AuthController: asClass(AuthController.bind(AuthController)).singleton(),
        CourseController: asClass(
            CourseController.bind(CourseController)
        ).singleton(),
        CategoryController: asClass(
            CategoryController.bind(CategoryController)
        ).singleton(),
    })
    .register({
        HomeRoutes: asFunction(HomeRoutes).singleton(),
        UserRoutes: asFunction(UserRoutes).singleton(),
        AuthRoutes: asFunction(AuthRoutes).singleton(),
        CourseRoutes: asFunction(CourseRoutes).singleton(),
        CategoryRoutes: asFunction(CategoryRoutes).singleton(),
    })
    .register({
        User: asValue(User),
        Category: asValue(Category),
        Course: asValue(Course),
        Chapter: asValue(Chapter),
        Logprocess: asValue(Logprocess),
        UserTrainingPath: asValue(UserTrainingPath),
    })
    .register({
        UserRepository: asClass(UserRepository).singleton(),
        CategoryRepository: asClass(CategoryRepository).singleton(),
        CourseRepository: asClass(CourseRepository).singleton(),
        ChapterRepository: asClass(ChapterRepository).singleton(),
        LogProcessRepository: asClass(LogProcessRepository).singleton(),
        UserTrainigPathRepository: asClass(UserTrainigPathRepository).singleton(),
    });

module.exports = container;