import pool from '../config';

const usersTable = `DROP TABLE IF EXISTS users CASCADE;
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            email CHARACTER VARYING(50) UNIQUE NOT NULL,
            first_name CHARACTER VARYING(255) NOT NULL,
            last_name CHARACTER VARYING(255) NOT NULL,
            image_url TEXT [],
            created_on TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        )`;

/**
         * Function representing usertableHandler
         * @returns {object} representing success or failure
*/
export default async function createUserTable() {
  try {
    const create = await pool.query(usersTable);
    console.log(`userTable: ${create[0].command}PED and ${create[1].command}D`);
  } catch (error) {
    console.log(`userTable ${error}`);
  }
}