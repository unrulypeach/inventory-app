const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

// Display list of all types.
exports.type_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Type list");
});

// Display detail page for a specific type.
exports.type_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Type detail: ${req.params.id}`);
});

// Display type create form on GET.
exports.type_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Type create GET");
});

// Handle type create on POST.
exports.type_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Type create POST");
});

// Display type delete form on GET.
exports.type_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Type delete GET");
});

// Handle type delete on POST.
exports.type_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Type delete POST");
});

// Display type update form on GET.
exports.type_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Type update GET");
});

// Handle type update on POST.
exports.type_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Type update POST");
});