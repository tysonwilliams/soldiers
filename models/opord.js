var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var simpleOpordSchema = new Schema({
    creator: {
        type: ObjectId,
        ref: "Soldier",
        required: true,
    },
    situation: String,
    mission: String,
    execution: String,
    sustainment: String,
    commandAndControl: String
});

//var fullOpordSchema = new Schema({
//    creator: {
//        type: ObjectId,
//        ref: "Soldier",
//        required: true,
//    },
//    situation: {
//        areaOfInterest: String,
//        areaOfOperations: {
//            terrain: String,
//            weather: String
//        },
//        enemyForces: {
//            composition: String,
//            disposition: String,
//            strength: String,
//            recentActivities: String,
//            locations: String,
//            capabilities: String,
//            enemyCOA: String
//        },
//        friendlyForces: {
//            higherMissionAndIntent: String,
//            missionOfAdjacentUnits: String
//        }
//    },
//    mission: String,
//    execution: {
//        commandersIntent: String,
//        conceptOfOperations: {
//            maneuver: String,
//            fires: String,
//            reconAndSurveillance: String,
//            intelligence: String,
//            engineer: String,
//            airDefense: String,
//            informationOperations: String
//        },
//        schemeOfMovementAndManeuver: String,
//        schemeOfFires: String,
//        casualtyEvacuation: String,
//        tasksToSubordinateUnits: [String],
//        tasksToCombatSupport: {
//            intelligence: String,
//            engineer: String,
//            fireSupport: String,
//            airDefense: String,
//            signal: String,
//            cbrne: String,
//            provostMarshal: String,
//            miso: String,
//            civilMilitary: String
//        },
//        coordinatingInstructions: {
//            whenPlanBecomesEffective: String,
//            ccir: String,
//            eefi: String,
//            rrcm: String,
//            roe: String,
//            environmentalConsiderations: String,
//            forceProtection: String
//        }
//    },
//    sustainment: {
//        logistics: {
//            sustainmentOverlay: String,
//            maintenance: String,
//            transportation: String,
//            supply: String,
//            fieldServices: String
//        },
//        personnelServicesSupport: {
//            methodOfMarkingAndHandlingEPW: String,
//            religiousServices: String
//        },
//        healthSystemSupport: {
//            medicalCommandAndControl: String,
//            medicalTreatment: String,
//            medicalEvaction: String,
//            preventiveMedicine: String
//        }
//    },
//    commandAndControl: {
//        command: {
//            locationOfCommander: String,
//            successionOfCommand: String
//        },
//        control: {
//            commandPosts: String,
//            reports: String
//        },
//        signal: {
//            soiInEffect: String,
//            methodsOfCommunicationByPriority: String,
//            pyrotechnicsAndSignals: String,
//            codeWords: String,
//            challengeAndPassword: String,
//            numberCombination: Number,
//            runningPassword: String,
//            recognitionSignals: String
//        }
//    }
//});

module.exports = mongoose.model("Opord", simpleOpordSchema);
//module.exports = mongoose.model("FullOpord", fullOpordSchema);