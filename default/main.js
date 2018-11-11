// My First Nemesis: Drime
// Home Base: E31N18

// My First Victim: IhhMaa
// Former Base: E38N4

const profiler = require('screeps-profiler');

// Import statements
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleAttacker = require('role.attacker');
var hiveNeeds = require('hive.needs');
var behaviourInstinct = require('behaviour.instinct');
var roleLeech = require('role.leech');
var roleTransporter = require('role.transporter');

var spawnName = 'free';
var baseRoomName = 'E39N4';
var cloneBuild = [WORK, CARRY, MOVE, MOVE];
var energyBuild = WORK + CARRY + MOVE + MOVE;

var harvesterLimit = 2;
var upgraderLimit = 2;
var builderLimit = 2;
var defenseRepairerLimit = 1;
var storageRepairerLimit = 1;
var repairerLimit = 3;
var attackerLimit = 0;

var reportDelay = 200;

var sourceContainerOne = '5be4d03affdf6f463ce546e6';
var sourceContainerTwo = '5be35a3b7cf1c10e3467dd23';

var resourceContainerOne = '5be363f60c7a3e46243e96f3';
var resourceContainerTwo = '5be58c217cf1c10e3468e80c';
var resourceContainerThree = '5be5961ef8bdbf0aaf90d5fb';

var mainStorage = '5be6fb65607f59232a7b1383';


profiler.enable();

