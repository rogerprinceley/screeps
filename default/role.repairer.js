/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.repairer');
 * mod.thing == 'a thing'; // true
 */

var roleRepairer = {
    version: 1.1,
    body: [WORK, CARRY, MOVE, MOVE],
    bodyCost: 250,
    /** @param {Creep} creep **/
    run: function(creep) {

        var roleUpgrader = require('role.upgrader');
        
        var structureRepairLimit = 35000;
        
        if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
            creep.say('🔧 repair');
        }

        if(creep.memory.repairing) {
            if(creep.memory.repairRole == 'defenses' ) {
                var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < structureRepairLimit && 
                            ( structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART ) &&
                            structure.structureType != STRUCTURE_CONTAINER
                });
            } else if(creep.memory.repairRole == 'storage' ) {
                var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < structureRepairLimit && structure.structureType == STRUCTURE_CONTAINER 
                });
            } else {
                var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (road) => road.hits < road.hitsMax && road.structureType !=  STRUCTURE_WALL && road.structureType != STRUCTURE_RAMPART
                });
            }
            if(target != undefined) {
                if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
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

module.exports = roleRepairer;