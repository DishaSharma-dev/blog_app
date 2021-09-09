var config = require("../dbConfig");
const sql = require("mssql/msnodesqlv8");

//-------- function for editing post details in database ------------//

let editBlogPost = async (id, title, category, description) => {
  try {
    await sql.connect(config);

    await sql.query(`
                        UPDATE 
                            [dbo].[Posts]
                        SET 
                            [Title]       = '${title}',
                            [Category]    = '${category}',
                            [Description] = '${description}'
                        WHERE 
                            [Id] = ${id}`
    );
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  editBlogPost: editBlogPost,
};
