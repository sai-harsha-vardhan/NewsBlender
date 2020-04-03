var http=require('http');
var express=require('express');
var bodyparser=require('body-parser');
var MongoClient=require('mongodb').MongoClient;
var urlencoded=bodyparser.urlencoded({extended:true});
var sentiment = require('sentiment');
var sentiment = new sentiment();
var fs = require('fs');
var bcrypt = require('bcrypt');
var jwt   = require('jsonwebtoken');
var port = process.env.PORT || 3000;

var app=express();
app.set('view engine', 'ejs');
app.set("views",__dirname);

var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));

app.get('/',function(req,res){
    res.render("home",{g:0,l:0,i:0,nu:0,usex:0});
})

app.post("/profileview",function(req,res){
    res.sendFile(__dirname+"/profileview.html");
})

app.get("/postnews",function(req,res){
    res.render("postnews",{p:0});
})

app.post('/trending',urlencoded,function(req,res){
    MongoClient.connect('mongodb+srv://harsha:harsha@harsha1-ashl9.mongodb.net/test?retryWrites=true&w=majority',function(err,db){
         if(err) throw err;
         var db=db.db('newslogindb');
        db.collection('news').find({}).toArray(function(err,result){
            if (err) throw err;
            res.render("index",{news:result,setc:0,sgn:0,user:{name:"",email:"",hearts:null,articles:null,current:'trending1'}});
        })
    })
})

app.post('/entertainment',urlencoded,function(req,res){
    MongoClient.connect('mongodb+srv://harsha:harsha@harsha1-ashl9.mongodb.net/test?retryWrites=true&w=majority',function(err,db){
        var q = {category:"e"};
         if(err) throw err;
         var db=db.db('newslogindb');
        db.collection('news').find(q).toArray(function(err,result){
            if (err) throw err;
            res.render("index",{news:result,setc:0,sgn:0,user:{name:"",email:"",hearts:null,articles:null,current:"entertainment1"}});
        })
    })
})

app.post('/business',urlencoded,function(req,res){
    MongoClient.connect('mongodb+srv://harsha:harsha@harsha1-ashl9.mongodb.net/test?retryWrites=true&w=majority',function(err,db){
        var q = {category:"b"};
         if(err) throw err;
         var db=db.db('newslogindb');
        db.collection('news').find(q).toArray(function(err,result){
            if (err) throw err;
            res.render("index",{news:result,setc:0,sgn:0,user:{name:"",email:"",hearts:null,articles:null,current:"business1"}});
        })
    })
})

app.post('/sports',urlencoded,function(req,res){
    MongoClient.connect('mongodb+srv://harsha:harsha@harsha1-ashl9.mongodb.net/test?retryWrites=true&w=majority',function(err,db){
        var q = {category:"s"};
         if(err) throw err;
         var db=db.db('newslogindb');
        db.collection('news').find(q).toArray(function(err,result){
            if (err) throw err;
            res.render("index",{news:result,setc:0,sgn:0,user:{name:"",email:"",hearts:null,articles:null,current:"sports1"}});
        })
    })
})

app.post('/international',urlencoded,function(req,res){
    MongoClient.connect('mongodb+srv://harsha:harsha@harsha1-ashl9.mongodb.net/test?retryWrites=true&w=majority',function(err,db){
        var q = {category:"i"};
         if(err) throw err;
         var db=db.db('newslogindb');
        db.collection('news').find(q).toArray(function(err,result){
            if (err) throw err;
            res.render("index",{news:result,setc:0,sgn:0,user:{name:"",email:"",hearts:null,articles:null,current:"international1"}});
        })
    })
})

app.post('/national',urlencoded,function(req,res){
    MongoClient.connect('mongodb+srv://harsha:harsha@harsha1-ashl9.mongodb.net/test?retryWrites=true&w=majority',function(err,db){
        var q = {category:"n"};
         if(err) throw err;
         var db=db.db('newslogindb');
        db.collection('news').find(q).toArray(function(err,result){
            if (err) throw err;
            res.render("index",{news:result,setc:0,sgn:0,user:{name:"",email:"",hearts:null,articles:null,current:"national1"}});
        })
    })
})

app.post('/technology',urlencoded,function(req,res){
    MongoClient.connect('mongodb+srv://harsha:harsha@harsha1-ashl9.mongodb.net/test?retryWrites=true&w=majority',function(err,db){
        var q = {category:"t"};
         if(err) throw err;
         var db=db.db('newslogindb');
        db.collection('news').find(q).toArray(function(err,result){
            if (err) throw err;
            res.render("index",{news:result,setc:0,sgn:0,user:{name:"",email:"",hearts:null,articles:null,current:"technology1"}});
        })
    })
})