// main loop
module.exports.loop = function () {
    profiler.wrap(function() {
    var creating = false;
    
    // clear memory of dead creeps if they exist
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    var harvesters = _.sum(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.sum(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.sum(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var repairers = _.sum(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var defenseRepairers = _.sum(Game.creeps, (creep) => creep.memory.role == 'repairer' && creep.memory.repairRole == 'defenses');
    var storageRepairers = _.sum(Game.creeps, (creep) => creep.memory.role == 'repairer' && creep.memory.repairRole == 'storage');
    var attackers = _.sum(Game.creeps, (creep) => creep.memory.role == 'attacker');
    var leeches = _.sum(Game.creeps, (creep) => creep.memory.role == 'leech');
    var transporters = _.sum(Game.creeps, (creep) => creep.memory.role == 'transporter');
    
    var baseEnergyAvailable = Game.rooms[baseRoomName].energyAvailable;
    var baseEnergyReserve = 0;
    var baseEnergyResource = baseEnergyAvailable - baseEnergyReserve;
    
    if (Game.time % reportDelay == 0) {
        var report = reportDelay + " cycle report!";
        report = report.concat("\nEnergyAvailable: " + baseEnergyResource + "/" + Game.rooms[baseRoomName].energyCapacityAvailable + " (Buffer: " + baseEnergyReserve + ")");
        report = report.concat("\n------------------");
        report = report.concat('\nHarvesters: ' + harvesters);
        report = report.concat('\nBuilders: ' + builders);
        report = report.concat('\nUpgraders: ' + upgraders);
        report = report.concat('\nRepairers: ' + repairers);
        report = report.concat(' (Defense:' + defenseRepairers);
        report = report.concat(', Storage: ' + storageRepairers + ')');
        report = report.concat('\nAttackers: ' + attackers);
        report = report.concat('\nLeeches: ' + leeches);
        report = report.concat('\nTransporters: ' + transporters);
        console.log(report);
    }

    if (harvesters < harvesterLimit && !creating) {
        if (baseEnergyResource > roleHarvester.bodyCost) {
            Game.spawns[spawnName].spawnCreep(
                roleHarvester.body, 
                'harvester' + Game.time, {
                    memory: {
                        role: 'harvester', 
                        version: roleHarvester.version
                    }
                }
            );
        }
    }

    if (upgraders < upgraderLimit && !creating) {
        if (baseEnergyResource > roleUpgrader.bodyCost) {
            Game.spawns[spawnName].spawnCreep(
                roleUpgrader.body, 
                'upgrader' + Game.time , {
                    memory: {
                        role: 'upgrader', 
                        version:roleUpgrader.version
                    }
                }
            );
        }
    }

    if (builders < builderLimit && !creating) {
        if (baseEnergyResource > roleBuilder.bodyCost) {
            Game.spawns[spawnName].spawnCreep(
                roleBuilder.body,  
                'builder' + Game.time, {
                    memory: {
                        role: 'builder', 
                        version: roleBuilder.version
                    }
                }
            );
        }
    }
    
    if (storageRepairers < storageRepairerLimit && !creating) {
        if (baseEnergyResource > roleRepairer.bodyCost) {
            Game.spawns[spawnName].spawnCreep(
                roleRepairer.body, 
                'repairer' + Game.time, {
                    memory: {
                        role: 'repairer', 
                        version: roleRepairer.version,
                        repairRole: 'storage'
                    }
                }
            );
        }           
    }

    if (defenseRepairers < defenseRepairerLimit && !creating) {
        if (baseEnergyResource > roleRepairer.bodyCost) {
            Game.spawns[spawnName].spawnCreep(
                roleRepairer.body, 
                'repairer' + Game.time, {
                    memory: {
                        role: 'repairer', 
                        version: roleRepairer.version,
                        repairRole: 'defenses'
                    }
                }
            );
        }           
    }

    if (repairers < repairerLimit && !creating) {
        if (baseEnergyResource > roleRepairer.bodyCost) {
            Game.spawns[spawnName].spawnCreep(
                roleRepairer.body, 
                'repairer' + Game.time, {
                    memory: {
                        role: 'repairer', 
                        version: roleRepairer.version
                    }
                }
            );
        }        
    }
    
    if (attackers < attackerLimit && !creating) {
        if (baseEnergyResource >  roleAttacker.bodyCost) {
            Game.spawns[spawnName].spawnCreep(roleAttacker.body, undefined, {memory: {role: 'attacker', version: roleAttacker.version}});
        }        
    }    

    /*
    Game.spawns.free.spawnCreep( [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE], 'leechtrial' , {
            memory: {
                role: 'leech', 
                version: '1.0', 
                sourceId: '5bbcaf439099fc012e63a648', 
                containerId: '5be35a3b7cf1c10e3467dd23'
        }
    });
    */
    Game.spawns.free.spawnCreep( [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], 'transporterTrial3' , {
            memory: {
                role: 'transporter', 
                version: '1.0', 
                sourceContainerId: resourceContainerTwo, 
                destinationContainerId: resourceContainerThree
        }
    });

    if(Game.spawns[spawnName].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns[spawnName].spawning.name];
        Game.spawns[spawnName].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns[spawnName].pos.x + 1, 
            Game.spawns[spawnName].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    var towers = Game.rooms[baseRoomName].find(FIND_STRUCTURES, {
        filter: (structure) => structure.structureType == STRUCTURE_TOWER
    });
    var target = towers[0].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (target) {
        tower.attack(target);
    }

    for(var name in Game.creeps) {
        
        var creep = Game.creeps[name];
        
        if (creep.memory.behaviour != 'instinct' && creep.ticksToLive < 100) {
            creep.memory.behaviour = 'instinct';
            creep.say('😓 panic');
            if(creep.memory.role == 'leech') {
                creep.memory.inPosition = false;
            }
        }
        
        if (creep.memory.behaviour == 'instinct' && creep.ticksToLive > 1400) {
            creep.memory.behaviour = 'role';
            creep.say('😊 sane');
        }
        if (creep.memory.behaviour == 'instinct') {
            behaviourInstinct.run(creep, spawnName);
        } else {
            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            if(creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }        
            if(creep.memory.role == 'repairer') {
                roleRepairer.run(creep);
            }
            if(creep.memory.role == 'attacker') {
                roleAttacker.run(creep);
            }
            if(creep.memory.role == 'leech') {
                roleLeech.run(creep);
            }
            if(creep.memory.role == 'transporter') {
                roleTransporter.run(creep);
            }            
        }
    }
    });
}