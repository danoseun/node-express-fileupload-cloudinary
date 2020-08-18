import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let connection;

if (process.env.NODE_ENV === 'test') {
  connection = {
    connectionString: process.env.TESTDB_URL
  };
}
connection = {
  connectionString: process.env.DATABASE_URL
};

const pool = new Pool(connection);
export default pool;