require("dotenv").config();


// Database configuration object

const config = {
    database: process.env.DATABASE,
    server: process.env.SERVER,
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    }
}

module.exports = config;