const express=require("express");
const app=express();
let port=3000;
const path=require("path");
//delete,patch,put
const methodOverride=require("method-override");

//uuid
const {v4:uuidv4}=require("uuid");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.use(methodOverride('_method'));     //DELETE & PATCH

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));

let posts=[
    {
     id:uuidv4(),   
    username:"sarath2027",
    content:"Hello Everyone, I am very Happy to share my views with you all.."
    },
    {
    id:uuidv4(),
    username:"Mahii143",
    content:"Hey guys I would like to share all beauty tips with my followers"
    },
    {
    id:uuidv4(),
    username:"sheshu111",
    content:"Hello everyone..I am Here to chill,...."
    }
];
app.get("/posts",(req,res)=>{           //POSTS Page
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{       //CREATE 
    res.render("new.ejs");
});
app.post("/posts",(req,res)=>{          //CREATE
    let id =uuidv4();
    let {username,content}=req.body;
    posts.push({id,username,content});
    res.redirect("/posts");
});

app.patch("/posts/:id",(req,res)=>{     //UPDATE
    let {id}=req.params;
    let newcontent=req.body.content;
    let post=posts.find((p)=>id===p.id);
    post.content=newcontent;
    res.redirect("/posts");
});
app.get("/posts/:id/edit",(req,res)=>{      //EDIT
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
});
app.get("/posts/:id",(req,res)=>{           //READ
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("show.ejs",{post});
})

app.delete("/posts/:id",(req,res)=>{         //DELETE
    let {id}=req.params;
    posts=posts.filter((p)=>id !==p.id);
    res.redirect("/posts");
});
app.listen(port,()=>{                       //PORT INITIATION
    console.log("app is listening...");
})