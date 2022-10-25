const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

async function headlines() {
  var url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.NEWSAPI_KEY}`
  const options = {
    headers: {
      'User-Agent': 'Mozilla/5.0'
    }
  }
  var response = await axios.get(url,options);
  return  response.data;
}
async function category(category) {
  var url=`https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${process.env.NEWSAPI_KEY}`
  const options = {
    headers: {
      'User-Agent': 'Mozilla/5.0'
    }
  }
  var response = await axios.get(url,options);
 
  return  response.data;
}

async function searchByName(query){
  var url =`https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.NEWSAPI_KEY}`
  const options = {
    headers: {
      'User-Agent': 'Mozilla/5.0'
    }
  }
  var response = await axios.get(url,options);
  console.log(url)
  return response.data
}


module.exports = {
  headlines,
  category,
  searchByName,
  
}