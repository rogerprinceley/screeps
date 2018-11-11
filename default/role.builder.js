/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.builder');
 * mod.thing == 'a thing'; // true
 */

var roleBuilder = {
    version: 1.1,
    body: [WORK, CARRY, MOVE, MOVE],
    bodyCost: 500,
    /** @param {Creep} creep **/
    run: function(creep) {
        
        //var roleRepairer = require('role.repairer');
        var roleUpgrader = require('role.upgrader');

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            var target = null;
            var priorityStructures = creep.room.find(FIND_CONSTRUCTION_SITES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_EXTENSION || 
                               structure.structureType == STRUCTURE_STORAGE || 
                               structure.structureType == STRUCTURE_TOWER;
                    }
            });
            if(priorityStructures.length) {
                target = priorityStructures[0];
            } else {
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(targets.length) {
                    target = targets[0];
                }
                
            }
            if(target) {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                //roleRepairer.run(creep);
                roleUpgrader.run(creep);
            }
        }
        else {
            var resourceContainer = Game.getObjectById('5be58c217cf1c10e3468e80c');
            if(creep.withdraw(resourceContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(resourceContainer, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleBuilder;