const express = require('express')
const app = express()
// const port = 3000
var port = process.env.PORT || 3000;
bodyParser = require('body-parser');
app.use(bodyParser.json())

Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();
  
    return [this.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
           ].join('-');
};

  

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

app.post('/confirmReservation', function(req, res){
    console.log("Confirming the reservation")
    user_id = req.body.id,
    reservation_id = req.body.reservation_id

    ID = user_id+"_"+reservation_id
    console.log(ID)

    var reservation_detail = db.collection('reservation_details').doc(ID);
    var document = reservation_detail.get().then(doc => {

            const new_data = {
                menu : doc.data().menu,
                instructions : doc.data().instructions,
                end_time: doc.data().end_time,
                start_time: doc.data().start_time,
                member_id : doc.data().member_id,
                date: doc.data().date,
                reservation_id : doc.data().reservation_id,
                timestamp : doc.data().timestamp,
                timeSince : doc.data().timeSince,
                venue : doc.data().venue,
                status : 'confirmed'
            }
            // guests
            var setDoc = db.collection('reservation_details').doc(ID).set(new_data);
            const response_data = {
                response: "done"
            }
            res.send(JSON.stringify(response_data))
        })
})

app.post('/addReservation', function(req, res){
    console.log("Adding the reservation")
    console.log(req.body.memberID)
    const r_data = {
        menu : req.body.menu,
        instructions: req.body.instructions,
        end_time : req.body.end_time,
        start_time : req.body.start_time,
        member_id : req.body.memberID,
        date : req.body.date,
        venue: {
            name : req.body.venue,
            per_hour_surcharge : 2000,
            price : 10000
        },
        guestnumber : req.body.guestnumber,
        timestamp : "",
        timeSince : 0,
        reservation_id : 0,
        status: 'unconfirmed'
    }

    var date = new Date();
    r_data.timestamp = date.yyyymmdd();
    r_data.timeSince = date.getTime();

    var r_number = 0

    var user_info = db.collection('user_login').doc(req.body.memberID);
    var getDoc = user_info.get()
    .then(doc => {
        if (!doc.exists) {
            console.log('No such document!');
            new_data = {
                response : "no doc"
            }
            res.send(JSON.stringify(new_data))
        } else {
            docFound = true
            r_number = doc.data().reservation
            r_number = r_number + 1
            r_data.reservation_id = r_number
            id_str = r_number.toString()
            key = r_data.member_id + "_" + id_str
            console.log(key)
            console.log(r_data) 
            var setDoc = db.collection('reservation_details').doc(key).set(r_data);
            new_data = {
                response : "Done"
            }
            res.send(JSON.stringify(new_data))  

            // incrementing reservation number by a user
            var rnum_ref = db.collection("user_login").doc(req.body.memberID);

            return rnum_ref.update({
                reservation: r_number
            })
            .then(function() {
                console.log("Document successfully updated!");
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });

            


        }
    })
    .catch(err => {
        console.log('Error getting document', err);
    });
})

app.post('/deleteReservation', function(req, res){
    console.log("Deleting the reservation")
    user_id = req.body.id,
    reservation_id = req.body.reservation_id

    ID = user_id+"_"+reservation_id
    console.log(ID)

    var reservation_detail = db.collection('reservation_details').doc(ID);
    var document = reservation_detail.get()
        .then(doc => {
            const new_data = {
                menu : doc.data().menu,
                instructions : doc.data().instructions,
                end_time: doc.data().end_time,
                start_time: doc.data().start_time,
                member_id : doc.data().member_id,
                date: doc.data().date,
                reservation_id : doc.data().reservation_id,
                timestamp : doc.data().timestamp,
                timeSince : doc.data().timeSince,
                venue : doc.data().venue,
                status : 'removed'
            }

            var setDoc = db.collection('reservation_details').doc(ID).set(new_data);
            const response_data = {
                response: "done"
            }
            res.send(JSON.stringify(response_data))
        })
})


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

app.post('/get_reservations4UserRecent', function (req, res) {
    console.log ("User recent")
    var reservation_memberID = req.body.member_id

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
                        timeSince: doc.data().timeSince,
                        passed: "false"
                    }
                x += 1
            });

            var d = new Date();
            current_timestamp = d.getTime();
            current_date = d.getDate();

            new_data.sort(function (a, b) {
                if (a.timeSince < b.timeSince) {
                    return -1;
                }
                else {
                    return 1;
                }
            })

            function parsedate(str){
                new_str = str[8] + str[9]
                console.log("date is", new_str)
                return parseInt(new_str)
            }

            function parseyear(str){
                new_str = str[0] + str[1] + str[2] + str[3]
                console.log("year is", new_str)
                return parseInt(new_str)
            }

            function parsemonth(str){
                new_str = str[5] + str[6]
                console.log("month is", new_str)
                return parseInt(new_str)
            }

            function filterit(a) {
                year = parseyear(a.date)
                month = parsemonth(a.date)-1
                date = parsedate(a.date)
                d2 = new Date(year,month,date,0,0,0);
                timestamp = d2.getTime()
                if (timestamp > current_timestamp) {
                    return 1
                }
                return 0
            }
            new_data = new_data.filter(filterit)

            res.send(JSON.stringify(new_data));
            console.log("recent")
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


app.post('/get_reservations4UserPassed', function (req, res) {
    console.log ("User Passed")
    var reservation_memberID = req.body.member_id

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
                        timeSince: doc.data().timeSince,
                        passed: "true"
                    }
                x += 1
            });

            var d = new Date();
            current_timestamp = d.getTime();
            current_date = d.getDate();

            new_data.sort(function (a, b) {
                if (a.timeSince < b.timeSince) {
                    return -1;
                }
                else {
                    return 1;
                }
            })

            function parsedate(str){
                new_str = str[8] + str[9]
                console.log("date is", new_str)
                return parseInt(new_str)
            }

            function parseyear(str){
                new_str = str[0] + str[1] + str[2] + str[3]
                console.log("year is", new_str)
                return parseInt(new_str)
            }

            function parsemonth(str){
                new_str = str[5] + str[6]
                console.log("month is", new_str)
                return parseInt(new_str)
            }

            function filterit(a) {
                // console.log("date is ", a.date)
                year = parseyear(a.date)
                month = parsemonth(a.date)-1
                date = parsedate(a.date)
                d2 = new Date(year,month,date,0,0,0);
                // console.log("month is ", d2.getMonth())
                // console.log(d2.getTime())
                timestamp = d2.getTime()
                // console.log("event time stamp is ", timestamp)
                // console.log("current timestamp is ", current_timestamp)
                if (timestamp < current_timestamp) {
                    return 1
                }
                return 0
            }
            console.log("before")
            console.log(new_data)
            
            new_data = new_data.filter(filterit)

            res.send(JSON.stringify(new_data));
            console.log("passed data")
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
