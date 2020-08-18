export const createUser = 'INSERT INTO users (email, first_name, last_name, image_url) VALUES ($1, $2, $3, $4) returning *';
export const getAllUsers = 'SELECT * FROM users';
export const getOneUser = 'SELECT * FROM users WHERE id=$1';