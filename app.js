
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiRouter = require('./router/api');
const File=require('./model/fileModel');
const app = express();
const multer=require('multer');



app.use(express.json());
app.use(bodyParser.json());



const storage=multer.diskStorage({
    destination:'./Uploads',
    filename :(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`);
    },
})
const upload=multer({storage});

app.post('/Uploads',upload.single('File'),async(req,res)=>{
    const {filename ,path, originalname, mimetype, size}=req.file;
    
    const newFile=new File({ filename ,path, originalname, mimetype, size});
    
    try{
        await newFile.save();
        res.status(201).send(`File Upload:${req.file.filename}`);
    
    }catch (err) {
        res.status(500).send(err);
    }
    
    });
    
    
    app.get('/download/:filename',async(req,res)=>{
        console.log(req.params)
        try{
            const file=await File.findOne({filename:req.params.filename});
            if(!file){
                return res.status(404).send('File Not Found');
            }
           res.download(file.path,file.originalname);
        } catch(err){
            res.status(500).send(err);
        }
    
    });

    
    mongoose.connect('mongodb://localhost:27017/Book-Management')

const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});


database.once('connected', () => {
    console.log('Connected to  Mongodb');
});

app.use('/api', apiRouter);
app.listen(5000, () => {
    console.log('Server is running on port http://127.0.0.1:5000');
});

