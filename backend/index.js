const express = require('express');
const app = express();
const config = require('./config');
const User = require('./Models/user');
const cors= require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 7;
const multer = require('multer');

app.use(cors());
app.use('/images', express.static('uploadedimages'));

app.use(express.json());

//Connection
config.authenticate().then(function(){
    console.log('Database is connected');
}).catch(function(err){
    console.log(err)
});

//Upload folder 

const storage = multer.diskStorage({
    destination: function(req, file,cb){
        cb(null, './uploadedimages');
    },
    filename: function (req,file,cb) {
        cb(null, file.originalname); // need to build a sudo file name generator eventually
    }
});

app.post('/imgPost', function(req, res){
    let task = req.body;
    Task.create(task).then(function(result){
        res.redirect('/');
    }).catch(function(err){
        res.send(err);
    })
});





//Routes

app.get('/', function (req, res) {
    User.findAll().then(function(result){
        res.send(result);
    }).catch(function(err){
        res.send(err);
    });
});




app.post('/regPost',function (req,res){
    let plainPassword = req.body.password;

    bcrypt.hash(plainPassword, saltRounds,function(err,hash){

        let user_data = {
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: hash
            
        };

    User.create(user_data).then(function(result){
        res.status(200).send(result);
    }).catch(function(err){
        res.status(500).send(err);
    });
});
});


app.post('/loginPost', function(req,res){

    let email = req.body.email;
    let password = req.body.password;
    let user_data = {
        where: {email} 
    }

    User.findOne(user_data).then((result) => {
        if(result){
            console.log(result);
            bcrypt.compare(password, result.password, function(err,output){
                console.log(output);
                if(output){
                    res.status(200).send(result);
                }else{
                    res.status(400).send('Incorrect Password');
                }
                
            });
        }
        else{
            res.status(404).send('User does not exist');
        }
    
    }).catch((err) => {
        res.status(500).send(err);
    });
});  

app.delete('/:email',function(req,res){
    let user = req.params.email;

    User.findByPk(user).then(function(result){

    if(result){
        result.destroy().then(function(){
            res.redirect('/');
        }).catch(function(err){
            res.send(err);
        })
    }
    else {
        res.send('User not found')
    }
})
});



app.listen(4000, function () {
    console.log('Server is running on port 4000....');
});