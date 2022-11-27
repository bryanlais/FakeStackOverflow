// Answer-related queries
module.exports = {
    get_all_answers_info: function(connection) {
        const all_answers_query = 'SELECT * FROM answer ORDER BY ans_date_time';
        return new Promise((resolve, reject) => {
            connection.query(all_answers_query, function(error, rows) {
                if(error) reject(error);
                resolve(rows);
            });
        });
    },
    insertAnswer: function(connection, ansObj){
        connection.query('insert into answer set ?', ansObj);
    },
    deleteAnswer: function(connection, ansObj){
        connection.query('DELETE FROM answer WHERE aid = ' + ansObj.aid);
        connection.query('DELETE FROM qa where ansId = ' + ansObj.aid);
    },
    editAnswer: function(connection, ansObj){
        connection.query('UPDATE answer SET text = \'' + ansObj.text + '\' WHERE aid = ' + ansObj.aid);
    }
}
