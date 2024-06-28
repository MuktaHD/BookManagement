const express=require ('express');
const router = express.Router();
const userControllers=require('../controllers/userControllers');
const bookControllers=require('../controllers/bookControllers');
const reviewControllers=require('../controllers/reviewControllers');
const bookModel=require('../model/bookModel');
const auth=require('../middleware/auth');

router.post('/register',userControllers.register);
router.post('/login',userControllers.login);


router.post('/addBook',bookControllers.addbook);
router.get('/getbookWithAuth',auth,async(req,res)=>{

    try{
        const book = await bookModel.find();
        return res.status(200).send(book);
    }
    catch(err){
        res.status(500).send(err);
    }
}
);
router.get('/getBook',bookControllers.getbook);

router.put('/updateBook/:id',bookControllers.updatebook);

router.delete('/deleteBook/:id',bookControllers.deletebook);

router.post('/addreview/:id',reviewControllers.addreview);
router.get('/getreview/:id',reviewControllers.getreview);

module.exports=router;