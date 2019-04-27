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

app.listen(port, () => console.log(`example app listening on port ${port}!`))


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


app.post('/get_dates', function (req, res){ // return the available dates for a given month,year.. venue and time
    // assuming i get month, year, venue, time(breakfast, lunch, dinner)
    console.log("get_dates called")
    venue = req.body.my_venue
    timing = req.body.my_timing
    if(venue == "Banquet"){
        venue = "banquet"
    } if(venue == "TV Room"){
        venue = "tv_room"
    } if(venue == "Lawn 1"){
        venue = "lawn_1"
    } if(venue == "Lawn 2"){
        venue = "lawn_2"
    } if(timing == 0){
        time = "breakfast"
    } if(timing == 1){
        time = "lunch"
    } if(timing == 2){
        time = "dinner"
    }

    console.log("time: ", time)
    console.log("venue ", venue)
    // time = "dinner"
    // venue = 'banquet' // lawn_1, lawn_2, tv_room
    var unavailable_dates = []
    var resRef = db.collection('reservation_availability')
    var allres = resRef.get()
    .then(snapshot => {
        snapshot.forEach(doc => {
        // newdata[doc.id] = doc.data()
        var x = doc.data()
        if(x[venue][time] == "n"){ 
            unavailable_dates.push(x["date_string"])
        }
        });
        console.log(unavailable_dates)
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







app.get('/get_confirmed_reservations', function (req, res) {
    
    console.log("Confirmed reservations")
    var reservationRef = db.collection('reservation_details').where('status', '==', "confirmed");
    var AllReservations = reservationRef.get()
        .then(snapshot => {
            new_data = []
            x = 0
            snapshot.forEach(doc => {
                new_data[x] =
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
                        venue: doc.data().venue,
                        timeSince : doc.data().timeSince

                    }
                x += 1
               
            });

            var d = new Date();
            current_timestamp = d.getTime();
            current_date = d.getDate();
            timestamp_aftermonth = current_timestamp + 2600000000


            new_data.sort(function (a, b) {
                if (a.timeSince < b.timeSince) {
                    return -1;
                }
                else {
                    return 1;
                }
            })

            function filterit(a) {
                if ((a.timeSince > current_timestamp) && (a.timeSince < timestamp_aftermonth)) {
                    return 1
                }
                return 0
            }
            new_data = new_data.filter(filterit)
            // console.log(new_data)
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
        
        res.send(JSON.stringify(new_data));
    });

    // res.send(JSON.stringify(new_data));
});

app.get('/get_unconfirmed_reservations', function (req, res) {

    console.log("Unconfirmed reservations")
    var reservationRef = db.collection('reservation_details').where('status', '==', "unconfirmed");
    var AllReservations = reservationRef.get()
        .then(snapshot => {
            new_data = []
            x = 0
            snapshot.forEach(doc => {
                new_data[x] =
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
                        venue: doc.data().venue,
                        timeSince: doc.data().timeSince

                    }
                x += 1

            });

            var d = new Date();
            current_timestamp = d.getTime();
            current_date = d.getDate();
            timestamp_aftermonth = current_timestamp + 2600000000


            new_data.sort(function (a, b) {
                if (a.timeSince < b.timeSince) {
                    return -1;
                }
                else {
                    return 1;
                }
            })

            function filterit(a) {
                if ((a.timeSince > current_timestamp) && (a.timeSince < timestamp_aftermonth)) {
                    return 1
                }
                return 0
            }
            new_data = new_data.filter(filterit)
            // console.log(new_data)
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

    // res.send(JSON.stringify(new_data));
});



app.post('/get_reservations4User', function (req, res) {

    console.log("in function")

    // un-comment following line after implementing its client side
    var reservation_memberID = req.body.member_id


    // var reservation_memberID = "20100170";
    var reservationRef = db.collection('reservation_details').where('member_id', '==', reservation_memberID);
    var AllReservations = reservationRef.get()
        .then(snapshot => {
            new_data = []
            x = 0
            snapshot.forEach(doc => {
                new_data[x] =
                    {
                        member_id: doc.data().member_id,
                        reservation_id: doc.data().reservation_id,
                        timestamp: doc.data().timestamp,
                        date: doc.data().date,
                        start_time: doc.data().start_time,
                        end_time: doc.data().end_time,
                        instructions: doc.data().instructions,
                        status: doc.data().status,
                        menu: doc.data().menu,
                        venue: doc.data().venue,
                        timeSince: doc.data().timeSince

                    }
                x += 1
            });
            res.send(JSON.stringify(new_data));

            console.log(new_data)

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

