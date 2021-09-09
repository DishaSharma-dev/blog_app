var config = require("../dbConfig");
const sql = require("mssql/msnodesqlv8");

//-------- function for deleting post in database ------------//

let likeBlogPost = async (id, likes) => {
  try {
    await sql.connect(config);

    await sql.query(`
                    UPDATE 
                      [dbo].[Posts]
                    SET 
                      [Likes] = '${likes}'
                    WHERE 
                      [Id] = ${id}
                        `);
  } catch (err) {
    console.log(err.message);
    console.log(id)
    console.log(likes)
  }
  sql.close();
};

module.exports = {
  likeBlogPost: likeBlogPost,
};
