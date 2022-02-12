const { Op } = require("sequelize");
const Video = require("../models/video");

const getAllVideos = async(req,res) => {
    try{
        const videos = await Video.findAll();
        return res.status(200).json(videos);
    } catch(err) {
        return res.status(500).json({ message:"getAllVideos problem" })
    }
}

const getVideosByParentId = async(req,res) => {
    try{
        const idReq = req.params.id;

        const videos = await Video.findAll({
            where: {
                favListId: idReq
            }
        });

        if(videos)
            return res.status(200).json(videos);
        else 
            return res.status(404).json({ message: "not found" });
    } catch(err) {
        return res.status(500).json({ message:"getVideosByParentId problem" })
    }
}


const postVideo = async(req,res) => {
    try {
        const newVideo = await Video.create(req.body);
        return res.status(200).json(newVideo);
    } catch(err) {
        return res.status(500).json({ message:"getAllVideos problem" })
    }
}

const deleteVideo = async(req,res) => {
    try{
        const idReq = req.params.id;
        const video = await Video.findByPk(req.params.id);
        console.log(video);
        
        if(video) {
            console.log('test');
            await video.destroy();
            return res.status(200).json({ message: "deleted"});
        }
        else {
            console.log('else');
            return res.status(404).json({ message: "not found" });
        }
        
    }catch(err){
        return res.status(500).json({message:"deleteVideo problem"});
    }
}

const putVideo = async(req,res) => {
    try{
        const idReq = req.params.id;
        const video = await Video.findByPk(req.params.id);
        console.log(video);
        if(video) {
            console.log('aici');
            await video.update(req.body, { fields: ['description', 'title', 'url', 'favListId'] })
            return res.status(200).json(video);
        }
        else {
            return res.status(404).json({ message: "not found" });
        }
    }catch(err){
        return res.status(500).json({message:"putVideo problem"});
    }
}


module.exports = { 
    getAllVideos,
    postVideo,
    deleteVideo,
    putVideo,
    getVideosByParentId
};