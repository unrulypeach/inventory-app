const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const { mongoClient } = require('../utils/mongoUtil');
const { capitalizeFirstLetter } = require('../utils/utils');

// Display list of all classs.
exports.class_list = asyncHandler(async (req, res, next) => {
  try {
    const classColl = mongoClient.db('inventory_info').collection('class');
    const class_list = await classColl.find({}).toArray();
    const capitalized_list = class_list.map((item) => capitalizeFirstLetter(item.name));
    
    res.render('class_list', {
      title: 'Class List',
      class_list: capitalized_list,
    });
    return;
  } catch(err) {
    console.log(err)
  }
});

// Display detail page for a specific class.
exports.class_detail = asyncHandler(async (req, res, next) => {
  try{
    const className = req.params.id;
    const itemColl = mongoClient.db('inventory_info').collection('item');
    const item_by_class = await itemColl.find({ class: className }, { projection: { name: 1 } }).toArray();

    res.render('class_detail', {
      title: `${capitalizeFirstLetter(className)}`,
      item_list: item_by_class,
    })
  } catch(err) {
    console.log(err)
  }
});

// Display class create form on GET.
exports.class_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Class create GET");
});

// Handle class create on POST.
exports.class_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Class create POST");
});

/* DO NOT CREATE UNTIL AUTH IMPLEMENTED
// Display class delete form on GET.
exports.class_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Class delete GET");
});

// Handle class delete on POST.
exports.class_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Class delete POST");
}); */

// Display class update form on GET.
exports.class_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Class update GET");
});

// Handle class update on POST.
exports.class_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Class update POST");
});