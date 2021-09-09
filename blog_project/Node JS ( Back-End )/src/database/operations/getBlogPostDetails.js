var config = require("../dbConfig");
const sql = require('mssql/msnodesqlv8');


//-------- function for getting details of post in database ------------//

async function getBlogPostDetails(id)
{
  let data = sql
   .connect(config)
   .then((pool) => {
       return pool
                  .request()
                  .query(`
                            SELECT 
                                * 
                            FROM 
                                [dbo].[Posts]
                            WHERE
                                [Id] = '${ id }'
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
    getBlogPostDetails : getBlogPostDetails
}