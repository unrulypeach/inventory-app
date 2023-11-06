const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const { mongoClient } = require('../utils/mongoUtil');
const { capitalizeFirstLetter, whitespaceToUnderstore } = require('../utils/utils');

exports.rarities_list = asyncHandler(async(req, res, next) => {
  try{
    const rarityColl = mongoClient.db('inventory_info').collection('rarity');
    const rarities_list = await rarityColl.find({}).toArray();
    rarities_list.forEach((item) => {
      item.capitalName = capitalizeFirstLetter(item.name);
    })

    res.render('rarities_list', {
      title: 'Rarity List',
      rarities_list,
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

    items_by_rarity.forEach((el) => {
      el.href = whitespaceToUnderstore(el.name);
    })

    res.render('rarities_detail', {
      title: `${capitalizeFirstLetter(rarityName)} Items`,
      item_list: items_by_rarity,
    });
    return;
  } catch(err) {
    console.log(err)
  }
});