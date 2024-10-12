import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Ronjohnsonowuor@8382",
    database: "savings"
});

export default connection;
