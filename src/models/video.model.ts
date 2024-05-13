import mongoose, { Schema, Model, Document } from 'mongoose';

interface IVideo {
    title: String;
    url: String;
    html: String;
    thumbnail_url: String;
    provider_name: String;
    author_name: String;
}

const videoSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title can not be empty"]
        },

        url: {
            type: String,
            required: [true, "Video url can not be empty"]
        },

        html: {
            type: String,
            require: true
        },

        thumbnail_url: {
            type: String,
            required: [true, "Thumbnail can not be empty"]
        },

        provider_name: {
            type: String,
            require: true
        },

        author_name: {
            type: String,
            require: true
        }
    }
);

const Video = mongoose.model('Video', videoSchema);

const build = (attr: IVideo) => {
    return new Video(attr);
}
export {Video, IVideo, build};

// const mongoose = require('mongoose');

// const VideoSchema = mongoose.Schema({
//     title: {
//         type: String,
//         required:[true, "Title can not be empty"]
//     },

//     url:{
//         type: String,
//         require:true
//     },

//     html:{
//         type: String,
//         require: true
//     },

//     thumbnail_url: {
//         type: String,
//         require: true
//     },

//     provider_name: {
//         type: String,
//         require: true
//     },

//     author_name: {
//         type: String,
//         require: true
//     }
// });

// const Video = mongoose.model("Video", VideoSchema);
// module.exports = Video;