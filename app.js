const express =require('express');
const jwt =require('jsonwebtoken');
const fs=require('fs');
const { verify } = require('crypto');
let cert = fs.readFileSync('secret.key')
const app = express()
const port = process.env.PORT || 5000;

// http://localhost:5000/api
app.get('/api',(req,res)=>{
    res.json({
        message:"hello world"
    });
})
app.post('/api/posts', verifyToken, (req,res)=>{
    jwt.verify(req.token, cert, (err, Data)=>{
        if (err) {
            res.sendStatus(403)
        }
        res.json({
            message: 'post created ...',
            Data
        })
    })
})
app.post('/api/login',(req,res)=>{
    const user ={
        id:1,
        username:"roaa",
        password:"1998*Mis"
    }
    jwt.sign({user},cert,(err,token)=>{
        if(err){
            res.json({
                message:" username or password not vaild"
            })
        }
        res.json({token})
    })
})
function verifyToken (req,res,next) {
    // get auth header value
    // Format of token : authorization: Bearer <token>
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== "undefined") {
        // split at the space
        const bearer = bearerHeader.split(' ')
        // get token from array
        const token = bearer[1]
        // set the token
        req.token = token
        // next middleware
        next()
    } else {
        // Forbidden
        res.sendStatus(403)
    }
}
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });