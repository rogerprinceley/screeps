/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.attacker');
 * mod.thing == 'a thing'; // true
 */
var behaviourInstinct = require('behaviour.instinct');

var roleAttacker = {
    version: 1.0,
    body: [ATTACK, TOUGH, RANGED_ATTACK, MOVE, MOVE, MOVE],
    bodyCost: 360,
    /** @param {Creep} creep **/
    run: function(creep) {
        /*
        if(creep.memory.attackMode == 'runAndGun') {
            var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            creep.memory.currentTarget = target.Id
        }
        */
        var moveFlags = _.filter(Game.flags, (flag) => flag.color == COLOR_YELLOW && flag.room == creep.room);
        if(moveFlags.length) {
            creep.moveTo(moveFlags[0]);
        } else {
            var target = creep.pos.findClosestByRange(FIND_HOSTILE_SPAWNS);
            if(target) {
                if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                } else {
                    creep.rangedAttack(target);
                }
            }
            /*
            var warFlags = _.filter(Game.flags, (flag) => flag.color == COLOR_RED);
            if(warFlags.length) {
                var distance = creep.pos.getRangeTo(warFlags[0]);
                if(distance < 4) {
                    console.log(creep.name + ': In range to attack');
                    var structure = null;1
                    for(var x in warFlags[0].pos.lookFor(LOOK_STRUCTURES)) {
                        console.log(x);
                    }
                    if(structure) {
                        creep.rangedAttack(structure.structure);
                        if(distance == 1) {
                            creep.attack(structure);
                            console.log(creep.name + ': I will attack' + structure.type + 'now!');
                        }
                    }
                }
            } else {
                if(creep.ticksToLive < 1400) {
                    behaviourInstinct.run(creep, 'free');
                } else {
                    if(!creep.pos.inRangeTo(Game.flags.Home, 5)) {
                        creep.moveTo(Game.flags.Home, {visualizePathStyle: {stroke: '#ff00ff'}});
                    }
                }
            }*/
        }
    }
};

module.exports = roleAttacker;