app.post('/crime',urlencoded,function(req,res){
    MongoClient.connect('mongodb+srv://harsha:harsha@harsha1-ashl9.mongodb.net/test?retryWrites=true&w=majority',function(err,db){
        var q = {category:"c"};
         if(err) throw err;
         var db=db.db('newslogindb');
        db.collection('news').find(q).toArray(function(err,result){
            if (err) throw err;
            res.render("index",{news:result,setc:0,sgn:0,user:{name:"",email:"",hearts:null,articles:null,current:"crime1"}});
        })
    })
})

app.post('/registerdo',urlencoded,function(req,res){
    var a=req.body.input0;
    var b=req.body.input3;
    var c=req.body.input4;
    var d=req.body.input5;
    var count = 0;
    bcrypt.hash(d, 10, function(err, hash) {
        var newpwd = hash;
        details={
            user:a,email:b,number:c,password:newpwd,hearts:count,articles:count,img:""
        };
            MongoClient.connect('mongodb+srv://harsha:harsha@harsha1-ashl9.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true },function(err,db){
            if(err) throw err;
            var db=db.db('newslogindb');
            query={email:b};
                db.collection('users').find(query).toArray(function(err,result){
                    if(result[0]){
                        res.render("home",{g:0,l:0,nu:0,i:0,usex:1});
                    }
                    else{
                        db.collection('users').insertOne(details,function(err,result){
                        if(err) throw err;
                        MongoClient.connect('mongodb+srv://harsha:harsha@harsha1-ashl9.mongodb.net/test?retryWrites=true&w=majority',function(err,db){
                            if(err) throw err;
                            var db=db.db('newslogindb');
                            db.collection('news').find({}).toArray(function(err,result){
                                if (err) throw err;
                                result.current = "trending1";
                                res.render("index",{news:result,setc:1,sgn:1,user:details});
                            })
                        });
                    });
                }
            });
        });
    });
});

app.post('/logindo',urlencoded,function(req,res){
        var a=req.body.input1;
        var b=req.body.input2;
        var q = {email:a};
        MongoClient.connect('mongodb+srv://harsha:harsha@harsha1-ashl9.mongodb.net/test?retryWrites=true&w=majority',function(err,db){
                if(err) throw err;
                var db=db.db('newslogindb');
            db.collection("users").findOne(q, function(err, result) {
                if(result){
                    var hash = result.password;
                    bcrypt.compare(b, hash, function(err, res1) {
                        if(res1) {
                                db.collection('news').find({}).toArray(function(err,result1){
                                    if (err) throw err;
                                    result.current = "trending1";
                                    res.render("index",{news:result1,setc:1,sgn:0,user:result});
                                })
                        }
                        else {
                            res.render("home",{g:0,l:0,i:1,nu:0,usex:0});
                        } 
                    }); 
                }
                else{
                    res.render("home",{g:0,l:0,nu:1,i:0,usex:0});
                }
        });
    });
})

app.post('/google',urlencoded,function(req,res){
        var a = req.body.input10;
        var b = req.body.input11;
        var c = req.body.input12;
        var q = {email:b};
        var count = 0;
        MongoClient.connect('mongodb+srv://harsha:harsha@harsha1-ashl9.mongodb.net/test?retryWrites=true&w=majority',function(err,db){
                if(err) throw err;
                var db=db.db('newslogindb');
            db.collection("users").findOne(q, function(err, result) {
                if(result){
                    db.collection('news').find({}).toArray(function(err,result1){
                        if (err) throw err;
                        result.current = "trending1";
                        res.render("index",{news:result1,setc:1,user:result,sgn:0});
                    })
                    if(!result.img){
                        var details=  {$set:{
                            user:result.user,email:result.email,number:result.number,password:result.password,hearts:result.hearts,articles:result.articles,img:c
                        }};
                        db.collection("users").updateOne({email:b}, details, function(err, res) {
                            if (err) throw err;
                        });
                        console.log("Image Updated");
                    }
                    
                }
                else{
                     details={
                        user:a,email:b,number:"",password:"",hearts:count,articles:count,img:c
                    };
                    db.collection('users').insertOne(details,function(err,result){
                        if(err) throw err;
                    });    
                    db.collection('news').find({}).toArray(function(err,result){
                        if (err) throw err;
                        result.current = "trending1";
                        res.render("index",{news:result,setc:1,user:details,sgn:1});
                    })
                }
        });
    });
})

app.post('/logout',urlencoded,function(req,res){
   var g = req.body.g;
   res.render("home",{g:g,l:1,i:0,nu:0,usex:0});
})

