const Task = require('../models/user');
const express = require('express');

const router = new express.Router();


router.post('/tasks',async (req,resp)=>{

    try {
      const task = new Task(req.body);
      task.save();
      resp.send(task);
    }
    catch(e) {
      resp.status(500).send();
    }
    

    // const task = new Task(req.body);
    // task.save()
    // .then(res=>{
    //     resp.status(201).send(task);
    //   }).catch(e => resp.status(500).send());
});

router.get('/tasks/:id',async (req,resp)=>{

    try {
      const task = await Task.findById(req.params.id);
      resp.send(task);
    }
    catch(e) {
      resp.status(404).send();
    }

  // Task.findById(req.params.id)
  //   .then(task => {
  //     if (!task) {
  //       return resp.status(404).send();
  //     }
  //     resp.send(task);
  //   })
  //   .catch(e => resp.status(404).send());

});

router.get('/tasks',async (req,resp)=>{

    try {
      const task = await Task.find({});
      resp.send(task);
    }
    catch(e) {
      resp.status(500).send();
    }

    // Task.find({}).then(tasks => {
    //   resp.send(tasks);
    // }).catch(e => resp.status(500).send());
});

router.patch('/tasks/:id',async (req,resp) => {
   const updates = Object.keys(req.body);
   const allowedUpdates = ['description','completed'];
   const isValidOperation = updates.every(update => allowedUpdates.includes(update));

   if(!isValidOperation) {
      return resp.status(400).send({error: 'Invalid update'});
   }
   
   try {
      const task =  await Task.findByIdAndUpdate(req.params.id, req.body ,{ new: true , runValidators : true });
      if(!task) {
        return resp.status(400).send();
      }

      resp.send(task);
   }
   catch(e) {
      resp.status(400).send(e);
   }
});


router.delete('/tasks/:id',async (req,resp)=>{

    try {

      const task = await Task.findByIdAndDelete(req.params.id);
      if(!task) {
          return resp.status(404).send();
      }
  
      resp.send(task);

    }
    catch(e) {
        resp.status(500).send(e);
    }

});


module.exports = router;