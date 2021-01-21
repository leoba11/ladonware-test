import express from 'express';
import controller from '../controllers/product';

const router = express.Router();

router.post('/products', controller.createProduct);
router.get('/products', controller.getAllProducts);
router.delete('/products/:id', controller.deleteProduct);
router.put('/products/:id', controller.updateProduct);


export = router;