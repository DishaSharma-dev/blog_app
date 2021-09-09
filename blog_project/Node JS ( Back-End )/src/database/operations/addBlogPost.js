var config = require("../dbConfig");
const sql = require('mssql/msnodesqlv8');


//-------- function for adding post in database ------------//

let addBlogPost = async (title, category, description) => {
    try {
        await sql.connect(config)
        
        await sql.query(
                        `INSERT INTO 
                            [dbo].[Posts]
                        (
                            [Title], 
                            [Category], 
                            [Description],
                            [Likes]
                        )
                        VALUES
                        (
                        '${ title }', 
                        '${ category }', 
                        '${ description }',
                        '0'
                        )`
                        );
    } catch (err) {
     console.log(err.message)
    }
   }

module.exports = {
    addBlogPost : addBlogPost
}