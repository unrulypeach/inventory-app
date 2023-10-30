const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const { mongoClient } = require('../mongoUtil');

exports.rarities_list = asyncHandler(async(req, res, next) => {
  try{
    const cursor = mongoClient.db('inventory_info');
    const rarities = cursor.collection('rarity');
    const rarities_list = await rarities.find({}).toArray();
    console.log(rarities_list)

    res.render('rarities_list', {
      title: 'Rarity List',
      rarity_list: rarities_list,
    });
    return;
  } catch(err) {
    console.log(err)
  } 
});

exports.rarities_detail = asyncHandler(async(req, res, next) => {
  res.send('NOT IMPLEMENTED: Rarity detail')
});