
const express=require('express');
const router=express.Router();
    const multer = require('multer');
    const uuidv4 = require('uuid/v4');
    const path = require('path');
    const fs = require('fs')
    // configure storage

    

    var FileName='';
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        /*
          Files will be saved in the 'uploads' directory. Make
          sure this directory already exists!
        */
        cb(null, './uploads');
      },
      filename: (req, file, cb) => {
       
        const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, newFilename);
         FileName=newFilename;
      },
    });
    // create the multer instance that will be used to upload/save the file
    const upload = multer({ storage });


    router.post('/upload', upload.single('selectedFile'), (req, res) => {
      res.status(201).json(FileName);
    });


    router.get('/dwonload/:file', (req,res,next)=>{
    var file = __dirname +`../../../uploads/${req.params.file}`;

    res.status(200).download(file); // Set disposition and send it.
    
  });




  function countAllFiles(dir){
    var fs = fs || require('fs'),
        files = fs.readdirSync(dir);
    var filelist =[];
    files.forEach(function(file) {
      if (fs.statSync(dir + file).isDirectory()) {
        filelist = walkSync(dir + file + '/', filelist);
      }
      else {
        filelist.push(file);
      }
    });
    return filelist;
  };


router.get('/allFiles',(req,res)=>{
  var allFiles=countAllFiles(__dirname +`../../../uploads/`);
  res.status(202).send(allFiles)
})


router.delete('/delete/:id',(req,res)=>{

var filePath =__dirname +`../../../uploads/${req.params.id}`; 
fs.unlinkSync(filePath);
res.status(202).end()
})


module.exports=router;