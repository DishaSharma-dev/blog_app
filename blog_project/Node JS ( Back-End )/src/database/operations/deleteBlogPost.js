var config = require("../dbConfig");
const sql = require("mssql/msnodesqlv8");

//-------- function for deleting post in database ------------//

let deleteBlogPost = async (id) => {
  try {
    await sql.connect(config);

    await sql.query(`
                        DELETE FROM 
                            [dbo].[Posts]
                        WHERE 
                            [Id] = ${id}
                        `);
  } catch (err) {
    console.log(err.message);
  }
  sql.close();
};

module.exports = {
  deleteBlogPost: deleteBlogPost,
};
