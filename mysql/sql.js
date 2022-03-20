module.exports = {
    usersList : `select * from users`,
    userInfo : `select * from users where id=?`,
    usersInsert : `insert into users(email,nickName,password,salt,imgData) values(?,?,?,?,?)`,
    userEditProfilePic : `update users set profilePic=? where id=?`
}