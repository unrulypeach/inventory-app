const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const { mongoClient } = require('../mongoUtil');

exports.rarities_list = asyncHandler(async(req, res, next) => {
  try{
    const database = mongoClient.db('inventory_info');
    const rarities = database.collection('rarity');
    const rarities_list = await rarities.find({}).toArray();

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