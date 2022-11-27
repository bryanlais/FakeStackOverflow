// Tag related queries

module.exports = {
    get_all_tags_info: function(connection) {
    const all_tags_query = 'SELECT * FROM tag';
    return new Promise((resolve, reject) => {
        connection.query(all_tags_query, function(error, rows) {
            if(error) reject(error);
            resolve(rows);
    });
    });
    },

    
    get_tags_from_qid: function(connection, qid){
        const tags_qid_query = "SELECT * FROM tag WHERE tid in (SELECT tagId FROM qt WHERE qstnId in ("+qid+"))"
        return new Promise((resolve, reject) => {
            connection.query(tags_qid_query, function(error, rows) {
                if(error) reject(error);
                resolve(rows);
            });
        });
    },
    
    insertTag: function(connection, tagObj){
        let tagArr = tagObj.tags;
        for(let t = 0; t < tagArr.length; t++) {
            connection.query('insert into tag set ?', tagArr[t]);
        }
    },

    get_num_of_questions_for_tag: function(connection, ){
        const query = "SELECT b.book_id, b.book_name, a.author_id, a.author_name \
        FROM books b \
        JOIN books_has_author ba ON ba.books_book_id = b.book_id \
        JOIN author a ON ba.author_author_id = a.author_id\
        WHERE a.author_id = xxx"
    },
    deleteTag: function(connection, tagObj){
        connection.query('DELETE FROM tag WHERE tid = ' + tagObj.tid);
        connection.query('DELETE FROM qt where tagId = ' + tagObj.tid);
    },
    editTag: function(connection, tagObj){
        connection.query('UPDATE tag SET name = \'' + tagObj.name + '\' WHERE tid = ' + tagObj.tid);
    }
}
