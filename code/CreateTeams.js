var console = require('console');

module.exports.function = function createTeams(everyoneFlag, player) {

  var playerPool = player
  var TeamOne = []
  var TeamTwo = []
  let diff = 100
  let teamSize = Math.round(playerPool.length / 2)
  let sumImpact = 0 // total available impact of players in the game
  let teamOneImpact = 0
  let teamTwoImpact = 0
  var unfair = true

  for (var i in playerPool) {
    sumImpact = sumImpact + playerPool[i].playerImpact
  }

  if (playerPool.length % 2 == 0) {
    var MAX_DIFF = 15

  } else {
    var MAX_DIFF = 8
  }

  

  console.log("teams are even")
  while (unfair == true) {
    //  randomly assign teamSize players to new array TeamOne, calculate TeamOneImpact, repeat until teams are fair
    
    for (i = 0; i < teamSize; i++) {
      var randomIndex = Math.floor(Math.random() * playerPool.length)
      var temp = playerPool.splice(randomIndex, 1)
      TeamOne.push(temp[0])
    }

    teamOneImpact = 0
    for (var i in TeamOne) {
      teamOneImpact = teamOneImpact + TeamOne[i].playerImpact
    }
    teamTwoImpact = sumImpact - teamOneImpact
    diff = Math.abs(teamTwoImpact - teamOneImpact)
    console.log(TeamOne)
    console.log("Team One Impact: " + teamOneImpact)
    console.log("Diff: " + diff)
    if (diff <= MAX_DIFF) {
      TeamTwo = playerPool
      unfair = false
    }
    else {
      //  need to reset PlayerPool to original list of players

      playerPool = playerPool.concat(TeamOne)
      TeamOne = []
      unfair = true
    }

  }

  //  assign remaining players to new array TeamTwo, calculate TeamTwoImpact
  //  diff = math.abs(TeamOneImpact - TeamTwoImpact)


  var teamOneObject = {
    players: TeamOne,
    teamImpact: teamOneImpact
  }
  var teamTwoObject = {
    players: TeamTwo,
    teamImpact: teamTwoImpact
  }
  var teams = []
  teams[0] = teamOneObject
  teams[1] = teamTwoObject
  return teams
}


