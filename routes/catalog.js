const express = require('express');
const router = express.Router();

const item_controller = require('../controllers/itemController');
const type_controller = require('../controllers/typeController');
const class_controller = require('../controllers/classController');
const rarities_controller = require('../controllers/raritiesController');

// GET catalog home page
router.get('/', item_controller.index);

/// ITEM ROUTES ///

// GET request for creating item
router.get('/item/create', item_controller.item_create_get);

// POST request for creating item
router.post('/item/create', item_controller.item_create_post);

// GET request to delete item
router.get('/item/:id/delete', item_controller.item_delete_get);

// POST request to delete item
router.post('/item/:id/delete', item_controller.item_delete_post);

// GET request to update item
router.get('/item/:id/update', item_controller.item_update_get);

// POST request to update item
router.post('/item/:id/update', item_controller.item_update_post);

// GET request for an item
router.get('/item/:id', item_controller.item_detail);

// GET request for all items
router.get('/item', item_controller.item_list)

/// TYPE ROUTES ///

// GET request for create type
router.get('/types/create', type_controller.type_create_get);

// POST request for create type
router.post('/types/create', type_controller.type_create_post);

// GET request to delete type
router.get('/types/:id/delete', type_controller.type_delete_get);

// POST request to delete type
router.post('/types/:id/delete', type_controller.type_delete_post);

// GET request to update type
router.get('/types/:id/update', type_controller.type_update_get);

// POST request to update type
router.post('/types/:id/update', type_controller.type_update_post);

// GET request for a type
router.get('/types/:id', type_controller.type_detail);

// GET request for all types
router.get('/types', type_controller.type_list);

/// CLASS ROUTES ///

// GET request for create class
router.get('/class/create', class_controller.class_create_get);

// POST request for create class
router.post('/class/create', class_controller.class_create_post);

// GET request to delete class
router.get('/class/:id/delete', class_controller.class_delete_get);

// POST request to delete class
router.post('/class/:id/delete', class_controller.class_delete_post);

// GET request to update class
router.get('/class/:id/update', class_controller.class_update_get);

// POST request to update class
router.post('/class/:id/update', class_controller.class_update_post);

// GET request for a class
router.get('/class/:id', class_controller.class_detail);

// GET request for all classs
router.get('/class', class_controller.class_list);

/// RARITIES ROUTES ///

// GET request for all rarities
router.get('/rarities', rarities_controller.rarities_list);

// GET request for a rarity
router.get('/rarities/:id', rarities_controller.rarities_detail);

module.exports = router;