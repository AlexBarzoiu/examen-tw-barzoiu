const express = require('express')
const router = express.Router()

const { 
    getAllVideos,
    postVideo,
    deleteVideo,
    putVideo,
    getVideosByParentId
} = require('../controller/video')

const { 
    getAllFavouriteLists,
    postFavouriteList,
    deleteFavouriteList,
    putFavouriteList,
    searchFavList,
    getFavListById
} = require('../controller/favourite_list')

// route pentru favourite_list
router.get('/getAllFavouriteLists' , getAllFavouriteLists);
router.post('/postFavouriteList' , postFavouriteList);
router.delete('/deleteFavouriteList/:id' , deleteFavouriteList);
router.put('/putFavouriteList/:id' , putFavouriteList);
router.get('/searchFavList' , searchFavList);
router.get('/getFavListById/:id' , getFavListById);

// route pentru video
router.get('/getAllVideos' , getAllVideos);
router.post('/postVideo' , postVideo);
router.delete('/deleteVideo/:id' , deleteVideo);
router.put('/putVideo/:id' , putVideo);
router.get('/getVideosByParentId/:id' , getVideosByParentId);

// default path
router.get('/', (req, res) => {
    res.status(200).send('its working!!')
})

module.exports = router;
