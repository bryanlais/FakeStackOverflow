// Question-related Queries
module.exports = {
        get_all_questions_info: function(connection) {
            const all_questions_query = 'SELECT * FROM question ORDER BY ask_date_time DESC';
            return new Promise((resolve, reject) => {
                connection.query(all_questions_query, function(error, rows) {
                    if(error) reject(error);
                    resolve(rows);
                });
            });
        },

        insertQuestion: function(connection, questObj){
            connection.query('insert into question set ?', questObj);
        },

        insertQT: function(connection, pairobj){
            let pairArr = pairobj.pairs;
            for(let i = 0; i < pairArr.length; i++){
                connection.query('insert into qt set ?', pairArr[i]);
            }
        },

        insertQA: function(connection, pair){
            connection.query('insert into qa set ?', pair);
        },

        get_qt: function(connection){
            return new Promise((resolve, reject) => {
                connection.query('SELECT * FROM question JOIN qt ON qt.qstnID = question.qid JOIN tag ON qt.tagId = tag.tid', function(error, rows){
                    if(error) reject(error);
                    resolve(rows);
                });
            });
        },

        get_qa: function(connection){
            return new Promise((resolve, reject) => {
                //Note, text is ambiguous, so we do answer.text.
                connection.query('SELECT qid, aid, answer.text, ans_date_time, ans_by FROM question JOIN qa ON qa.qstnID = question.qid JOIN answer ON qa.ansId = answer.aid', function(error, rows){
                    if(error) reject(error);
                    resolve(rows);
                });
            });
        },
        get_qc: function(connection){
            return new Promise((resolve, reject) => {
                //Note, text is ambiguous, so we do answer.text.
                connection.query('SELECT qid, cid, comment.text, com_date_time, com_by FROM question JOIN qc ON qc.qstnID = question.qid JOIN comment ON qc.comId = comment.cid', function(error, rows){
                    if(error) reject(error);
                    resolve(rows);
                });
            });
        },

        increase_views: function(connection,questionid){
            return new Promise((resolve, reject) => {
                connection.query("UPDATE question SET views = views + 1 WHERE qid = " + questionid);
            })
        },
        deleteQuestion: function(connection, quesObj){
            connection.query('DELETE FROM question WHERE qid = ' + quesObj.qid);
            connection.query('DELETE FROM qa where qstnId = ' + quesObj.qid);
            connection.query('DELETE FROM qt where qstnId = ' + quesObj.qid);
        },
        editQuestion: function(connection, qObj){
            connection.query('UPDATE question SET text = \'' + qObj.text + '\', title = \'' + qObj.title + '\' WHERE qid = ' + qObj.qid);
        }
}
