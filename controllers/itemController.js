const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const { mongoClient } = require('../utils/mongoUtil');
const { ObjectId } = require('mongodb');
const { whitespaceToUnderscore, underscoreToWhitespace } = require('../utils/utils');

exports.index = asyncHandler(async (req, res, next) => {
  res.render('index', {title: 'Backpack Battles Inventory'});
});

// Display list of all items.
exports.item_list = asyncHandler(async (req, res, next) => {
  try {
    const database = mongoClient.db('inventory_info');
    const itemCollection = database.collection('item');
    const item_list = await itemCollection.find({}, { projection: { name: 1 } }).toArray();

    item_list.forEach((el) => {
      el.href = whitespaceToUnderscore(el.name);
    })

    item_list.sort((a, b) => {
      return (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 :
      (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : 0
    })
  
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
    const itemName = underscoreToWhitespace(req.params.id);
    const itemCollection = mongoClient.db('inventory_info').collection('item');
    const item = await itemCollection.findOne({ name: itemName });

    res.render('item_detail', {
      title: `${item?.name ?? itemName} - Item Detail`,
      item,
      prevPg: req.header('Referer'),
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
    itemColl.find({}, { populate: { name: 1 } }).toArray(),
  ]);

  const sortedType = allType
    .sort((a, b) => {
      return (a.name.toUpperCase() < b.name.toUpperCase()) ? -1 :
      (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : 0;
    });

  const sortedItems = allItem.sort((a, b) => {
    return (a.name.toUpperCase() < b.name.toUpperCase()) ? -1 :
    (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : 0;
  });

  res.render('item_form', { 
    title: 'Create new item',
    allRarity,
    allType: sortedType,
    allClass,
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
    .toArray()
    .isArray()
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
    .toArray()
    .isArray()
    .escape(),
  body('used_in_recipe', 'used_in_recipes error')
    .trim()
    .optional()
    .toArray()
    .isArray()
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
      type: type.map(x => x.toLowerCase()),
      cost,
      ...(of_class) && {of_class},
      ...(requires) && {requires: (Array.isArray(requires)) ?  requires : new Array(requires)},
      ...(used_in_recipe) && {used_in_recipe: (Array.isArray(used_in_recipe)) ?  used_in_recipe.map : new Array(used_in_recipe)},
    };

    if (!errors.isEmpty()) {
      const [allRarity, allType, allClass, allItem] = await Promise.all([
        rarityColl.find({}, { populate: { _id: 0 } }).toArray(),
        typeColl.find({}, { populate: { _id: 0 } }).toArray(),
        classColl.find({}, { populate: { _id: 0 } }).toArray(),
        itemColl.find({}, { populate: { _id: 0, name: 1 } }).toArray(),
      ]);
    
     
      for (const rarity of allRarity) {
        if (newItem.rarity.toLowerCase() === rarity.name.toLowerCase()) {
          rarity.checked = 'true';
        }
      };

      for (const prevType of type) {
        for (const aType of allType) {
          if (prevType.toLowerCase() === aType.name.toLowerCase()) {
            aType.checked = 'true';
          }
        }
      };

      if (of_class) {
        for (const aClass of allClass) {
          if (newItem.of_class.toLowerCase() === aClass.name) {
            aClass.checked = 'true';
          }
        };
      };

      if (requires) {
        for (const prevReq of requires) {
          for (const item of allItem) {
            if (prevReq.toLowerCase() === item.name.toLowerCase()) {
              item.prevRequires = 'true';
            }
          }
        }
      };

      if (used_in_recipe) {
        for (const prevUsed of used_in_recipe) {
          for (const item of allItem) {
            if (prevUsed.toLowerCase() === item.name.toLowerCase()) {
              item.prevUsed = 'true';
            }
          }
        }
      };

      const sortedType = allType
        .sort((a, b) => {
          return (a.name.toUpperCase() < b.name.toUpperCase()) ? -1 :
          (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : 0;
        });
      const sortedItems = allItem.sort((a, b) => {
        return (a.name.toUpperCase() < b.name.toUpperCase()) ? -1 :
        (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : 0;
      });

      res.render('item_form', { 
        title: 'Create new item',
        allRarity,
        allType: sortedType,
        allClass,
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
  const rarityColl = mongoClient.db('inventory_info').collection('rarity');
  const typeColl = mongoClient.db('inventory_info').collection('type');
  const classColl = mongoClient.db('inventory_info').collection('class');
  const itemColl = mongoClient.db('inventory_info').collection('item');

  res.render('item_form', {
    title: 'Update item',
    allRarity: rarityColl,
    allType: typeColl, 
    allClass: classColl, 
    allItem: itemColl,
  })
});

// Handle item update on POST.
exports.item_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item update POST");
});