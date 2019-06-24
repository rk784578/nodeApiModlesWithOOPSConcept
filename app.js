

let REQURIED_MODULE = require('./public/services/nodemodules.js');

let app = REQURIED_MODULE.express();


// it will get process env varables 
//https://www.npmjs.com/package/dotenv
/**
 * For this crate a .env file and give the key and value  
 * Call the below  path it will  call the procee varabiles
 */
require('dotenv').config()
app.use(REQURIED_MODULE.cors())
app.use(REQURIED_MODULE.express.static(__dirname + '/public/uploads'));
app.use(REQURIED_MODULE.bodyParser.urlencoded({
  extended: true
}));

app.use(REQURIED_MODULE.bodyParser.json({ limit: '50mb' }));
// get the app environment from Cloud Foundry
let appEnv = REQURIED_MODULE.cfenv.getAppEnv();


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// our Angular code is sending JSON data, but your Express app is parsing it as
// URL encoded data.
app.use(REQURIED_MODULE.bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile('./public/index.html');
})

let routes = require('./public/routes/routes.js');

app.post('/signUp', routes.signUp);
app.get('/login', routes.login);
app.put('/update', routes.update);
app.get('/getAll', routes.getAll);
app.delete('/delete', routes.deleteRecord)
app.post('/createUserColletion', routes.createNewCollection)
app.get('/checkUserExists', routes.checkUserExists);
app.post('/geoFeatch', routes.geoCoords);
app.put('/activateUserEmail', routes.activateUserEmail);
app.get('/fetchUserbasedrecords', routes.fetchUserbasedRecords);

// image data
app.post('/uploadImage', routes.uploadImage);
app.get('/fetchEmpImages', routes.fetchEmpImagesData);

/**
 * Store installed app data
 * If the user is exits in the Db update with this data 
 * If not create and in the same Database 
 */

app.get('/fetchSimData', routes.simdata);
app.put('/updateSimData', routes.updateWithSimData);
app.post('/createNewSimdata', routes.createNewSimUser);


/**
 * GEo location  nae to coords 
 * convert names to geo location coords 
 */

app.get('/getGeoCoords', routes.convertGeoCords);
app.post('/StoreGeoLocation', routes.createNewCollection);
// this api will accept  collection name /  id 
app.get('/getGeoReportAsPerTheClient',routes.fetchUserbasedRecords)

// start server on the specified port and binding host
app.listen(8888, '0.0.0.0', function () {
  // app.listen(3000, 'localhost', function() { //test locally
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

