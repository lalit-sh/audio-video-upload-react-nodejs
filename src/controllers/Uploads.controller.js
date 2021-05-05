import UploadsModel from "../models/Uploads";
import storage from "../../multer";
import multer from "multer";

class ImageShareController {

    addData = async (req, res) => {
        try{

            //the api to use for uploading data
            
            let upload = multer({ storage: storage }).single('file');
            upload(req, res, async function(err) {
                if (req.fileValidationError) {
                    return res.send(req.fileValidationError);
                }
                else if (!req.file) {
                    return res.send('Please select an image to upload');
                }
                else if (err instanceof multer.MulterError) {
                    return res.send(err);
                }
                else if (err) {
                    return res.send(err);
                }

                let url = `uploads/${req.file.filename}`;
                let upload = UploadsModel({
                    filename: req.file.filename,
                    url: url,
                    createdBy: req.user._id,
                    status: "Submitted",
                    type: req.body.type
                });

                upload = await upload.save();
                return res.status(200).json(upload)
            });
        }catch(err){
            console.log("Error in addData at ImageShareController :", err);
            return res.status(400).json({
                error: err
            })
        }
    } 

    getData = async (req, res) => {

        //the api to be used for donwloading the data

        try{
            let user = req.user._id;
            let limit = req.query.limit || 100;
            let skip = req.query.skip || 0;
            let result = await UploadsModel.find({createdBy: user}).limit(parseInt(limit)).skip(parseInt(skip)).sort({"created_at": -1}).exec();
            return res.status(200).json(result)
        }catch(err){
            console.log("Error in getData at ImageShareController :", err);
            return res.status(400).json({
                error: err
            })
        }
    }

}

export default ImageShareController;