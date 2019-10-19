const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')

router.post('/tasks',auth,async (req,res) => {
 
   const task = new Task({...req.body,owner : req.user._id})
    console.log(task)
try{
    await task.save()
    res.status(201)
    res.send(task)
}catch(e)
{
    res.status(400).send(e)
}

})
// GET /tasks?completed=true
// GET /tasks?limit=10&skip=0
// GET /tasks?sortBy=createdAt:asc/:desc
router.get('/tasks',auth,async (req,res) => {
    try{
    // const tasks = await Task.find({owner:req.user._id})
    const completed = req.query.completed
    const limit = parseInt(req.query.limit)
    const skip = parseInt(req.query.skip)
    const sortby = req.query.sortBy
    console.log(sortby)
    const match ={}
    const sort ={}

    if(req.query.sortBy) {const parts = sortby.split(':'); sort[parts[0]] = parts[1] ==='desc' ? -1 : 1}
    
    const option ={limit,skip,sort}
    console.log(option)
    if(completed !== undefined)
    {
   if(completed !== 'false' || completed !== 'true'){
       return res.status(404).send({error : "completed must be true or false"})
    }
    else if (completed ==='')
    {
        return res.status(404).send({error : "completed must be trues or false"})
    }
    if(completed === true || completed ===false){match.completed = req.query.completed ==='true'}
    }
     await req.user.populate({path:'tasks',match,options:option}).execPopulate()
     //res.status(200).send(tasks)
     res.status(200).send(req.user.tasks)
    }catch(e) {
        res.status(500).send(e)
    }
   
})


router.get('/tasks/:id',auth,async (req,res) => {
    const _id = req.params.id
    try{
  
    const task = await Task.findOne({_id,owner : req.user._id})
     if(!task)
    {
        return res.status(404).send()
    }
     res.status(200).send(task)
    }catch(e) {
        res.status(500).send(e)
    }
  
})


router.patch('/tasks/:id',auth, async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed','description']
    const isAllowed = updates.every((update) => allowedUpdates.includes(update))
             
    if(!isAllowed)
    {
        return res.status(400).send({error : 'invalid updates'})
        
    }

    try
    {
     const _id = req.params.id
     const owner =req.user._id
    // const task = await Task.findById(_id)
      const task = await Task.findOne({_id:_id , owner:owner})
      if(!task)
      {
         return res.status(404).send()
      }
     updates.forEach((update) => task[update] = req.body[update])
     await task.save()
   
    
     res.send(task)
    }catch(e)
    {
        console.log(e)
      res.status(400).send(e)
    }
})


 router.delete('/tasks/:id',auth, async (req,res) => {
     try{
        const _id = req.params.id
        const owner = req.user._id
        const task = await Task.findByIdAndDelete({_id,owner})
       
         
        if(!task)
        {
            return res.status(404).send()
        }
        res.status(200).send(task)
     }catch(e)
     {
     res.status(500).send(e)
     }
 })


 module.exports = router