const mysql = require('mysql2');
const dotenv = require('dotenv');
const {
  QUERIES
} = require('../constants/index.js');

dotenv.config();

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

let connectionCreated = null;
let connectionFailed = null;

const connectionPromise = new Promise((res, rej) => {
  connectionCreated = res;
  connectionFailed = rej;
})

con.connect(function (err) {
  if (err) {
    connectionFailed(err);
    return;
  } else {
    connectionCreated(console.log("connected"));
  }
});

async function createUser(callback){
  connectionPromise.then(()=>{
    con.query(QUERIES.USER_INSERT,callback);
  }).catch((err)=>callback(err));
}

async function checkUser(callback){
  connectionPromise.then(()=>{
    con.query(QUERIES.USER_SELECT,callback);
  }).catch((err)=> callback(err));
}



module.exports={
    createUser,
    checkUser
}