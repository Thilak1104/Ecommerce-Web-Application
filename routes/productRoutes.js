import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createProductController, deleteProductController, getProductController, getSingleProductController, productPhotoController, updateProductController } from '../controllers/productController.js';
import formidable from 'express-formidable';

const router = express.Router();

//create route
router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController);

//getproduct route
router.get('/get-product',getProductController);

//getproduct route
router.get('/get-product/:slug',getSingleProductController);

//get photo rouete
router.get('/product-photo/:pid',productPhotoController);

//update route
router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController);

//delete route
router.delete('/delete-product/:pid',requireSignIn,isAdmin,formidable(),deleteProductController);

export default router;
