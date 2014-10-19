
var parser = {};

//checks the line type using regex
//and parses based on the line
parser.parseLine = function(line){

    var cleanRegex = /L\s+\S+\s+\S+\s+\S+\s+|\[\S+\s+\S+\s+\S+\]\s+/g;
    var killRegex = /".*?"\s+killed\s+".*?"/;
    var bombDefuseRegex = /".*?"\s+triggered\s+"Defused_The_Bomb"/;
    var bombPlantRegex =  /".*?"\s+triggered\s+"Planted_The_Bomb"/;
    line = line.replace(cleanRegex, "");

    if(killRegex.test(line)){
        return parseKill(line);
    }
    else if(bombDefuseRegex.test(line)){
        return parseBombDefuse(line);
    }else if(bombPlantRegex.test(line)){
        return parseBombPlant(line);
    }else{
        return null;
    }

};

function parseUsername(steamIdentifier){
    var split = steamIdentifier.replace(/<|>|"/g," ").trim().split(/\s+/);

    return {
        user: split[0],
        team: split[3]
    }
}

function parseKill(line){

    split = line.trim().split(/\s+/);

    var killer = parseUsername(split[0]);
    var victim = parseUsername(split[2]);
    var headshot = split.length == 6;

    return {
        type: 'kill',
        killer: killer.user,
        victim: victim.user,
        weapon: split[4].replace(/"/g, ""),
        headshot: headshot

    }
}

function parseBombDefuse(line){

    split = line.trim().split(/\s+/);
    var defuser = parseUsername(split[0]);

    return {
        type: 'bombDefuse',
        defuser: defuser.user
    };
}

function parseBombPlant(line){

    split = line.trim().split(/\s+/);
    var planter = parseUsername(split[0]);

    return {
        type: 'bombPlant',
        planter: planter.user
    };
}

module.exports = parser;
