module.exports = {
    usersList : `select * from users`,
    usersInsert : `insert into users set ?`,
    userEditProfilePic : `update users set profilePic=? where id=?`
}