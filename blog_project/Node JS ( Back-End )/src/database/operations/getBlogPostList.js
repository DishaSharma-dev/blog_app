var config = require("../dbConfig");
const sql = require('mssql/msnodesqlv8');


//-------- function for getting all post details in database ------------//

async function getAllBlogPost()
{
  let data = sql
   .connect(config)
   .then((pool) => {
       return pool
                  .request()
                  .query(`
                            SELECT 
                                [Id],
                                [Title],
                                [Category] 
                            FROM 
                                [dbo].[Posts]
                        `);
   })
   .then((result) => {

       sql.close();
       return result.recordset;
   })
   .catch((err) => {
       console.log(err.message);
       sql.close();
   })

   return data;
}

module.exports = {
    getAllBlogPost : getAllBlogPost
}