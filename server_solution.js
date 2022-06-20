const express = require('express');

// Constants
const path = require('path');
const os = require('os');
const scriptName = path.basename(__filename);
const message = "Bootcamp with PRGM";
const hostname = 'localhost';
const hostName = os.hostname();
const port = 8080;

// App
const app = express();
app.set('port', port);


//connect to mongo client 
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://mongodb:27017/';
const db = new MongoClient(url);
MongoClient.connect(url, function(err, db) {
if (err) throw err;
if (db !== null) console.log('database is conected');
});



// Get DateTime, timezone and offset 
const date = new Date()
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
var offset_minutes = date.getTimezoneOffset();
if (offset_minutes <= 0) {
  var offset = "UTC+" + (offset_minutes/-60).toString();
}
else {
  var offset = "UTC" + (offset_minutes/-60).toString();
}


// GET method route
// Retrieve all documents in collection

app.get('/',  (req, res) => {
  MongoClient.connect(url, async (err, db) => {
  if (err) throw err;
  var dbo = db.db("my-test-db");
  const findResult = await dbo.collection("calls").find({}).toArray();
  res.status(200).send(findResult);
  console.log('Found documents =>', findResult);
  console.log(`Successfully found ${findResult.length} documents.`)
  })
});

// POST method route //insert a object in to db
  app.post('/', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("my-test-db");
        var myobj = { message: message, 
                      scope: scriptName, 
                      host: hostName, 
                      date: date , 
                      location: timezone, 
                      offset: offset
                    };
    dbo.collection("calls").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log(myobj);
      console.log(`Document inserted in database.`);
     // db.close();
    });
  
    res.status(201).send(myobj);
  });
  
});

// GET method route Secret function 
    app.get('/secret', function (req, res, next) {
    res.send('Never be cruel, never be cowardly. And never eat pears!');
    console.log('This is a console.log message.');
});


// GET method route
// Query by hostname
// ...

  app.get('/find',  (req, res) => {
  const query =(req.query)
  console.log(query);
  
  MongoClient.connect(url, async (err, db) => {
  if (err) throw err;
  var dbo = db.db("my-test-db").collection("calls");
  console.log(query);
  const filteredDocs = await dbo.find(query).toArray();
  if ( filteredDocs.length === 0 )  {
        res.status(204).send('No Content');
        console.log(query,'Search Not found');
                        
  }else{
         console.log(`Successfully found ${filteredDocs.length} documents.`);
          res.send(filteredDocs);
       }
  
  }); 
});
/* PUT method. Modifying the message based on host. 
If not found, create a new document in the database. (201 Created)
If found, message, date and offset is modified (200 OK) */
// ...
app.put ('/put',  (req, res) => {
  const queryPut =(req.query)
  console.log(queryPut);
    // if to not make an empty search 
  if ( Object.entries(queryPut).length !== 0  ) {

    MongoClient.connect(url, async (err, db) => {
    if (err) throw err;
    var dbo = db.db("my-test-db").collection("calls");
    const findPut = await dbo.find(queryPut).toArray();

   if ( findPut.length === 0 )  {

      dbo.insertOne(queryPut, function(err, res) {
      if (err) throw err;
      console.log(queryPut);
      console.log('Document Created');
    });
    res.status(201).send(queryPut);  
                        
  }else{

        const update = {
        "$set": {
                "message": "Document updated",
                "note": "updates",
                "category": "toys"
               }
        };
        // Return the updated document instead of the original document
          const options = { new: true };
          const updatedDocument = await dbo.findOneAndUpdate(queryPut, update, options);
          console.log('Successfully updated document: ');
          console.log(updatedDocument);
          res.status(200).send(updatedDocument);
       }
  }); 
}else{

     res.status(204).send('No Content');
     console.log ('Empty Search');
    }
});

/* DELETE method. Modifying the message based on hostname. 
If not found, do nothing. (204 No Content)
If found, document deleted (200 OK) */
app.delete('/delete',  (req, res) => {

  const queryDelete =(req.query);
  console.log(queryDelete);
  MongoClient.connect(url, async (err, db) => {
  if (err) throw err;
  var dbo = db.db("my-test-db").collection("calls");
  
  
  // if ,to not make an empty search 
  if ( Object.entries(queryDelete).length !== 0  )  {

    const filteredDocs = await dbo.find(queryDelete).toArray();

    console.log(`Successfully found ${filteredDocs.length} documents.`);

    const deleteResult = await dbo.deleteMany(queryDelete);
    console.log('Deleted documents =>', deleteResult);
    res.status(200).send(filteredDocs)

    
                        
  }else{

    res.status(204).send('No Content');
    console.log ('Empty Search');
    
    }
 
  });
});

// start the SERVER !!! 
app.listen(port, ( ) => {
  console.log('server on port: ', app.get('port'));
});