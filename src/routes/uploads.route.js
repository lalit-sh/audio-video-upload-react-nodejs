import Controller from "../controllers/Uploads.controller";

module.exports = app => {
    let Uploads = new Controller();
    
    app.route(`${process.env.API_BASE}uploads`).post((req, res) => Uploads.addData(req, res));
    app.route(`${process.env.API_BASE}uploads`).get((req, res) => Uploads.getData(req, res));
    app.route(`${process.env.API_BASE}get_recordings`).get((req, res) => Uploads.getRecordingsData(req, res));
    app.route(`${process.env.API_BASE}uploads`).patch((req, res) => Uploads.updateData(req, res));
}