import pool from '../config';
import { upload, removeFolder } from './util';
import { createUser, getAllUsers, getOneUser } from './sql';



export const userObj = {
    
    /**
     * inserts user details into db
     */

     async registerUser(req, res){

        const {
            email, firstname, lastname
          } = req.body;

          try {
            if(!req.files){
              return res.status(400).json({
                  error: 'No files attached'
              });
            }

    
            let url = await upload(req.files.image);
            const params = [
                email,
                firstname,
                lastname,
                url
          ];
            removeFolder('tmp');
            const { rows } = await pool.query(createUser, params);
            const data = rows[0];
            return res.status(201).json({
                data
              });
    
          } catch (error) {
            return res.status(500).json({
              status: 500,
              error: error.message
            });
          }
     },

     async fetchAllUsers(req, res){
         try{
             const users = await pool.query(getAllUsers);
             return res.status(200).json({
                 data: users.rows
             })
         } catch(error){
             return res.status(500).json({
                 error: error.message
             });
         }
     },

     async fetchSingleUser(req, res){
         try {
             const user = await pool.query(getOneUser, [req.params.id]);
             return res.status(200).json({
                 data: user.rows[0]
             });
         } catch(error){
             return res.status(500).json({
                 error: error.message
             });
         }
     }
}