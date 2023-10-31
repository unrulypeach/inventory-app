const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const { mongoClient } = require('../utils/mongoUtil');
const { capitalizeFirstLetter } = require('../utils/utils');

// Display list of all types.
exports.type_list = asyncHandler(async (req, res, next) => {
  try{

    const typeColl = mongoClient.db('inventory_info').collection('type');
    const type_list = await typeColl.find({}).toArray();
    const capitalized_list = type_list.map((item) => capitalizeFirstLetter(item.name));

    res.render('type_list', {
      title: 'Type List',
      type_list: capitalized_list,
    });
    return;
  } catch(err) {
    console.log(err)
  }
});

// Display detail page for a specific type.
exports.type_detail = asyncHandler(async (req, res, next) => {
  try{

    const typeName = req.params.id;
    const itemColl = mongoClient.db('inventory_info').collection('item');
    const items_by_type = await itemColl.find({ type: typeName }, { projection: { name: 1 } }).toArray();
    console.log(items_by_type)
    res.render('type_detail', {
      title: `${capitalizeFirstLetter(typeName)} Items`,
      type_list: items_by_type,
    });
    return;
  } catch(err) {
    console.log(err)
  }
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