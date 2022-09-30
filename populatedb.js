#! /usr/bin/env node

console.log('This script populates some test weapons and cateogories to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Weapon = require('./models/weapon')
var Category = require('./models/category')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var weapons = []
var categories = []

function weaponCreate(name, description, category, price, number_in_stock, cb) {
  weapondetail = {name: name, description: description, category: category, price: price, number_in_stock: number_in_stock}
  
  var weapon = new Weapon(weapondetail);
       
  weapon.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Weapon: ' + weapon);
    weapons.push(weapon)
    cb(null, weapon)
  }  );
}

function categoryCreate(name, description, cb) {
  var category = new Category({ name: name, description: description});
       
  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Category: ' + category);
    categories.push(category)
    cb(null, category);
  }   );
}

function createWeapons(cb) {
    async.series([
      function(callback) {
        weaponCreate('Mace', 'Mace is a Hammer in Elden Ring. The Mace scales primarily with Strength and Dexterity and is a good Weapon for breaking through guards and stances. This weapon is ideal for delivering powerful strikes against enemies with a strong guard.', 'Hammers', 100, 10, callback);
      },
      function(callback) {
        weaponCreate('Morning Star', 'Morning Star is a Hammer in Elden Ring. The Morning Star scales primarily with Strength and Dexterity and is a good Weapon for bludgeoning enemies and dealing high damage and blood loss effects. ', 'Hammers', 100, 10, callback);
      },
      function(callback) {
        weaponCreate('Club', 'Club is a Hammer in Elden Ring. The Club scales with Strength and is a good Weapon for melee users who dont invest many points into Strength.', 'Hammers', 100, 10, callback);
      },
      function(callback) {
        weaponCreate('Dagger', 'Dagger is the basic Dagger in Elden Ring. The Dagger scales primarily with Strength and Dexterity and is a good Weapon for short-ranged melee combat, and for when you need an extra lightweight utility weapon on hand.  ', 'Daggers', 100, 10, callback);
      },
      function(callback) {
        weaponCreate('Parrying Dagger', 'Parrying Dagger is a Dagger in Elden Ring. The Parrying Dagger scales primarily with Dexterity and Strength and is a good Weapon for parrying enemies as its name states. It is accommodated with the Parry skill and can deflect enemy attacks while potentially providing an opening for your next attack. ', 'Daggers', 100, 10, callback);
      },
      function(callback) {
        weaponCreate('Wakizashi', 'Wakizashi is a Dagger in Elden Ring. The Wakizashi scales primarily with Strength and Dexterity and is a good Weapon for short range melee combat. This dagger is paired with the Quickstep skill to help gain an advantage in position. This potentially can avoid damage while provide an opening to follow up with a combo of attacks. ', 'Daggers', 100, 10, callback);
      },
      function(callback) {
        weaponCreate('Short Sword', 'Short Sword is a Straight Sword in Elden Ring. The Short Sword scales primarily with Strength and Dexterity and is a good Weapon for having a variety of Pierce and standard attacks. ', 'Straight Swords', 100, 10, callback);
      },
      function(callback) {
        weaponCreate('Longsword', 'Longsword is a Straight Sword in Elden Ring. The Longsword scales primarily with Strength and is a good Weapon for melee users who want to remain mobile during combat.', 'Straight Swords', 100, 10, callback);
      },
      function(callback) {
        weaponCreate('Broadsword', 'Broadsword is a Straight Sword in Elden Ring. The Broadsword scales primarily with Strength and Dexterity and is a good Weapon for melee combat, and dealing slashing attacks to enemies. ', 'Straight Swords', 100, 10, callback);
      },
      function(callback) {
        weaponCreate('Bastard Sword', 'Bastard Sword is a Greatsword in Elden Ring. The Bastard Sword scales primarily with Strength and Dexterity is a good Weapon for melee users who want to perform longer-reaching heavier hits. ', 'Greatswords', 100, 10, callback);
      },
      function(callback) {
        weaponCreate('Claymore', 'Claymore is a Greatsword in Elden Ring. The Claymore scales primarily with Dexterity and Strength  and is a good Weapon for high-strength wielders or for strong characters that are confident to go into battle with this usually two-handed weapon. It is a versatile option.', 'Greatswords', 100, 10, callback);
      },
      function(callback) {
        weaponCreate('Flamberge', 'Flamberge is a Greatsword in Elden Ring. The Flamberge scales primarily with Strength and Dexterity and is a good Weapon for Standard and Pierce damage. Its accompanying unique skill can also allow the user to brace armament and step into a low stance that prevents recoil from most enemy attacks, which will be followed up with a strong upward strike. ', 'Greatswords', 100, 10, callback);
      },
      function(callback) {
        weaponCreate('Zweihander', 'Zweihander is a Colossal Sword in Elden Ring. The Zweihander scales primarily with Strength and Dexterity, and is a versatile Weapon for heavy-weight combat. This weapon, the lightest of all colossal swords, is able to set a devastating tempo for an encounter through its flexible moveset. ', 'Colossal Swords', 100, 10, callback);
      },
      function(callback) {
        weaponCreate('Greatsword', 'Greatsword is a Colossal Sword in Elden Ring. The Greatsword scales primarily with Strength and is a good Weapon for cleaving many foes at once with its wide swings. ', 'Colossal Swords', 100, 10, callback);
      },
      function(callback) {
        weaponCreate('Starscourge Greatsword', 'Starscourge Greatsword is a Colossal Sword in Elden Ring. The Starscourge Greatsword scales primarily with Intelligence, Strength, and Dexterity and is a good Weapon for pulling in enemies using its unique skill, Starcaller Cry. ', 'Colossal Swords', 100, 10, callback);
      },
      function(callback) {
        weaponCreate('Rapier', 'Rapier is a Thrusting Sword in Elden Ring. The Rapier scales primarily with Strength and Dexterity, and is a good Weapon for mobility during combat. This sword is lightweight, but sharp. ', 'Thrusting Swords', 100, 10, callback);
      },
      function(callback) {
        weaponCreate('Estoc', 'Estoc is a Thrusting Sword in Elden Ring. The Estoc scales primarily with Strength and Dexterity is a good Weapon for dealing melee piercing damage and slashing attacks. ', 'Thrusting Swords', 100, 10, callback);
      },
      function(callback) {
        weaponCreate('Rogier Rapier', 'Rogier Rapier is a Thrusting Sword in Elden Ring. The Rogier Rapier scales primarily with Strength and Dexterity and is a versatile sparring Weapon for landing quick empowered hits.', 'Thrusting Swords', 100, 10, callback);
      },
      function(callback) {
        weaponCreate('Scimitar', 'Scimitar is a Curved Sword in Elden Ring. The Scimitar scales primarily with Strength and Dexterity is a good Weapon for Melee-Based Strength and Dexterity characters. ', 'Curved Swords', 100, 10, callback);
      },
      function(callback) {
        weaponCreate('Falchion', 'Falchion is a Curved Sword in Elden Ring. The Falchion scales primarily with Dexterity and Strength and is a good Weapon for Slashing less heavy enemies. This weapon is ideal for clearing smaller enemies in numbers but can be deemed ineffective against foes with thicker armor.  ', 'Curved Swords', 100, 10, callback);
      },
      function(callback) {
        weaponCreate('Shotel', 'Shotel is a Curved Sword in Elden Ring. The Shotel scales primarily with Strength and Dexterity and is a good Weapon for melee attacks and dealing damage with body spins by using the Spinning Slash skill.  ', 'Curved Swords', 100, 10, callback);
      },
      function(callback) {
        weaponCreate('Hand Axe', 'Hand Axe is an Axe in Elden Ring. The Hand Axe scales primarily with Strength and Dexterity, and is a good Weapon for close combat characters, exceling in successive attacks. ', 'Axes', 100, 10, callback);
      },
      function(callback) {
        weaponCreate('Battle Axe', 'Battle Axe is an Axe in Elden Ring. The Battle Axe scales primarily with Strength and Dexterity is a good Weapon for melee users who want to deal considerable damage with each swing.', 'Axes', 100, 10, callback);
      },
      function(callback) {
        weaponCreate('Iron Cleaver', 'Iron Cleaver is a Axe in Elden Ring. The Iron Cleaver scales primarily with Dexterity and Strength and is a good Weapon for aggressive fighters who like to face foes head on. This weapon allows players to take swing after swing especially with the Skill, Wild Strikes. ', 'Axes', 100, 10, callback);
      },
      ],
      // optional callback
      cb);
}


