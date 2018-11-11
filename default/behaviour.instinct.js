/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('behaviour.instinct');
 * mod.thing == 'a thing'; // true
 */

var behaviourInstinct = {
    /** @param {Creep} creep **/
    run: function(creep, spawnName) {
        var spawn = Game.spawns[spawnName]
        if(spawn.renewCreep(creep) == ERR_NOT_IN_RANGE) {
            creep.moveTo(spawn);
        }
        
    }
};

module.exports = behaviourInstinct;