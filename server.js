var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var Q = require('q');
var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();

var mongojs = require('mongojs');
var dburl = 'admin:7aGglTIsldbd@localhost/acs';
var collections = ["users", "paystack", "incompletestack", "instr"];
var db = mongojs(dburl, collections);
var ObjectId = db.ObjectId;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/users', users);
//Routes go here 

app.post('/route5733bcdbc3bf1b32692373e5', function(req, res) {
    query = req.body;

    db.users.find({ 'uname': req.body.uname }, function(err, resp) {
        if (err) res.send('Error!');
        else {
            respLen = resp.length;
            if (respLen != 0) {
                res.send('user exists');
            } else {
                db.users.insert(req.body, function(err, saved) {
                    if (err) res.send('Error!');
                    else {
                        userInfo = req.body;
                        userInfo["activity"] = "active";
                        userInfo["amount"] = 500;
                        userInfo["level"] = 0;
                        userInfo["numPays"] = 0;
                        db.paystack.insert(userInfo, function(err, saved) {
                            if (err) res.send('Error!');
                            else { res.send('Success!') }
                        });
                    }
                });
            }
        }
    });

});

app.post('/moveToStack', function(req, res) {
    query = req.body;

    db.paystack.insert(query, function(err, saved) {
        if (err) res.send('Error!');
        else { res.send('Success!') }
    });

});

app.post('/moveToIncompleteStack', function(req, res) {
    query = req.body;

    db.incompletestack.insert(query, function(err, saved) {
        if (err) res.send('Error!');
        else { res.send('Success!') }
    });

});

app.post('/route5733d165d8d777276e976db2', function(req, res) {
    query = req.body;

    if (req.body.daymonth == "0") {
        instr = req.body;
        instr["createdOn"] = new Date();
        db.instr.insert(instr, function(err, saved) {
            if (err) res.send('Error!');
            else {
                res.send('Success!');
            }
        });
    } else {
        db.paystack.insert(query, function(err, saved) {
            if (err) res.send('Error!');
            else { res.send('Success!') }
        });
    }

});

app.post('/changePledgeActivity', function(req, res) {
    query = req.body;

    db.paystack.update({ _id: ObjectId(req.body._id) }, { $set: { activity: req.body.status, served: true } }, function(err, saved) {
        if (err) res.send('Error!');
        else { res.send('Success!') }
    });

});

app.post('/updateNumPays', function(req, res) {
    query = req.body;
    numPays = 0;

    db.paystack.find({ _id: ObjectId(query.proxyId) }, function(err, resp) {
        if (err) res.send('Error!');
        else {
            numPays = resp[0]['numPays'];
            numPays++;

            if (numPays < 5) {
                //console.log("Incrementing Pays");
                //console.log(resp);
                //console.log(numPays);
                db.paystack.update({ _id: ObjectId(resp[0]._id) }, { $set: { numPays: numPays } }, function(err, saved) {
                    if (err) res.send('Error!');
                    else { res.send('Success!') }
                });
            } else {
                console.log("Not Incrementing Pays");
                console.log(numPays);
                db.paystack.update({ _id: ObjectId(resp[0]._id) }, { $set: { activity: 'active', numPays: 5, served: false } }, function(err, saved) {
                    if (err) res.send('Error!');
                    else { res.send('Success!') }
                });
            }
        }
    });

});

app.post('/changeUserStatus', function(req, res) {
    query = req.body;
    console.log(req.body);

    db.users.update({ uname: req.body.uname }, { $set: { new: req.body.status } }, function(err, saved) {
        if (err) res.send('Error!');
        else { res.send('Success!') }
    });

});

app.post('/paidInstr', function(req, res) {
    query = req.body;
    console.log(req.body);

    db.instr.update({ _id: ObjectId(req.body._id) }, { $set: { activity: req.body.status } }, function(err, saved) {
        if (err) res.send('Error!');
        else { res.send('Success!') }
    });

});

app.post('/removeProxy', function(req, res) {
    query = req.body;
    //console.log(req.body);

    db.paystack.remove({ _id: ObjectId(query.proxyId) }, function(err, saved) {
        if (err) res.send('Error!');
        else { res.send('Success!') }
    });

});

app.post('/getUserPledges', function(req, res) {
    query = req.body;

    db.paystack.find(query, function(err, resp) {
        if (err) res.send('Error!');
        else { res.send(resp) }
    });

});

app.post('/getPayStack', function(req, res) {
    query = req.body;

    db.paystack.find(query, function(err, resp) {
        if (err) res.send('Error!');
        else { res.send(resp) }
    });

});

app.post('/getUserInstrs', function(req, res) {
    query = req.body;

    db.instr.find(query, function(err, resp) {
        if (err) res.send('Error!');
        else { res.send(resp) }
    });

});

app.post('/getNewUsers', function(req, res) {
    query = req.body;
    //query2 = { $and: [{ level: query['$and'][0].level }, { $or: query['$and'][1]['$or'] }] };
    console.log(query);

    db.paystack.find(query, function(err, resp) {
        if (err) res.send('Error!');
        else { res.send(resp) }
    });

});

app.post('/getUser', function(req, res) {
    query = req.body;

    console.log(query);

    db.users.find({ uname: req.body.uname }, function(err, resp) {
        if (err) res.send('Error!');
        else { res.send(resp) }
    });

});

app.post('/route5733c02088c2df8e69761970', function(req, res) {
    query = req.body;
    db.users.find({ "uname": query.logUname }, function(err, data) {
        if (err) res.send('Error!');
        else {
            password = req.body.logPass;
            if ((data.length != 0) && (data[0]['upass'] == password)) {
                res.send(data)
            } else {
                data1 = [];
                res.send(data1);
            }
        }
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