function createCategories(cb) {
    async.parallel([
        function(callback) {
          categoryCreate('Hammers', 'Hammers are a type of Weapon in Elden Ring. Hammers can deal powerful but slow attacks against Enemies and Bosses. Hammers are renowned for their effectiveness against heavily armored enemies as well as destroying shields and breaking guards. ', callback);
        },
        function(callback) {
          categoryCreate('Daggers', 'Daggers are a type of Weapon in Elden Ring. Daggers have extremely short range, but they make up for it with fast attack speed and high Critical Damage which allows them to do devastating Backstabs and Ripostes. If you plan to play a stealthy character, or one that Backstabs and Parries often, then this might be a good weapon for you.', callback);
        },
        function(callback) {
          categoryCreate('Straight Swords', 'Straight Swords are a type of Weapon in Elden Ring. Straight Swords are reliable weapons that provide a balance between slashing and thrusting attacks, and they can be used to inflict great amount of damage on Enemies or Bosses. Straight Swords are some of the easiest Weapons to use in Elden Ring, and work well when combined with a Shield, allows for quick follow up attacks after Blocking.', callback);
        },
        function(callback) {
          categoryCreate('Greatswords', 'Greatswords are a type of Weapon in Elden Ring. Greatswords are capable of inflicting a massive amounts of damage, but sacrifice mobility, making the player vulnerable and open to enemy and boss attacks if they are not careful. High risk, high reward is the name of the game with these Weapons, but they can pancake many enemies, allowing you to finish them off unscathed.', callback);
        },
        function(callback) {
          categoryCreate('Colossal Swords', 'Colossal Swords are a type of Weapon in Elden Ring. Colossal Swords replace Ultra Greatswords from the Souls series. As their name implies, Colossal Swords are oversized swords, with lengths often exceeding the height of the Tarnished themselves. While they are extremely heavy and swing much slower than other swords, they make up for it with a long reach and massive damage output.', callback);
        },
        function(callback) {
          categoryCreate('Thrusting Swords', 'Thrusting Swords are a type of Weapon in Elden Ring. Thrusting Swords strike a balance between moderate damage, fast attacks, and good reach, while piercing and slashing Enemies.', callback);
        },
        function(callback) {
          categoryCreate('Curved Swords', 'Curved Swords are a type of Weapon in Elden Ring. Curved Swords specialize in slashing attacks, and are capable of inflicting damage on hostile creatures without sacrificing mobility. They can also attack more quickly than many other melee weapons in Elden Ring, making them excellent against fast-moving opponents.', callback);
        },
        function(callback) {
          categoryCreate('Axes', 'Axes are a type of Weapon in Elden Ring. Axes are heavy weapons that can be wielded with one hand. They are best used in close combat and provide wide variety of attacks.', callback);
        },
        ],
        // optional callback
        cb);
}

async.series([
    createWeapons,
    createCategories
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Categories: '+categories);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});