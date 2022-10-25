const ApiController = require("./Api-controller");
const mysql = require("mysql2");
const dal = require("../models/dal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v1: uuidv1 } = require("uuid");
const saltround = 10;

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
   port: process.env.DB_PORT,
});

async function homePage(req, res) {
    var apiData = await ApiController.headlines();
    if (apiData.status == "ok") {
      
        res.render("home", {
          data: apiData.articles,
          
          user: false,
        });
      
      
    } else {
      res.render("offline");
    }
}

async function HomePage(req, res) {
  console.log(req.user)
    var apiData = await ApiController.headlines();
    if (apiData.status == "ok") {
      var category = new Promise((success,failure)=>{
        con.query('select categoryId,categoryName from category where id=?',req.user.user_id,(err,results)=>{
          console.log(results)
          if(err){
            failure(err);
          }else{
            success(results);
          }
        })
      });

      var bookmarks = new Promise((success,failure)=>{
        con.query('select c.id, c.categoryId, c.categoryName, b.categoryId,b.bookmarkId,b.url,b.title from category c inner join bookmark b where c.categoryId=b.categoryId and id=?',req.user.user_id,(err,results)=>{
          if(err){
            failure(err);
          } else {
            success(results);
          }
        })
      })
      Promise.all([category,bookmarks]).then(async (result)=>{
        
        console.log(bookmarks)
        res.render("home", {
          data: apiData.articles,
          user: req.user,
          category:result[0],
          bookmarks:result[1]
        });
      })
      
    } else {
      res.render("offline");
    }
  
}

async function getCategory(req, res) {
  var category = req.params.category;
  var apiData = await ApiController.category(category);
  console.log(apiData);
  if (apiData.status == "ok") {
    res.render("category", {
      data: apiData.articles,
      category,
      user: false,
    });
  } else {
    res.render("offline");
  }
}

async function GetCategory(req, res) {
  var category = req.params.category;
  var apiData = await ApiController.category(category);
  console.log(apiData);
  if (apiData.status == "ok") {
    con.query('select categoryId,categoryName from category where id=?',req.user.user_id,(err,results)=> {
      res.render("category", {
        data: apiData.articles,
        category,
        categories: results,
        user: req.user
      });
    });
    
  } else {
    res.render("offline");
  }
}

async function searchNews(req, res) {
  console.log(req.body);
  var query = req.body.search;
  var apiData = await ApiController.searchByName(query);

  if (apiData.status == "ok") {
    res.render("search", {
      data: apiData.articles,
      user:false
    });
  } else {
    res.render("offline");
  }
}


async function SearchNews(req, res) {
  console.log(req.body);
  var query = req.body.search;
  var apiData = await ApiController.searchByName(query);
  
  if (apiData.status == "ok") {
    con.query('select categoryId,categoryName from category where id=?',req.user.user_id,(err,results)=> {
    res.render("search", {
      data: apiData.articles,
      user:req.user,
      category:results
    });
  })
  } else {
    res.render("offline");
  }
}

async function getSignup(req, res) {
  var message = "";
  res.render("signup", {
    message,
  });
}

async function addSignUp(req, res) {
  var { username, email, password, cpassword } = req.body;
  var id = uuidv1();
  con.query(
    "select email from user where email=?",
    email,
    async (err, results) => {
      console.log(results);
      if (results.length != 0) {
        let message = "user already exist";
        return res.render("signup", {
          message,
        });
      } else if (password != cpassword) {
        let message = "passwords do not match";
        return res.render("signup", {
          message,
        });
      }
      var Password = await bcrypt.hash(password, saltround);
      con.query(
        "INSERT INTO user (username,email,password,id) values (?,?,?,?)",
        [username, email, Password, id],
        (err) => {
          if (err) throw err;
          return res.redirect("/signin");
        }
      );
    }
  );
}

async function getSignIn(req, res) {
  let message = "";
  res.render("signin", {
    message,
  });
}

async function SignIn(req, res) {
  var { email, password } = req.body;
  con.query(
    "select username,id,password from user where email=?",
    [email],
    async (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        const comparison = await bcrypt.compare(password, results[0].password);
        if (comparison) {
          const token = jwt.sign(
            {
              user_name: results[0].username,
              user_id: results[0].id,
            },
            process.env.TOKEN_KEY,
            {
              expiresIn: "30min",
            }
          );
          res.cookie("token", token);
          res.redirect("/myhome");
        } else {
          let message = "wrong username or password";
          res.render("signin", {
            message,
          });
        }
      }
    }
  );
}

async function logout(req, res) {
  res.clearCookie("token");
  res.redirect("/signin");
}

function myProfile(req, res) {
  con.query(
    "select username, email from user where id=?",
    req.user.user_id,
    (err, results) => {
      console.log(results);
      res.render("user", {
        user:req.user,
        results,
      });
    }
  );
}

function makeBookmark(req, res) {
  var url = req.params[0];
  var cId = req.params.cid; 
  var title = req.body.title;
  console.log(url);
  console.log(cId);
  var bookmarkid = uuidv1();
  var id = req.user.user_id;
  con.query(
    "insert into bookmark (categoryId,bookmarkid,url,title) values (?,?,?,?)",
    [cId, bookmarkid, url,title],
    (err) => {
      if (err) throw err;
      // res.redirect("/myHome");
      res.status(204).send();
    }
  );
}

async function addCategory(req,res){
  var userId = req.user.user_id
  var categoryId =uuidv1();
  var category = req.body.category;
  con.query('insert into category (id,categoryId,categoryName) values (?,?,?)',[userId,categoryId,category],(err,results)=>{
    res.redirect('/bookmarks')
  })
}

async function bookmarks(req, res) {
  console.log(req.user.user_id);
  const category = new Promise((success,failure)=>{
    con.query('select id, categoryId, categoryName from category',(err,results)=>{
      if(err){
        failure(err);
      } else {
        success(results);
      }
    })
  })

  const bookmark =new Promise((success,failure)=>{
    con.query('select categoryId,bookmarkId,url,title from bookmark',(err,results)=>{
      if(err){
        failure(err);
      } else {
        success(results);
      }
    })
  })
  
  Promise.all([category,bookmark]).then(async (result)=>{
    
    res.render('bookmark',{bookmarks:result[1],category:result[0],user:req.user,id:req.user.user_id})
  })
}

async function deleteCategory(req,res){
  var id= req.params.id;
  con.query('delete from category where categoryId =?',id,(err)=>{
    if (err) throw err;
    res.render('/bookmarks')
  })
}

async function deleteBookmark(req,res){
  var id= req.params.id;
  con.query('delete from bookmark where bookmarkID=?',id,(err)=>{
    if (err) throw err;
    res.render('/bookmarks')
  })
}

async function searchBookmark(req,res){
  var searchstr = req.body.searchBookmark;
  con.query(`select url from bookmark where title like '%${searchstr}%';`,async (err,result)=>{
    if(err) throw err;
    var searchData = [];
    for(let i=0;i<result.length;i++){
      var title = await ApiController.getTitleAtUrl(result[i].url);
      searchData.push({
        title:title,
        url:result[i].url
      });
      // 
      
    }
    res.render('bookmark',{searchData,user:req.user.user_id,category:[]});
    
  })
}
   

module.exports = {
  myProfile,
  homePage,
  HomePage,
  getCategory,
  GetCategory,
  searchNews,
  SearchNews,
  getSignup,
  addSignUp,
  getSignIn,
  SignIn,
  makeBookmark,
  logout,
  bookmarks,
  addCategory,
  deleteCategory,
  deleteBookmark,
  searchBookmark
};
