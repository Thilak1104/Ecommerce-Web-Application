import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createProductController, deleteProductController, getProductController, getSingleProductController, productCountController, productFiltersController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from '../controllers/productController.js';
import formidable from 'express-formidable';

const router = express.Router();

//create route
router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController);

//getproduct route
router.get('/get-product',getProductController);

//get single product route
router.get('/get-product/:slug',getSingleProductController);

//get photo rouete
router.get('/product-photo/:pid',productPhotoController);

//update route
router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController);

//delete route
router.delete('/delete-product/:pid',requireSignIn,isAdmin,formidable(),deleteProductController);

//filter routes
router.post('/product-filters',productFiltersController)

//coount products
router.get('/product-count',productCountController);

//product per page
router.get('/product-list/:page',productListController);

//search product
router.get('/search/:keyword',searchProductController);

// similar product 
router.get('/related-product/:pid/:cid',relatedProductController);

export default router;
