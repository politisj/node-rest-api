
const User = require('../models/user');
const express = require('express');
const router = new express.Router();


router.get('/users/:id', async (req,resp) => {

    try {
      
      const user = await User.findById(req.params.id);

      if (!user) {
        return resp.status(404).send(user);
      }

      resp.send(user);

    }
    catch(e) {
      resp.status(500).send();
    }

    // User.findById(req.params.id).then(user=>{
    //   if(!user) {
    //     return resp.status(404).send(user);
    //   }
    //   resp.send(user);
    // })
    // .catch(e => resp.status(500).send());
   
});

router.get('/users', async (req,resp)=>{

    try {
      const user = await User.find({});
      resp.send(user);

    }
    catch(e) {
        resp.status(500).send();
    }
    // User.find({})
    //   .then(user => {
    //     console.log(`${user}`);
    //     resp.send(user);
    //   })
    //   .catch(e => resp.status(500).send());

    
});

router.post('/users',async (request,response)=>{

    try {
      let user = new User(request.body);
      user = await user.save();
      response.send(user);
    }
    catch(e) {
      response.status(400).send();
    }

    // const user = new User(request.body);
    // user.save()
    // .then( () => response.status(201).send(user))
    // .catch((error) =>{
    //     response.status(400).send(error);
    // });
    
});

router.patch('/users/:id', async (req,resp) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name','email','password', 'age'];
  const isValidOperation = updates.every( update => allowedUpdates.includes(update));

    if(!isValidOperation) {
        return resp.status(400).send({ error : 'Invalid Updates'});
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id ,  req.body , { new : true , runValidators : true });
        
        if(!user) {
           return resp.status(404).send();
        }

        resp.send(user);
    }
    catch(e) {
       resp.status(400).send();
    }
});

router.delete('/users/:id', async (req,resp) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user) {
            return resp.status(404).send();
        }

        resp.send(user);
    }
    catch(e) {
        resp.status(500).send(e);
    }
});


module.exports = router;


