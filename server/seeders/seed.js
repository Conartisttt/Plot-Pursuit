const db = require('../config/connection');
const { Profile } = require('../models');
const bookSeeds = require('./profileSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Books', 'Books');
    
    await Profile.create(bookSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
