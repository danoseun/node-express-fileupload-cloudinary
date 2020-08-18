import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import fs from 'fs-extra';

dotenv.config();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

 /**
    * utility to handle file upload
  */

  export const upload = async(file) => {

    let result;
    try {
        if(Array.isArray(file)){
            let uploads = file.map(async img =>  {
                return await cloudinary.v2.uploader.upload(img.tempFilePath, { resource_type: "auto"});  
            })
            let resolvedUploads = await Promise.all(uploads);
            let result = resolvedUploads.map(obj => obj.secure_url);
            return result;
        
        }
        result = await cloudinary.v2.uploader.upload(file.tempFilePath, { resource_type: "auto"});
        return [result.secure_url];
    } catch(err){
        throw err;
    }  
  }

  /**
   * Utility to remove tmp folder after each upload
   */
export const removeFolder = async(folder) => {
    try {
      await fs.remove(folder);
      console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }