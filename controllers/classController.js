const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

// Display list of all classs.
exports.class_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Class list");
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