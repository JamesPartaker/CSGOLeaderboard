
var parser = {};

//checks the line type using regex
//and parses based on the line
parser.parseLine = function(line){
  //var cleanRegex = /s/\(L\s\+\S\+\s\+\S\+\s\+\S\+\s\+\|\[\S\+\s\+\S\+\s\+\S\+\]\s\+\)//g;
  var killRegex = /".*?"\s\+killed\s+".*"/;
  //var bombDefuseRegex = new RegExp('');
  var bombPlantRegex =  new RegExp('');

  if(killRegex.test(line)){
    return parseKill(line);
  }else if(bombDefuseRegex.test(line)){
    return parseBombDefuse(line);
  }else if(bombPlantRegex.test(line)){
    return parseBombPlant(line);
  }else{
    return {};
  }


};

function parseKill(line){
  return {type: 'kill'};
}

function parseBombDefuse(line){
  return {type: 'bombDefuse'};
}

function parseBombPlant(line){
  return {type: 'bombPlant'};
}

module.exports = parser;