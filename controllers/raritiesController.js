const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const { mongoClient } = require('../utils/mongoUtil');
const { capitalizeFirstLetter } = require('../utils/utils');

exports.rarities_list = asyncHandler(async(req, res, next) => {
  try{
    const rarityColl = mongoClient.db('inventory_info').collection('rarity');
    const rarities_list = await rarityColl.find({}).toArray();
    const capitalized_list = rarities_list.map((item) => capitalizeFirstLetter(item.name));

    res.render('rarities_list', {
      title: 'Rarity List',
      rarity_list: capitalized_list,
    });
    return;
  } catch(err) {
    console.log(err)
  } 
});

exports.rarities_detail = asyncHandler(async(req, res, next) => {
  try{
    const rarityName = req.params.id;
    const itemColl = mongoClient.db('inventory_info').collection('item');
    const items_by_rarity = await itemColl.find({ rarity: rarityName }, { projection: { name: 1 } }).toArray();

    res.render('rarities_detail', {
      title: `${capitalizeFirstLetter(rarityName)} Items`,
      item_list: items_by_rarity,
    });
    return;
  } catch(err) {
    console.log(err)
  }
});