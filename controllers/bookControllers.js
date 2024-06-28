
const bookModel = require('../model/bookModel');


async function addbook(req, res) {
    try{
        const book = new bookModel(req.body);
        await book.save();
        res.status(201).send(book);
    }
    catch(err){
        res.status(500).send(err);
    }
}

async function getbook(req, res) {
    try{
        const book = await bookModel.find();
        return res.status(200).send(book);
    }
    catch(err){
        res.status(500).send(err);
    }
}


async function updatebook(req, res) {
    try{
        const book = await bookModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.status(200).send(book);
    }
    catch(err){
        res.status(500).send(err);
    }
}

async function deletebook(req, res) {
    try{
        const book = await bookModel.findByIdAndDelete(req.params.id);
        return res.status(200).send(book);
    }
    catch(err){
        res.status(500).send(err);
    }
}




module.exports = {
    addbook,
    getbook,
    updatebook,
    deletebook
}
