const express = require('express')
const app = express()
// const port = 3000
var port = process.env.PORT || 3000;
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

app.post('/change_password', function (req, res) {
    console.log("change password")

    ID = req.body.ID
    oldpassword = req.body.oldPassword
    newPassword = req.body.newPassword

    var login = db.collection('user_login').doc(ID);
    var getDoc = login.get()
        .then(doc => {
            if (doc.data().Password == oldpassword) {
                const new_credentials =
                {
                    Name: doc.data().Name,
                    ID: doc.data().ID,
                    Admin : doc.data().Admin,
                    Password: newPassword,
                    Email: doc.data().Email, 

                }

                var setDoc = db.collection('user_login').doc(new_credentials.ID).set(new_credentials);
                new_data =
                    {
                        response: "done"
                    }
                res.send(JSON.stringify(new_data))
            }
            else {
                new_data =
                    {
                        response: "OldIdPass_invalid"
                    }
                res.send(JSON.stringify(new_data))
            }
        })
        .catch(err => {
            console.log('Error getting document', err);
        });
})

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


app.get('/get_dates', function (req, res){ // return the available dates for a given month,year.. venue and time
    // assuming i get month, year, venue, time(breakfast, lunch, dinner)
    month = 4
    year = 2019
    time = "dinner"
    venue = 'banquet' // lawn_1, lawn_2, tv_room
    unavailable_dates = {}
    var resRef = db.collection('reservation_availability').
    where('year', '==', year);
    var allres = resRef.get()
    .then(snapshot => {
        snapshot.forEach(doc => {
        // newdata[doc.id] = doc.data()
        var x = doc.data()
        if(x["month"] == month && x[venue][time] == "n"){
            unavailable_dates[x["date"]] = "n"
        }
        });
        res.send(JSON.stringify(unavailable_dates));
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


// app.get('/temp', function (req, res){
//     console.log("temp called")
//     // data = req.body
//     // data.Admin = 0

//     data = {} 
//     // key =  data.date.toString() + '-' + data.month.toString() + '-' + data.year.toString()
//     var setDoc = db.collection('reservation_availability').doc(key).set(data); 
    
//     res.send(JSON.stringify(data))     

// });


app.listen(port, () => console.log(`example app listening on port ${port}!`))


app.get('/get_confirmed_reservations', function (req, res) {

    console.log("in function")

    var reservationRef = db.collection('reservation_details').where('status', '==', "confirmed");
    var AllReservations = reservationRef.get()
        .then(snapshot => {
            new_data = {}
            snapshot.forEach(doc => {
                new_data[doc.id] =
                    {
                        member_id: doc.data().member_id,
                        reservation_id: doc.data().reservation_id,
                        timestamp: doc.data().timestamp,
                        date: doc.data().date,
                        start_time: doc.data().start_time,
                        end_time: doc.data().end_time,
                        instructions: doc.data().instructions,
                        status: "confirmed",
                        menu: doc.data().menu,
                        venue: doc.data().venue

                    }
                // console.log(doc.id, '=>', doc.data());
                console.log(new_data[doc.id])
            });
            res.send(JSON.stringify(new_data));
        })

        .catch(err => {
            console.log('Error getting documents', err);
            new_data = {
            "error" :
            {
                member_id: "error",
                reservation_id: "error",
                timestamp: "error",
                date: "error",
                start_time: "error",
                end_time: "error",
                instructions: "error",
                status: "error",
                menu: "error",
                venue: "error"
            }
        }

            // res.send(JSON.stringify(newdata));
        });
});


app.get('/get_unconfirmed_reservations', function (req, res) {

    console.log("in function")

    var reservationRef = db.collection('reservation_details').where('status', '==', "unconfirmed");
    var AllReservations = reservationRef.get()
        .then(snapshot => {
            new_data = {}
            snapshot.forEach(doc => {
                new_data[doc.id] =
                    {
                        member_id: doc.data().member_id,
                        reservation_id: doc.data().reservation_id,
                        timestamp: doc.data().timestamp,
                        date: doc.data().date,
                        start_time: doc.data().start_time,
                        end_time: doc.data().end_time,
                        instructions: doc.data().instructions,
                        status: "unconfirmed",
                        menu: doc.data().menu,
                        venue: doc.data().venue

                    }
                // console.log(doc.id, '=>', doc.data());
                console.log(new_data[doc.id])
            });
            res.send(JSON.stringify(new_data));
        })

        .catch(err => {
            console.log('Error getting documents', err);
            new_data = {
                "error":
                {
                    member_id: "error",
                    reservation_id: "error",
                    timestamp: "error",
                    date: "error",
                    start_time: "error",
                    end_time: "error",
                    instructions: "error",
                    status: "error",
                    menu: "error",
                    venue: "error"
                }
            }

            res.send(JSON.stringify(new_data));
        });
});
