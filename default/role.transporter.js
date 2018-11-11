/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.transporter');
 * mod.thing == 'a thing'; // true
 */

var roleTransporter = {
    version: 1.0,
    body: [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
    run: function (creep) {
        var destination = Game.getObjectById(creep.memory.destinationContainerId);
        var source = Game.getObjectById(creep.memory.sourceContainerId);
        
        if(source && destination) {
            if(creep.carry.energy < creep.carryCapacity) {
                if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                if(creep.transfer(destination, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(destination, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};

module.exports = roleTransporter;