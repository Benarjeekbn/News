const QUERIES = {
    USER_SELECT : 'SELECT username,password from user where email=?',
    USER_INSERT : 'INSERT INTO user (username,email,password,id) values (?,?,?,?)',

}

module.exports={QUERIES};