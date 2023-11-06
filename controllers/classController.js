const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const { mongoClient } = require('../utils/mongoUtil');
const { capitalizeFirstLetter, whitespaceToUnderscore } = require('../utils/utils');

// Display list of all classs.
exports.class_list = asyncHandler(async (req, res, next) => {
  try {
    const classColl = mongoClient.db('inventory_info').collection('class');
    const class_list = await classColl.find({}).toArray();
    // const capitalized_list = class_list.map((item) => capitalizeFirstLetter(item.name));
    class_list.forEach((el) => {
      el.capitalName = capitalizeFirstLetter(el.name);
    })
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
  try{
    const className = req.params.id;
    const itemColl = mongoClient.db('inventory_info').collection('item');
    const item_by_class = await itemColl.find({ of_class: className }, { projection: { name: 1 } }).toArray();

    item_by_class.forEach((el) => {
      el.href = whitespaceToUnderscore(el.name)
    })

    res.render('class_detail', {
      title: `${capitalizeFirstLetter(className)}`,
      item_list: item_by_class,
    })
  } catch(err) {
    console.log(err)
  }
});

// Display class create form on GET.
exports.class_create_get = (req, res, next) => {
  res.render('class_form', { title: 'Create new class' });
};

// Handle class create on POST.
exports.class_create_post = [
  body('class_name', 'class name must contain at least 3 letters')
    .trim()
    .isLength({ min: 3})
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const className = req.body.class_name.toLowerCase();

    const newClassDoc = {
      name: className,
    };

    if(!errors.isEmpty()) {
      res.render('class_form', {
        title: 'Create new class', 
        type: newClassDoc,
        errors: errors.array(),
      });
      return;
    } else {
      //check if already exists
      const classColl = mongoClient.db('inventory_info').collection('class');
      const classExists = await classColl.findOne({ name: className });
      
      if (classExists) {
        res.redirect(`catalog/class/${className}`);
      } else {
        await classColl.insertOne(newClassDoc);
        res.redirect(`/catalog/types/${className}`);
      }
    }
})];

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