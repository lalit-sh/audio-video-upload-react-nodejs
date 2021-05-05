import Controller from "../controllers/Uploads.controller";

module.exports = app => {
    let Uploads = new Controller();
    
    app.route(`${process.env.API_BASE}uploads`).post((req, res) => Uploads.addData(req, res));
    app.route(`${process.env.API_BASE}uploads`).get((req, res) => Uploads.getData(req, res));
}