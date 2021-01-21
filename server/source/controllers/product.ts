import { NextFunction, Request, Response } from 'express';
import Product from '../models/product';
import mongoose from 'mongoose';

const createProduct = (req: Request, res: Response, next: NextFunction) => {
    let { name, quantity, category, price, inventary, description } = req.body;

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name,
        quantity,
        category,
        price,
        inventary,
        description
    });
    
    return product.save()
        .then((result) => {
            return res.status(201).json({
                product: result
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        })
};

const getAllProducts = (req: Request, res: Response, next: NextFunction) => {
    Product.find()
        .exec()
        .then((results) => {
            return res.status(200).json({
                products: results,
                count: results.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        })
};

const deleteProduct = (req: Request, res: Response, next: NextFunction) => {

    Product.deleteOne({_id: req.params.id}).then( () => {
            res.status(200).json({
                message: 'Product Deleted!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

const updateProduct = (req: Request, res: Response, next: NextFunction) => {
    const product = new Product({
        _id: req.params.id,
        name: req.body.name,
        quantity: req.body.quantity,
    });

    Product.updateOne({_id: req.params.id}, product).then(
        () => {
            res.status(201).json({
                message: 'Product updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}



export default { updateProduct, deleteProduct, createProduct, getAllProducts };
