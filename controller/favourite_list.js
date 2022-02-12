const { Op } = require("sequelize");
const FavouriteList = require("../models/favourite_list");

const getAllFavouriteLists = async(req,res) => {
    try{
        const favouriteLists = await FavouriteList.findAll();
        return res.status(200).json(favouriteLists);
    } catch(err) {
        return res.status(500).json({ message:"getAllFavouriteLists problem" })
    }
}

const getFavListById = async(req,res) => {
    try{
        const idReq = req.params.id;
        const favList = await FavouriteList.findByPk(req.params.id);
        if(favList)
            return res.status(200).json(favList);
        else 
            return res.status(404).json({ message: "not found" });
    }catch(err){
        return res.status(500).json({message:"getFavListById problem"});
    }
}

const postFavouriteList = async(req,res) => {
    try {
        const newFavouriteList = await FavouriteList.create(req.body);
        return res.status(200).json(newFavouriteList);
    } catch(err) {
        return res.status(500).json({ message:"postFavouriteList problem" })
    }
}

const deleteFavouriteList = async(req,res) => {
    try{
        const idReq = req.params.id;
        const favList = await FavouriteList.findByPk(req.params.id);
        console.log(favList);
        
        if(favList) {
            console.log('test');
            await favList.destroy();
            return res.status(200).json({ message: "deleted"});
        }
        else {
            console.log('else');
            return res.status(404).json({ message: "not found" });
        }
    }catch(err) {
        return res.status(500).json({message:"deleteFavouriteList problem"});
    }
}

const putFavouriteList = async(req,res) => {
    try{
        const idReq = req.params.id;
        const favList = await FavouriteList.findByPk(req.params.id);
        if(favList) {
            await favList.update(req.body, { fields: ['description', 'date'] })
            return res.status(200).json(favList);
        }
        else {
            return res.status(404).json({ message: "not found" });
        }
    }catch(err){
        return res.status(500).json({message:"putSpacecraft problem"});
    }
}

const searchFavList = async (req, res) => {
    try {
        const searchBy = req.query.searchTerm || '';
        const order = req.query.order || 'ASC';

        const favLists = await FavouriteList.findAll({
            where: {
                [Op.or]: [{
                    description: {
                        [Op.like]: `%${searchBy}%`
                    }
                }, {
                    date: {
                        [Op.like]: `${searchBy}%`
                    }
                }]
            },
            order: [
                ['id', order]
            ]
        });

        return res.status(200).json(favLists);
    }catch(err){
        return res.status(500).json({message:"searchFavList problem"});
    }
}


module.exports = { 
    getAllFavouriteLists,
    postFavouriteList,
    deleteFavouriteList,
    putFavouriteList,
    searchFavList,
    getFavListById
};