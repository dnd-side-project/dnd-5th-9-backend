const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '.env') });

const config = {
    development: {
        port: process.env.PORT,
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        database: process.env.DATABASE,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    },
};

module.exports = config;
