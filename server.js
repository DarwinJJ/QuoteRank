var express = require( "express");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// require path
var path = require("path");
app.use(express.static(path.join(__dirname, './client/dist')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

//require mongoose
var mongoose = require("mongoose");
//connect to database 
mongoose.connect('mongodb://localhost/QuoteRank');
mongoose.Promise = global.Promise;

//create schema, create model in one page
let Schema = mongoose.Schema;
let AuthorSchema = new mongoose.Schema({
    name: {type: String, require: true, minlength: 3},
    quotes: [{
        text: {type:String, minlength:5},
        votes: {type:Number, default:0} } ]},
    {timestamps:true});

let Author = mongoose.model("Author", AuthorSchema);

//routes
//root request
//get all author 
app.get('/authors', function(req, res){
    Author.find({}, function(err, authors){
        if(err){
            console.log("Error authors");
            console.log(err)
            res.json({message: "Error", error: err});
        }
        //console.log('posts:', posts)
        res.json({message:"Success", data:authors});
    })
})

//get one author
app.get('/authors/:id', function(req, res){
    console.log("get one")
    Author.findOne({_id: req.params.id}, function(err, author){
        if(err){
            console.log('Error authors');
            res.json({message:"Error", error: err})
        }else{
            console.log('Successfully get a author');
            res.json({message: "Success", data: author});
        }
    })
})
//create new author
app.post('/authors', function(req, res){
    console.log(req.body)
    var author = new Author({name:req.body.name, desc:req.body.desc});
    //save new author to the database
    author.save(function(err){
        if(err){
            console.log('Error save the new author');
            res.json({message: "Error", error:err})
        }else{
            console.log('Successfully to add a author');
            res.json({message: "Success", data: author});
        }
    })
})
//update an author
app.put('/authors/:id', function(req, res){
    Author.findOneAndUpdate({_id: req.params.id},
    {$set: {name: req.body.name, quotes: req.body.quotes}},
        null, function(err){
        if(err){
            console.log('Error during updates');
            res.json({message:"Error", error:err})
        }else{
            console.log('Successfully to update the author');
            res.json({message: "Success"});
        }
    })
})

//delete author
app.delete('/authors/:id', function(req, res){
    Author.deleteOne({_id:req.params.id}, function(err){
        if(err){
            console.log('Error during the delete');
            res.json({message: "Error", error:err})
        }else{
            console.log('Successfully to delete the author');
            res.json({message: "Success"});
        }
    })
})

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./client/dist/index.html"))
});

app.listen(8000, function(){
    console.log("listening on port 8000");
})




   
