const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors")
const bcrypt=require("bcrypt")
const UserModel=require("./model/User")
const OptionModel=require("./model/Option");
const jwt=require("jsonwebtoken")
const cookieParser=require('cookie-parser');
const fetch=(...args)=>
        import('node-fetch').then(({default:fetch})=>fetch(...args));
const bodyParser=require('body-parser');

const CLIENT_ID="41380882353b3c3a2910";
const CLIENT_SECRET="c29243f5a8aadf2c39e2f00863e094d087d8775d";



const app=express();

app.use(express.json());
app.use(cors(
    {
        origin:["http://localhost:3001"],
        methods:["GET","POST"],
        credentials:true
    }
));
app.use(bodyParser.json()) 
app.use(cookieParser());

mongoose.connect("mongodb://localhost:27017/XeroCodee");

const verifyUser=(req,res,next)=>{
    const token=req.cookies.token;
    console.log(token);
    if(!token){
        return res.json("The token was not available")
    }else{
        jwt.verify(token,"jwt-secret-key",(err,decoded)=>{
            if(err){
                return res.json("Token is wrong")
                next()
            }
        })
    }
}

app.get('/getAccessToken', async (req,res)=>{
    console.log(req.query.code);
    const params="?client_id="+CLIENT_ID+"&client_secret="+CLIENT_SECRET+"&code="+req.query.code;
    await fetch("https://github.com/login/oauth/access_token"+params,{
        method:"POST",
        headers:{
            "Accept":"application/json"
        }
    }).then((response)=>{
        return response.json()
    }).then((data)=>{
        console.log(data);
        res.json(data);
    })
})

app.get('/getUserData', async(req,res)=>{
    const authorizationHeader=req.get("Authorization");
    await fetch("https://api.github.com/user",{
        method:"GET",
        headers:{
            "Authorization": authorizationHeader
        }

    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        console.log(data);
        res.json(data);
    })
})

app.post('/saveOption', (req, res) => {
    
    const { selectedOption } = req.body;
    console.log('Request body:', req.body);
    console.log('Received selected option:', selectedOption);
    if (selectedOption) {
        const newOption = new OptionModel({
            
            selectedOption
        });

        newOption.save()
            .then(savedOption => {
                console.log('Option saved:', savedOption);

                res.json(savedOption);
            })
            .catch(err => {
                console.error('Error saving option:', err);
                res.status(500).json('Error saving option');
            });
    } else {
        res.status(400).json('Selected option is missing');
    }
});


app.get('/welcome',verifyUser,(req,res)=>{
    return res.json()
})

app.post('/login',(req,res)=>{
    const {email,password}=req.body;
    UserModel.findOne({email:email}) 
    .then(user=>{
        if(user){
            bcrypt.compare(password,user.password,(err,response)=>{
                
                if(response){
                    const token=jwt.sign({email:user.email},"jwt-secret-key",{expiresIn:"1d"})
                    res.cookie("token",token);
                    res.json("Success");
                }else{
                    res.json("Password is incorrect")
                }
            })
            
        }else{
            res.json("No record exist")
        }
    })
})

app.post('/register',(req,res)=>{
    const {firstname,lastname,email,password,confirmPassword}=req.body;
    bcrypt.hash(password,10)
    .then(hash=>{
        UserModel.create({firstname,lastname,email,password: hash,confirmPassword: hash})
        .then(user => {
            // Assuming you have a "selectedOption" property in the request body
            const selectedOption = req.body.selectedOption;

            if (selectedOption) {
                const newOption = new OptionModel({
                    userId: user._id,
                    selectedOption
                });

                newOption.save()
                    .then(() => {
                        res.json("User registered and option saved");
                    })
                    .catch(err => {
                        console.error("Error saving option:", err);
                        res.status(500).json("Error saving option");
                    });
            } else {
                res.json("Selected option is missing");
            }
        })
        .catch(err => res.json(err));
})
.catch(err => console.log(err.message));
});
    



app.listen(5000,()=>{
    console.log("server is running");
})