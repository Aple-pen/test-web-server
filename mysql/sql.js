module.exports = {
    usersList : `select * from users`,
    userInfo : `select * from users where id=?`,
    usersInsert : `insert into users set ?`,
    userEditProfilePic : `update users set profilePic=? where id=?`
}