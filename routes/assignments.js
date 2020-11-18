const router = require('express').Router();
const app = express();
const multer = require('multer');
let Student = require('../models/students.model');

app.use(express.json());

// code for the ssh one

/*var Client = require('ssh2').Client;
var connection = new Client();

var Client = require('ssh2').Client;
var connSettings = {
     host: 'myserver-direction.com',
     port: 22, // Normal is 22 port
     username: 'myUsername',
     password: 'myPassword'
     // You can use a key file too, read the ssh2 documentation
};

router.route('/downloadassignment').post((req, res) => {
     var conn = new Client();
     conn.on('ready', function() {
         conn.sftp(function(err, sftp) {
              if (err) throw err;
              var moveFrom = "/remote/file/path/file.txt";
              var moveTo = "/local/file/path/file.txt";

              sftp.fastGet(moveFrom, moveTo , {}, function(downloadError){
                  if(downloadError) throw downloadError;

                  console.log("Assignment Downloaded");
               });
          });
     }).connect(connSettings);

     conn.save()
         .then(() => res.json())
         .catch(err => res.status(400).json('Error' + err));
 });*/

var storage = multer.diskStorage({
     destination: function(req, file, callback){
          callback(null, './Files');
     },
     filename: function(req, file, callback){
          callback(null, file.fieldname + "_" + Date.now() + file.originalname);
     }
});

var upload = multer({
     storage: Storage
}).array('fileUploader', 3);

app.post('/assignmenupload', function(req, res){
     upload(req, res, function(err){
          if(err){
               return res.end('Something went wrong.');
          }
          return res.end('Assignment Uploaded Successfully :)');
     });
});

