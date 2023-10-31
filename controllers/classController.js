const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const { mongoClient } = require('../mongoUtil');

// Display list of all classs.
exports.class_list = asyncHandler(async (req, res, next) => {
  try {

    const database = mongoClient.db('inventory_info');
    const class_db = database.collection('class');
    const class_list = await class_db.find({}).toArray();
    console.log(class_list)
    
    res.render('class_list', {
      title: 'Class List',
      class_list,
    });
    return;
  } catch(err) {
    console.log(err)
  }
});

// Display detail page for a specific class.
exports.class_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Class detail: ${req.params.id}`);
});

// Display class create form on GET.
exports.class_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Class create GET");
});

// Handle class create on POST.
exports.class_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Class create POST");
});

// Display class delete form on GET.
exports.class_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Class delete GET");
});

// Handle class delete on POST.
exports.class_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Class delete POST");
});

// Display class update form on GET.
exports.class_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Class update GET");
});

// Handle class update on POST.
exports.class_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Class update POST");
});