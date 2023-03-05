const express = require('express');
const router = express.Router();
const menu = require('../models/Menu');


router.post('/createMenu', async(req,res) =>{
    try{
        let menuData = req.body;
        let menuInstance = await menu.create(menuData);
        return res.status(201).send({status:true, message:'created successfully', data: menuInstance})
    }catch(error){
        return res.status(500).send({status:false, message: error.message})
    }
})

router.get('/menu/:menuId', async(req,res)=>{
    try{
        let {menuId} = req.params;
        let menuFromDb = await menu.find({_id:menuId, isDeleted: false});
        if(!(menuFromDb.length)) return res.status(404).send({status:false, message:"menu not found"})
        return res.status(200).send({status:true, message:'created successfully', data: menuFromDb})
    }catch(error){
        return res.status(500).send({status:false, message: error.message})
    }
})

router.patch('/menu/:menuId', async(req,res)=>{
    try{
        let {menuId} = req.params;
        let updatedMenu = req.body;
        let menuAfterUpdation = await menu.findOneAndUpdate({_id:menuId, isDeleted: false}, updatedMenu, {new:true});
        if(!menuAfterUpdation) return res.status(404).send({status:false, message:"menu not found"})
        return res.status(200).send({status:true, message:'updated successfully', data: menuAfterUpdation})
    }catch(error){
        return res.status(500).send({status:false, message: error.message})
    }
})

router.delete('/menu/:menuId', async(req,res)=>{
    try{
        let {menuId} = req.params;
        let menuDeleted = await menu.findOneAndUpdate({_id:menuId, isDeleted: false}, {isDeleted:true}, {new:true});
        if(!menuDeleted) return res.status(404).send({status:false, message:"menu not found"})
        return res.status(200).send({status:true, message:'deleted successfully'})
    }catch(error){
        return res.status(500).send({status:false, message: error.message})
    }
})


module.exports = router;