app.get("/increase",function(req,res){
    var count = req.query.count;
    var author = req.query.author;
    var title = req.query.title;
    MongoClient.connect('mongodb+srv://harsha:harsha@harsha1-ashl9.mongodb.net/test?retryWrites=true&w=majority',function(err,db){
         if(err) throw err;
         var db=db.db('newslogindb');
         var newvalues = { $set: {hearts: count } };
          db.collection("news").updateOne({title:title}, newvalues, function(err, res) {
                if (err) throw err;
            });
            var q = {user:author};
            db.collection('users').find(q).toArray(function(err,result){
                    if (err) throw err;
                    h = result[0].hearts;
                    h++;
                    var newvalues1 = { $set: {hearts: h } };
                db.collection("users").updateOne(q, newvalues1, function(err, res) {
                    if (err) throw err;
                });    
            });
        });
})

app.get("/decrease",function(req,res){
    var count = req.query.count;
    var author = req.query.author;
    var title = req.query.title;
    MongoClient.connect('mongodb+srv://harsha:harsha@harsha1-ashl9.mongodb.net/test?retryWrites=true&w=majority',function(err,db){
         if(err) throw err;
         var db=db.db('newslogindb');
         var newvalues = { $set: {hearts: count } };
          db.collection("news").updateOne({title:title}, newvalues, function(err, res) {
                if (err) throw err;
            });
            var q = {user:author};
            db.collection('users').find(q).toArray(function(err,result){
                    if (err) throw err;
                    h = result[0].hearts;
                    h--;
                    var newvalues1 = { $set: {hearts: h } };
                db.collection("users").updateOne(q, newvalues1, function(err, res) {
                    if (err) throw err;
                });    
            });
        });
})


app.get("/add",function(req,res){
    var title = req.query.title;
    var comment = req.query.comment;
    if(comment!=""){
        var s,p,n,pper,nper;
        var result = sentiment.analyze(comment);
        var num = Object.values(result)[0];
        MongoClient.connect('mongodb+srv://harsha:harsha@harsha1-ashl9.mongodb.net/test?retryWrites=true&w=majority',function(err,db){
            if(err) throw err;
            var db=db.db('newslogindb');
            q={title:title};
            db.collection('news').find(q).toArray(function(err,result){
                        if (err) throw err;
                        p = result[0].positive;
                        n = result[0].negative;
                        var arr = result[0].comments;
                        if(num<0){
                            s=0;
                            n++;
                        }
                        else{
                            s=1;
                            p++;
                        }
                        pper = Math.round((p/(p+n))*100,2);
                        nper = 100 - pper;
                        arr.push(comment);
                        var newvalues1 = { $set: {ppercent: pper , npercent:nper,comments:arr,positive:p,negative:n} };
                    db.collection("news").updateOne(q, newvalues1, function(err, res) {
                        if (err) throw err;
                    }); 
                    pper = pper.toString();
                    res.send(pper);
            });
    })
    }
})

app.post('/postdb',urlencoded,function(req,res){
    var title = req.body.title;
    var url = req.body.url;
    var type = req.body.sel1;
    var news = req.body.news;
    var user = req.body.user;
    MongoClient.connect('mongodb+srv://harsha:harsha@harsha1-ashl9.mongodb.net/test?retryWrites=true&w=majority',function(err,db){
        if(err) throw err;
         var db=db.db('newslogindb');
    var newsset = {user:user,title:title,news:news,img:url,votes:0,comments:[],positive:0,negative:0,ppercent:0,npercent:0,category:type,hearts:0};
    db.collection('news').insertOne(newsset,function(err,result){
        if(err) throw err;
    })
    q = {user:user};
    db.collection("users").findOne(q, function(err, result) {
        var art = result.articles;
        art = art+1;
            var newvalues1 = { $set: {articles:art} };
        db.collection("users").updateOne(q, newvalues1, function(err, result) {
            if(err) throw err;
            res.render("postnews",{p:1});
        })
        // res.send(result);
    })
    })
})

app.get("/details",function(req,res){
    var user = req.query.email;
    q = {user:user};
    MongoClient.connect('mongodb+srv://harsha:harsha@harsha1-ashl9.mongodb.net/test?retryWrites=true&w=majority',function(err,db){
        if(err) throw err;
         var db=db.db('newslogindb');
    db.collection("users").findOne(q, function(err, result) {
        data = result.articles+"$"+result.hearts+"$"+result.img;
        res.send(data);
    })
    })
})

// app.post('/sentiment',urlencoded,function(req,res){
//     var a = req.body.review;
//     var result = sentiment.analyze(a);
//     var num = Object.values(result)[0];
//     if(num<0){
//         res.send("negative");
//     }
//     else if(num==0){
//         res.send("neutral");
//     }
//     else{
//         res.send("positive");
//     }
//     //res.sendFile(__dirname+'/'+'index.html');
// })



app.listen(port);