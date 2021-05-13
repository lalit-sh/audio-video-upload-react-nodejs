import mongoose, { Schema } from "mongoose";


const schema = new Schema({
    filename: {
        type: String,
        required: [true, "user name is required"]
    },
    url: {
        type: String,
        required: [true, "tripname required"]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String
    },
    type: {
        type: String
    }
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

const Images = mongoose.model("uploads", schema);
export default Images;