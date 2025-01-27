// lib/db.js
import mysql from "mysql2/promise";

// Use the DATABASE_URL from the .env file
const pool = mysql.createPool(process.env.DATABASE_URL);

export default pool;