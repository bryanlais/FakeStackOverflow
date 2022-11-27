// Answer-related queries
module.exports = {
    get_all_comments_info: function(connection) {
        const all_comments_query = 'SELECT * FROM comment';
        return new Promise((resolve, reject) => {
            connection.query(all_comments_query, function(error, rows) {
                if(error) reject(error);
                resolve(rows);
            });
        });
    },
    insertComment: function(connection, comTrip){
        connection.query('insert into comment set ?', comTrip.comment);
        if(comTrip.type == 0){
            let pair = {
                qstnId: comTrip.qstnId,
                comId: comTrip.comment.cid
            }
            connection.query('insert into qc set ?', pair);
        }
        else{
            connection.query('insert into ac set ?', comTrip.pair);
        }
    }
    /*
    insertQC: function(connection, pair){
        connection.query('insert into qc set ?', pair);
    },
    insertAC: function(connection, pair){
        connection.query("insert into ac set ?", pair);
    }*/
}
