const mongoose = require('mongoose');

const book = mongoose.Schema({
    userid:{type:mongoose.Schema.Types.ObjectId,
        ref:"User",required:true},
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    genre:[
        {
            "BookTitle":{
                type:String,
                required:true
            },
            "BookGenreNo":{
                type:String,
                required:true
            },
            "PublicDate":{
                type:Date,
                required:true
            }
        }
    ],
    
    bcreatedby:{type: String, required: true},
    bmodifiedby:{type: String, required: true},
    bcreatedat:{type: Date, required: true},
    bmodifiedat:{type: Date, required: true}
})

module.exports = mongoose.model('Book',book);



// {
//     "userid":"667d1bc3ac362afca2ab6dee",
//     "title":"abc",
//     "author":"abc",
//     "genre":[
//         {
//             "BookTitle":"Abc1",
//             "BookGenreNo":"2",  
//             "PublicDate":"2024-06-27T14:00:00Z"
//             }
        
//     ],
     
//     "bcreatedby":"abc1",
//     "bmodifiedby":"abc1",
//     "bcreatedat":"2024-06-27T14:00:00Z",
//     "bmodifiedat":"2024-06-27T14:00:00Z"
// }




