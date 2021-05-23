import Controller from "../controllers/User.controller";
const passport = require('passport');

module.exports = app => {
    let controller = new Controller();
    
    app.route(`${process.env.API_BASE}getUserDetails`).get((req, res) => controller.getUserDetails(req, res))
    app.route(`/login`).post((req, res) => controller.login(req, res))
    app.route("/signup").post((req, res) => controller.signup(req, res));
    app.route("/logout").get((req, res) => controller.logout(req, res));
}