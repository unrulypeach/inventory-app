const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const { mongoClient } = require('../utils/mongoUtil');
const { ObjectId } = require('mongodb');

exports.index = asyncHandler(async (req, res, next) => {
  res.render('index', {title: 'Backpack Battles Inventory'});
});

// Display list of all items.
exports.item_list = asyncHandler(async (req, res, next) => {
  try {
    const database = mongoClient.db('inventory_info');
    const itemCollection = database.collection('item');
    const item_list = await itemCollection.find({}, { projection: { name: 1 } }).toArray();
    
    res.render('item_list', {
      title: 'Item List',
      item_list
    });
    return;
  } catch(err) {
    console.log(err)
  }
});

// Display detail page for a specific item.
exports.item_detail = asyncHandler(async (req, res, next) => {
  try {
    const id = new ObjectId(req.params.id);
    const database = mongoClient.db('inventory_info');
    const itemCollection = database.collection('item');
    const item = await itemCollection.findOne({ _id: id });

    res.render('item_detail', {
      title: 'Item Detail',
      item,
    });
    return;
  } catch(err) {
    console.log(err)
  }
});

// Display item create form on GET.
exports.item_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item create GET");
});

// Handle item create on POST.
exports.item_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item create POST");
});

// Display item delete form on GET.
exports.item_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item delete GET");
});

// Handle item delete on POST.
exports.item_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item delete POST");
});

// Display item update form on GET.
exports.item_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item update GET");
});

// Handle item update on POST.
exports.item_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item update POST");
});