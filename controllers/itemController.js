const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const { mongoClient } = require('../utils/mongoUtil');
const { ObjectId } = require('mongodb');
const { capitalizeFirstLetter } = require('../utils/utils');

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
    const itemCollection = mongoClient.db('inventory_info').collection('item');
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
  const rarityColl = mongoClient.db('inventory_info').collection('rarity');
  const typeColl = mongoClient.db('inventory_info').collection('type');
  const classColl = mongoClient.db('inventory_info').collection('class');
  const itemColl = mongoClient.db('inventory_info').collection('item');
  
  const [allRarity, allType, allClass, allItem] = await Promise.all([
    rarityColl.find({}, { populate: { _id: 0 } }).toArray(),
    typeColl.find({}, { populate: { _id: 0 } }).toArray(),
    classColl.find({}, { populate: { _id: 0 } }).toArray(),
    itemColl.find({}, { populate: { _id: 0, name: 1 } }).toArray(),
  ]);

  const formattedRarity = allRarity.map(item => capitalizeFirstLetter(item.name));
  const formattedType = allType
    .map(item => capitalizeFirstLetter(item.name))
    .sort((a, b) => {
      return (a.toUpperCase() < b.toUpperCase()) ? -1 :
      (a.toUpperCase() > b.toUpperCase()) ? 1 : 0;
    });
  const formattedClass = allClass.map(item => capitalizeFirstLetter(item.name));
  const sortedItems = allItem.sort((a, b) => {
    return (a.name.toUpperCase() < b.name.toUpperCase()) ? -1 :
    (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : 0;
  });

  res.render('item_form', { 
    title: 'Create new item',
    allRarity: formattedRarity,
    allType: formattedType,
    allClass: formattedClass,
    allItem: sortedItems,
  });
});

// Handle item create on POST.
exports.item_create_post = [
  body('name', 'name is required')
    .trim()
    .isString()
    .custom(async(value) => {
      const itemColl = mongoClient.db('inventory_info').collection('item');
      const itemExists = await itemColl.findOne({ name: value });
      if (itemExists) {
        throw new Error('Item already exists');
      } else {
        return true;
      }
    })
    .notEmpty()
    .escape(),
  body('effect', 'effect is required')
    .trim()
    .isString()
    .notEmpty()
    .escape(),
  body('rarity', 'rarity is required')
    .trim()
    .isString()
    .notEmpty()
    .escape(),
  body('type', 'type is required')
    .custom((value) => {
      const isString = typeof value === 'string';
      const isArray = Array.isArray(value)
      if ( !isString && !isArray) {
        throw new Error(`invalid type. isString=${isString}, isArray=${isArray}`)
      };
      return true;
    })
    .escape(),
  body('cost', 'cost is required')
    .trim()
    .isNumeric()
    .notEmpty()
    .escape(),
  body('class', 'class error')
    .trim()
    .optional()
    .escape(),
  body('requires', 'requires error')
    .trim()
    .optional()
    .escape(),
  body('used_in_recipe', 'used_in_recipes error')
    .trim()
    .optional()
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const rarityColl = mongoClient.db('inventory_info').collection('rarity');
    const typeColl = mongoClient.db('inventory_info').collection('type');
    const classColl = mongoClient.db('inventory_info').collection('class');
    const itemColl = mongoClient.db('inventory_info').collection('item');
    const { name, effect, rarity, type, cost, of_class, requires, used_in_recipe, } = req.body;
    const newItem = {
      name,
      effect,
      rarity: rarity.toLowerCase(),
      type: (Array.isArray(type)) ?  type.map(x => x.toLowerCase()) : new Array(type).map(x.toLowerCase),
      cost,
      ...(of_class) && {of_class: (Array.isArray(of_class)) ?  of_class.map(x => x.toLowerCase()) : new Array(of_class).map(x => x.toLowerCase())},
      ...(requires) && {requires: (Array.isArray(requires)) ?  requires.map(x => x.toLowerCase()) : new Array(requires).map(x => x.toLowerCase())},
      ...(used_in_recipe) && {used_in_recipe: (Array.isArray(used_in_recipe)) ?  used_in_recipe.map(x => x.toLowerCase()) : new Array(used_in_recipe).map(x => x.toLowerCase())},
    };
    if (!errors.isEmpty()) {
      
      const [allRarity, allType, allClass, allItem] = await Promise.all([
        rarityColl.find({}, { populate: { _id: 0 } }).toArray(),
        typeColl.find({}, { populate: { _id: 0 } }).toArray(),
        classColl.find({}, { populate: { _id: 0 } }).toArray(),
        itemColl.find({}, { populate: { _id: 0, name: 1 } }).toArray(),
      ]);
    
      const formattedRarity = allRarity.map(item => capitalizeFirstLetter(item.name));
      const formattedType = allType
        .map(item => capitalizeFirstLetter(item.name))
        .sort((a, b) => {
          return (a.toUpperCase() < b.toUpperCase()) ? -1 :
          (a.toUpperCase() > b.toUpperCase()) ? 1 : 0;
        });
      const formattedClass = allClass.map(item => capitalizeFirstLetter(item.name));
      const sortedItems = allItem.sort((a, b) => {
        return (a.name.toUpperCase() < b.name.toUpperCase()) ? -1 :
        (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : 0;
      });
    
      res.render('item_form', { 
        title: 'Create new item',
        allRarity: formattedRarity,
        allType: formattedType,
        allClass: formattedClass,
        allItem: sortedItems,
        item: newItem,
        errors: errors.array(),
      });
    } else {
      const insertedItem = await itemColl.insertOne(newItem);
      res.redirect(`/catalog/item/${insertedItem.insertedId}`);
    }
})];

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