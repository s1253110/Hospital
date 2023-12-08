const link = 'https://hosiptal.onrender.com';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.get('/endpoint', (req, res) => {
  res.redirect(link);
});

const assert = require('assert');

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const mongourl = ''; // MongoDB connection URL
const dbName = 'hospital'; // Database name for the hospital system

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('cookie-session');
const SECRETKEY = 'abc123';

var usersinfo = new Array(
    {name: "user1", password: "abc123"},
    {name: "user2", password: "abc123"},
    {name: "user3", password: "abc123"}
);

var documents = {};

// Main Body
app.set('view engine', 'ejs');
app.use(session({
    name: 'session',
    keys: [SECRETKEY],
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const createDocument = function (db, createdDocuments, callback) {
    const client = new MongoClient(mongourl, { useNewUrlParser: true });
        client.connect(function (err) {
            assert.equal(null, err);
            console.log("Connected successfully to the MongoDB database server.");
            const db = client.db(dbName);

            db.collection('patients').insertOne(createdDocuments, function (error, results) {
                if (error) {
                    throw error;
                };
                console.log(results);
                return callback();
            });
        });
};

const findDocument = function (db, criteria, callback) {
    let cursor = db.collection('patients').find(criteria);
        console.log(`findDocument: ${JSON.stringify(criteria)}`);
        cursor.toArray(function (err, docs) {
            assert.equal(err, null);
            console.log(`findDocument: ${docs.length}`);
            return callback(docs);
        });
};

const handle_Find = function (res, criteria) {
    const client = new MongoClient(mongourl, { useNewUrlParser: true });
        client.connect(function (err) {
            assert.equal(null, err);
            console.log("Connected successfully to the server");
            const db = client.db(dbName);

            findDocument(db, criteria, function (docs) {
                client.close();
                console.log("Closed DB connection");
                res.status(200).render('display', { nItems: docs.length, items: docs });
            });
        });
};

const handle_Edit = function (res, criteria) {
    const client = new MongoClient(mongourl, { useNewUrlParser: true });
        client.connect(function (err) {
            assert.equal(null, err);
            console.log("Connected successfully to the server");
            const db = client.db(dbName);

            let documentID = {};
            documentID['_id'] = ObjectID(criteria._id);
            let cursor = db.collection('patients').find(documentID);
            cursor.toArray(function (err, docs) {
                client.close();
                assert.equal(err, null);
                res.status(200).render('edit', { item: docs[0] });
            });
        });
};

const handle_Details = function (res, criteria) {
    const client = new MongoClient(mongourl, { useNewUrlParser: true });
        client.connect(function (err) {
            assert.equal(null, err);
            console.log("Connected successfully to the server");
            const db = client.db(dbName);

            let documentID = {};
            documentID['_id'] = ObjectID(criteria._id);
            findDocument(db, documentID, function (docs) {
                client.close();
                console.log("Closed DB connection");
                res.status(200).render('details', { item: docs[0] });
            });
        });
};

const updateDocument = function (criteria, updateDocument, callback) {
    const client = new MongoClient(mongourl, { useNewUrlParser: true });
        client.connect(function (err) {
            assert.equal(null, err);
            console.log("Connected successfully to the server");
            const db = client.db(dbName);
            console.log(criteria);
            console.log(updateDocument);
            db.collection('patients').updateOne(criteria, {
                $set: updateDocument
            }, function (err, results) {
                client.close();
                assert.equal(err, null);
                return callback(results);
            });
        });
};

const deleteDocument = function (db, criteria, callback) {
    console.log(criteria);
    db.collection('patients').deleteOne(criteria, function (err, results) {
        assert.equal(err, null);
        console.log(results);
        return callback();
    });
};

const handle_Delete = function (res, criteria) {
    const client = new MongoClient(mongourl, { useNewUrlParser: true });
        client.connect(function (err) {
            console.log("Connected successfully to the server");
            const db = client.db(dbName);

            let delDocument = {};

            delDocument["_id"] = ObjectID(criteria._id);
            delDocument["ownerID"] = criteria.owner;
            console.log(delDocument["_id"]);
            console.log(delDocument["ownerID"]);

            deleteDocument(db, delDocument, function (results) {
                client.close();
                console.log("Closed DB connection");
                res.status(200).render('info', { message: "Document is successfully deleted." });
            });
        });
};

app.get('/', function (req, res) {
    if (!req.session.authenticated) {
        console.log("...Not authenticated; directing to login");
        res.redirect("/login");
    } else {
        res.redirect("/home");
    }
    console.log("...Hello, welcome back");
});

const express = require('express');
const app = express();

app.set('view engine', 'ejs');
// Set EJS as the template engine
app.set('view engine', 'ejs');

// Use body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Render homepage.ejs template
app.get('/', (req, res) => {
  res.render('homepage', { message: null });
});

// Handle delete request
app.post('/delete', (req, res) => {
  const deleteId = req.body.deleteId;

  // In a real application, you would perform the deletion operation based on the deleteId

  const message = `Information with ID ${deleteId} has been deleted`;

  res.render('homepage', { message: message });
});

app.get('/', (req, res) => {
  res.render('home');
});

// Route for the login page
app.get('/login', (req, res) => {
  // Perform any necessary server-side logic for login
  // Pass data to the EJS template if needed
  res.render('login');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

// Route for the signup page
app.post('/register', (req, res) => {
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/update', (req, res) => {
  // Perform any necessary server-side logic
  // Pass data to the EJS template if needed
  res.render('update');
});

app.get('/edit', (req, res) => {
  // Perform any necessary server-side logic
  // Pass data to the EJS template if needed
  res.render('edit');
});

app.get('/search', (req, res) => {
  // Perform any necessary server-side logic
  // Pass data to the EJS template if needed
  res.render('search');
});

app.listen(8099, () => {
  console.log('Server is running on port 8099');
});

// Login
app.get('/login', function (req, res) {
    console.log("...Welcome to the login page.");
    res.sendFile(__dirname + '/public/login.html');
    return res.status(200).render("login");
});

app.post('/login', function (req, res) {
    console.log("...Handling your login request");
    for (var i = 0; i < usersinfo.length; i++) {
        if (usersinfo[i].name == req.body.username && usersinfo[i].password == req.body.password) {
            req.session.authenticated = true;
            req.session.userid = usersinfo[i].name;
            console.log(req.session.userid);
            return res.status(200).redirect("/home");
        }
    }
    console.log("Error: Invalid username or password.");
    return res.redirect("/");
});

app.get('/logout', function (req, res) {
    req.session = null;
    req.authenticated = false;
    res.redirect('/login');
});

app.get('/home', function (req, res) {
    console.log("...Welcome to the home page!");
    return res.status(200).render("home");
});

app.get('/list', function (req, res) {
    console.log("Show all information!");
    handle_Find(res, req.query.docs);
});

app.get('/find', function (req, res) {
    return res.status(200).render("search");
});

app.post('/search', function (req, res) {
    const client = new MongoClient(mongourl, { useNewUrlParser: true });
        client.connect(function (err) {
            assert.equal(null, err);
            console.log("Connected successfully to the DB server.");
            const db = client.db(dbName);

            var searchID = {};
            searchID['hospitalID'] = req.body.hospitalID;

            if (searchID.hospitalID) {
                console.log("...Searching the document");
                findDocument(db, searchID, function (docs) {
                    client.close();
                    console.log("Closed DB connection");
                    res.status(200).render('display', { nItems: docs.length, items: docs });
                });
            } else {
                console.log("Invalid Entry - Hospital ID is compulsory for searching!");
                res.status(200).redirect('/find');
            }
        });
});

app.get('/details', function (req, res) {
    handle_Details(res, req.query);
});

app.get('/edit', function (req, res) {
    handle_Edit(res, req.query);
});

app.get('/create', function (req, res) {
    return res.status(200).render("create");
});

app.post('/create', function (req, res) {
    const client = new MongoClient(mongourl);
        client.connect(function (err) {
            assert.equal(null, err);
            console.log("Connected successfully to the DB server.");
            const db = client.db(dbName);

            var document = {};
            document['name'] = req.body.name;
          //documents["hospitalID"] = req.body.hospitalID;
            document['department'] = req.body.department;
            document['phone'] = req.body.number;
            document['description'] = req.body.description;
            var addressdoc = {};
            addressdoc['city'] = req.body.city;
            if (req.body.street) {
                addressdoc['street'] = req.body.street;
            }
            document['address'] = addressdoc;
            console.log("...Putting data into document");

            document["hospitalID"] = generateHospitalID(); // Generate a unique hospital ID

            if (document.name) {
                console.log("...Creating the document");
                createDocument(db, document, function (docs) {
                    client.close();
                    console.log("Closed DB connection");
                    return res.status(200).render('info', { message: "Document is created successfully!" });
                });
            } else {
                client.close();
                console.log("Closed DB connection");
                return res.status(200).render('info', { message: "Invalid entry - Hospital name is compulsory!" });
            }
        });
});

app.post('/update', function (req, res) {
    var updatedocument = {};
    const client = new MongoClient(mongourl);
        client.connect(function (err) {
            assert.equal(null, err);
            console.log("Connected successfully to server");

            if (req.body.name) {
                updatedocument["hospitalID"] = req.body.hospitalID;
                updatedocument['name'] = req.body.name;
                updatedocument['department'] = req.body.department;
                updatedocument['phone'] = req.body.number;
                updatedocument['description'] = req.body.description;

            var addressdoc = {};
            addressdoc['city'] = req.body.city;
            if (req.body.street) {
                addressdoc['street'] = req.body.street;
            }
            updatedocument['address'] = addressdoc;

            let updateDoc = {};
                updateDoc['hospitalID'] = req.body.hospitalID;
                console.log(updateDoc);

                updateDocument(updateDoc, updatedocument, function (docs) {
                    client.close();
                    console.log("Closed DB connection");
                    return res.render('info', { message: "Document is updated successfully!" });
                });
            } else {
                return res.render('info', { message: "Invalid entry - Hospital name is compulsory!" });
            }
    });
});

app.get('/delete', function (req, res) {
    if (req.query.owner == req.session.userid) {
        console.log("...Hello!");
        handle_Delete(res, req.query);
    } else {
        return res.status(200).render('info', { message: "Access denied - You don't have access and deletion rights!" });
    }
});

app.get('/find', (req, res) => {
  res.render('find', { message: null });
});

// 处理表单提交的查找请求
app.post('/find', (req, res) => {
  const findName = req.body.findName;
  const findPhone = req.body.findPhone;

  // 在实际应用中，这里可以根据findName和findPhone执行查找操作

  const message = `Information found:<br><br>Name: ${findName}<br>Phone: ${findPhone}`;

  res.render('find', { message: message });
});

// 渲染display.ejs模板
app.post('/display', (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const address = req.body.address;
  const birth = req.body.birth;
  const allergies = req.body.allergies;
  const diseases = req.body.diseases;

  // 可以根据需要在这里执行其他逻辑，如将数据存储到数据库等

  res.render('display', {
    name: name,
    phone: phone,
    address: address,
    birth: birth,
    allergies: allergies,
    diseases: diseases,
    recordId: phone // 假设这里是记录的唯一标识符，用于删除操作
  });
});
});

// 渲染delete.ejs模板
app.get('/delete', (req, res) => {
  const deleteId = req.body.deleteId;

    res.render('delete');
});


// 设置EJS作为模板引擎
app.set('view engine', 'ejs');

// 使用body-parser中间件解析请求体
app.use(bodyParser.urlencoded({ extended: false }));

// 渲染homepage.ejs模板
app.get('/', (req, res) => {
  res.render('homepage', { message: null });
});

// 处理表单提交的更新请求
app.post('/create', (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const address = req.body.address;
  const allergies = req.body.allergies;
  const diseases = req.body.diseases;
  const birth = req.body.birth;

  // 在实际应用中，这里可以将更新的信息存储到数据库或进行其他操作

  const message = `Record has been created<br><br><br>Name: ${name}<br>Phone: ${phone}<br>address: ${address}<br>allergies: ${allergies}<br>diseases: ${diseases}<br>birth: ${birth}`;

  app.post('/update', (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const address = req.body.address;
  const allergies = req.body.allergies;
  const diseases = req.body.diseases;
  const birth = req.body.birth;

  // 在实际应用中，这里可以将更新的信息存储到数据库或进行其他操作

  const message = `Information has been updated<br><br>Name: ${name}<br>Phone: ${phone}<br>address: ${address}<br>allergies: ${allergies}<br>diseases: ${diseases}<br>birth: ${birth}`;

  res.render('homepage', { message: message });
});



// Restful
// Insert
app.post('/api/item', function (req, res) {
    if (req.params.hospitalID) {
        console.log(req.body);
        const client = new MongoClient(mongourl);
        client.connect(function (err) {
            assert.equal(null, err);
            console.log("Connected successfully to server");
            const db = client.db(dbName);
            let newDocument = {};

            newDocument['name'] = req.body.name;
            newDocument['department'] = req.body.department;
            newDocument['phone'] = req.body.number;
            newDocument['description'] = req.body.description;
            var addressdoc = {};
            addressdoc['city'] = req.body.city;
            if (req.body.street) {
                addressdoc['street'] = req.body.street;
            }
            newDocument['address'] = addressdoc;

            newDocument["hospitalID"] = generateHospitalID(); // Generate a unique hospital ID

            db.collection('hospitals').insertOne(newDocument, function (err, results) {
                assert.equal(err, null);
                client.close();
                res.status(200).end();
            });
        });
    } else {
        res.status(500).json({ "error": "missing hospital id" });
    }
});

// Find
app.get('/api/item/:id', function (req, res) {
    if (req.params.hospitalID) {
        let criteria = {};
        criteria['hospitalID'] = req.params.id;
        const client = new MongoClient(mongourl);
        client.connect(function (err) {
            assert.equal(null, err);
            console.log("Connected successfully to server");
            const db = client.db(dbName);

            findDocument(db, criteria, function (docs) {
                client.close();
                console.log("Closed DB connection");
                res.status(200).json(docs);
            });
        });
    } else {
        res.status(500).json({ "error": "missing hospital id" });
    }
});

// Delete
app.delete('/api/item/:id', function (req, res) {
    if (req.params.hospitalID) {
        let criteria = {};
        criteria['hospitalID'] = req.params.id;
        const client = new MongoClient(mongourl);
        client.connect(function (err) {
            assert.equal(null, err);
            console.log("Connected successfully to server");
            const db = client.db(dbName);

            db.collection('hospitals').deleteOne(criteria, function (err, results) {
                assert.equal(err, null);
                client.close();
                res.status(200).end();
            });
        });
    } else {
        res.status(500).json({ "error": "missing hospital id" });
    }
});

app.listen(app.listen(process.env.PORT || 8099));
