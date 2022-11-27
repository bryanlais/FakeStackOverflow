// Answer-related queries
module.exports = {
    get_all_users_info: function(connection) {
        const all_users_query = 'SELECT * FROM user';
        return new Promise((resolve, reject) => {
            connection.query(all_users_query, function(error, rows) {
                if(error) reject(error);
                resolve(rows);
            });
        });
    },
    insertUser: function(connection, userObj){
        connection.query('insert into user set ?', userObj);
    },
    insertQC: function(connection, pair){
        connection.query('insert into qc set ?', pair);
    },
}
