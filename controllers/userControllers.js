
const userModel=require('../model/userModel');
const jwt=require('jsonwebtoken');

async function register(req, res) {
    try {
        const user = new userModel(req.body);
        await user.save();

return res.status(201).send({ user});
    } catch (err) {
        return res.status(500).send({ message: 'Server error', error: err });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
    
        const user = await userModel.findOne({ email });
          
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).send({ error: 'Invalid login credentials' });
        }
       
        console.log('User found:', user);
        
        const token = jwt.sign({ _id: user._id }, 'mukta', { expiresIn: '1h' });
        
        console.log('Generated token:', token);
        
        res.status(200).send({ user, token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}


module.exports={
    register,
    login
}



// {
//     "username":"abc",
//     "email":"abc@gmail.com",
//     "password":"abc",
//     "ucreatedat":"2024-06-27T14:00:00Z",
//     "umodifiedat":"2024-06-27T14:00:00Z"
// }