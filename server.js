const express = require('express')
const app = express()
const port = 3000
// var port = process.env.PORT || 3000;
bodyParser = require('body-parser');
app.use(bodyParser.json())


var admin = require("firebase-admin");
var serviceAccount = require("./defenceclub-team5-firebase-adminsdk-88zof-941202010e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://defenceclub-team5.firebaseio.com"
});

var db = admin.firestore()

app.get('/', (req, res) => res.send('"Hello World'))
app.get('/login', function (req, res){
    console.log("hello")
    res.send('"Hello World')
});

app.get('/get_menu', function (req, res){
    
    var menuRef = db.collection('menu_item');
    var allmenu = menuRef.get()
    .then(snapshot => {
        newdata = {}
        snapshot.forEach(doc => {
        newdata[doc.id] = {
            Name : doc.data().Name, 
            Price : doc.data().Price,
            Category: doc.data().Category
        }
        console.log(doc.id, '=>', doc.data());
        });
        res.send(JSON.stringify(newdata));
    })

    .catch(err => {
        console.log('Error getting documents', err);
        newdata = {
            "error": {
                Name: "error",
                Price : "error",
                Category : "error"
            }
        }
        res.send(JSON.stringify(newdata));
    });  
});

app.post('/add_admin', function(req, res){
    console.log("add admin")
    data = req.body
    // console.log(data)
    data.Admin = 1
    var setDoc = db.collection('user_login').doc(data.ID).set(data);
    new_data = {
        response : "Done"
    }
    res.send(JSON.stringify(new_data))   
})

app.post('/add_menu', function(req, res){
    console.log("adding menu item")
    data = req.body
    // console.log(data)
    var setDoc = db.collection('menu_item').doc(data.Name).set(data);
    new_data = {
        response : "Done"
    }
    res.send(JSON.stringify(new_data))   
})



app.post('/add_member', function(req, res){
    console.log("add member")
    data = req.body
    data.Admin = 0
    var setDoc = db.collection('user_login').doc(data.ID).set(data); 
    new_data = {
        response : "Done"
    }
    res.send(JSON.stringify(new_data))     
})



app.post('/remove_menu', function(req, res){
    console.log("removing menu item")
    data = req.body
    // console.log(data)
    if(data.Name === ""){
        new_data = {
            response : "Nokey"
        }
    } else {
        var deleteDoc = db.collection('menu_item').doc(data.Name).delete();
        new_data = {
            response : "Done"
        }
    }

    res.send(JSON.stringify(new_data))   
})


app.post('/login', function(req, res){
    console.log("login request")
    email = req.body.username
    var login = db.collection('user_login').doc(email);
    var getDoc = login.get()
    .then(doc => {
        if (!doc.exists) {
            console.log('No such document!');
            console.log("Password not matched")
            new_data = {
                response : "Not Done"
            }
            res.send(JSON.stringify(new_data))

        } else {
            if (doc.data().Password === req.body.password){
                console.log("Password matched")
                new_data = {
                    response : "Done",
                    Admin : doc.data().Admin,
                    Name : doc.data().Name
                }
                res.send(JSON.stringify(new_data))
            }else{
                console.log("Password not matched")
                new_data = {
                    response : "Not Done"
                }
                res.send(JSON.stringify(new_data))
            }
        }
    })
    .catch(err => {
        console.log('Error getting document', err);
    });
});
app.listen(port, () => console.log(`example app listening on port ${port}!`))