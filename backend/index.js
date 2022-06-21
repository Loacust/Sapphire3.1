const express = require('express');
const app = express();
const config = require('./config');
const User = require('./Models/user');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 7;
const multer = require('multer');
const Userphotos = require('./Models/photo_info');
const path = require('path');
const { fs } = require('fs');
const stripe = require('stripe')('sk_test_51L9uu6ARDzLUzTUFuFM7G0k5WnNRiCExPjo6G7a7L2xdPKpwqeNpOHzOgE2ksN8ZiScgOwiTnljF4JU3lwrXaiqb005hCIv9hk')
const bodyparser = require('body-parser');
const UserOrders = require('./Models/orders');
const ContactUsData = require('./Models/comments')

app.use(bodyparser.urlencoded({entended:true}));
app.use(cors());
app.use(express.static('backend'))
app.use('/uploadimages', express.static('uploadedimages'));
app.use(bodyparser.json());

app.use(express.json());

//Connection
config.authenticate().then(function () {
    console.log('Database is connected');
}).catch(function (err) {
    console.log(err)
});
//initializing storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploadedimages');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

//Routes

app.get('/editorImage', function(req,res){
   editorImage = req.params.editorImage;
    Userphotos.findByPk(editorImage)
} )
//Photo library get route
app.get('/imagePost', function (req, res) {
    Userphotos.findAll().then(function(result){
        res.send(result);

    }).catch(function(err){
        res.send(err)
    });
});

//Registration post
app.post('/regPost', function (req, res) {
    let plainPassword = req.body.password;

    bcrypt.hash(plainPassword, saltRounds, function (err, hash) {

        let user_data = {
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: hash

        };

        User.create(user_data).then(function (result) {
            res.status(200).send(result);
        }).catch(function (err) {
            res.status(500).send(err);
        });
    });
});

//Login Post
app.post('/loginPost', function (req, res) {

    let email = req.body.email;
    let password = req.body.password;
    let user_data = {
        where: { email }
    }

    User.findOne(user_data).then((result) => {
        if (result) {
            console.log(result);
            bcrypt.compare(password, result.password, function (err, output) {
                console.log(output);
                if (output) {
                    res.status(200).send(result);
                } else {
                    res.status(400).send('Incorrect Password');
                }

            });
        }
        else {
            res.status(404).send('User does not exist');
        }

    }).catch((err) => {
        res.status(500).send(err);
    });
});

//Add Image to library upload post
app.post('/imagePost', multer({ storage }).single('image'), function (req, res) {
    let upload_Data = {
        email: req.body.email,
        image: req.file ? req.file.filename : null,
    }

    Userphotos.create(upload_Data).then(function (result) {
        res.status(200).send(result);
        
    }).catch(function (err) {
        res.status(500).send(err);
    });

})

// Questions and Complaints
app.post('/sendInfo', function(req,res){
    let ContactData = {
        email: req.body.email,
        fname: req.body.fname,
        lname: req.body.lname,
        comments: req.body.comments,
    }
    ContactUsData.create(ContactData).then(function(result){
    res.status(200).send(result);
    }).catch(function(err){
    res.status(500).send(err);
});
});
//Delete Image from database *not server
app.delete('/:image', function (req, res){
    let image = req.params.image;
    
    
    Userphotos.findByPk(image).then(function(result){
        console.log(image)
        if( result != null){
            result.destroy().then(function(){
                res.redirect('/')
            }).catch(function(err){
                res.send(err);
            });
        }
        else{
            res.send('image not found');
        }
    }).catch(function (err){
        console.log('you failed');
    })
})
app.get('/imagePost', function (req, res,) {
    Userphotos.findAll().then(function(result){
        res.send(result);

    }).catch(function(err){
        res.send(err)
    });
});
//OrderPost
app.post('/orderInfo', function (req, res) {
    let upload_Data = {
        email: req.body.email,
        photoid: req.body.photoid,
        quantity: req.body.quantity,
        size: req.body.size,
        price: req.body.price
    }
    UserOrders.create(upload_Data).then(function (result) {
        res.status(200).send(result);
    }).catch(function (err) {
        res.status(500).send(err);
    });

})
//Order Retieval
app.get('/orderRetrieval', function (req, res,) {
    UserOrders.findAll().then(function(result){
        res.send(result);

    }).catch(function(err){
        res.send(err)
    });
});

//OrderDelete
app.delete('/orderDelete/:orderid', function (req, res){
    let orderid = req.params.orderid;
    
    
    UserOrders.findByPk(orderid).then(function(result){
        console.log(orderid)
        if( result != null){
            result.destroy().then(function(){
                res.redirect('/')
            }).catch(function(err){
                res.send(err);
            });
        }
        else{
            res.send('image not found');
        }
    }).catch(function (err){
        console.log('you failed');
    })
})

//Checkout Post
app.post('/checkout', async(req, res) => {
    try {
        console.log(req.body);
        token = req.body.token
      const customer = stripe.customers
        .create({
          email: "janson92@gmail.com",
          source: token.id
        })
        .then((customer) => {
          console.log(customer);
          return stripe.charges.create({
            amount: 1000,
            description: "4x6 Photo",
            currency: "USD",
            customer: customer.id,
          });
        })
        .then((charge) => {
          console.log(charge);
            res.json({
              data:"success"
          })
        })
        .catch((err) => {
            res.json({
              data: "failure",
            });
        });
      return true;
    } catch (error) {
      return false;
    }})

    app.get('/priceRetrieval', function (req, res,) {
        UserOrders.findAll().then(function(result){
            res.send(result);
    
        }).catch(function(err){
            res.send(err)
        });
    });


app.listen(4000, function () {
    console.log('Server is running on port 4000....');
});