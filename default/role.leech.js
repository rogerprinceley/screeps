/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.leech');
 * mod.thing == 'a thing'; // true
 */

var roleLeech = {
    version: 1.0,
    body: [WORK, WORK, MOVE, MOVE],
    run: function (creep) {
        var source = Game.getObjectById(creep.memory.sourceId);
        if (creep.memory.inPosition) {
            if(creep.pos.lookFor(LOOK_RESOURCES).length) {

            } else {
                creep.memory.idle = false;
                creep.harvest(source, RESOURCE_ENERGY);
            }
        } else {
            var container = Game.getObjectById(creep.memory.containerId);
            if(container) {
                if(creep.pos.isEqualTo(container.pos)) {
                    creep.memory.inPosition = true;
                    creep.memory.idle = false;
                    creep.harvest(source, RESOURCE_ENERGY);
                } else {
                    creep.memory.idle = false;
                    creep.moveTo(container.pos);
                }
            } else {
                creep.memory.idle = true;
            }
        }
    }
};

module.exports = roleLeech;