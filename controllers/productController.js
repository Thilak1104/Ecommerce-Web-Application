import fs from "fs";
import productModel from "../models/productModel.js";
import slugify from "slugify";
export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name:
        return res.status(500).send({ message: "Name is required" });
      case !description:
        return res.status(500).send({ message: "Description is required" });
      case !price:
        return res.status(500).send({ message: "Price is required" });
      case !category:
        return res.status(500).send({ message: "Category is required" });
      case !quantity:
        return res.status(500).send({ message: "Quantity is required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ message: " Photo is required and should be less than 1mb" });
    }

    const product = new productModel({
      ...req.fields,
      slug: slugify(name),
    });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    return res.status(201).send({
      success: true,
      message: "Successfully created a product",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Error in creating Product",
      error,
    });
  }
};

// getAll products

export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "Successfully got all the products",
      Totalcount: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting all the products",
      error: error,
    });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .find({ slug: req.params.slug })
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "Successfully Fetched the single product",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting the single product",
      error: error,
    });
  }
};

export const productPhotoController = async (req, res) => {
  try {
    console.log(req.param.pid)
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log("photo not getting ",error);
    res.status(500).send({
      success: false,
      message: "Error in getting the photo of  product",
      error: error,
    });
  }
};

export const deleteProductController = async (req, res) => {
    try {
       await productModel.findByIdAndDelete(req.params.pid).select("-photo");
      res.status(200).send({
        success: true,
        message: "Successfully deleted the product"
      })
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in deleting the product",
        error,
      });
    }
  };

  export const updateProductController = async (req, res) => {
    try {
      const { name, description, price, category, quantity } =
        req.fields;
      const { photo } = req.files;
      //alidation
      switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is Required" });
        case !description:
          return res.status(500).send({ error: "Description is Required" });
        case !price:
          return res.status(500).send({ error: "Price is Required" });
        case !category:
          return res.status(500).send({ error: "Category is Required" });
        case !quantity:
          return res.status(500).send({ error: "Quantity is Required" });
        case photo && photo.size > 1000000:
          return res
            .status(500)
            .send({ error: "photo is Required and should be less then 1mb" });
      }
  
      const products = await productModel.findByIdAndUpdate(
        req.params.pid,
        { ...req.fields, slug: slugify(name) },
        { new: true }
      );
      if (photo) {
        products.photo.data = fs.readFileSync(photo.path);
        products.photo.contentType = photo.type;
      }
      await products.save();
      res.status(201).send({
        success: true,
        message: "Product Updated Successfully",
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in Update product",
      });
    }
  };