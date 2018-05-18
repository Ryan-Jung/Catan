module.exports = (db) => {
  const playerFunctions = {};

  playerFunctions.findPlayerGame = (userId) => {
    return db.one('SELECT game_id FROM "players" WHERE user_id = $1',
                  [userId]);
  }

  playerFunctions.findPlayerId = (userId) => {
    return db.one('SELECT id FROM "players" WHERE user_id = $1',[userId]);
  }

  playerFunctions.addDevCard = (userId, gameId, devCard) => {
    return playerFunctions.findPlayerId(userId)
    .then( ({id}) =>
      db.none('INSERT INTO "dev_cards" (player_id,game_id,dev_card_type)' +
                  'VALUES ($1,$2,$3)', [id,gameId,devCard])
    )
  }

  playerFunctions.addResource = (userId,gameId,type,count) => {
    return playerFunctions.findPlayerId(userId)
      .then( ({id}) =>
        db.one('INSERT INTO "player_resources" (player_id,game_id,resource_type,count) '
                  + 'VALUES ($1,$2,$3,$4) RETURNING id', [id,gameId,type,count])
      )

  }

  playerFunctions.getResources = (userId,gameId) => {
    return playerFunctions.findPlayerId(userId)
      .then( ({id}) =>
        db.any('SELECT resource_type, count FROM "player_resources" '
                  + 'WHERE player_id = $1 AND game_id = $2',[id,gameId])
    )
  }

  playerFunctions.getDevCards = (userId,gameId) => {
    return playerFunctions.findPlayerId(userId)
      .then( ({id}) =>
        db.any('SELECT dev_card_type, COUNT(*) FROM dev_cards'
              +' WHERE game_id = $1 AND player_id = $2'
              +' GROUP BY dev_card_type'
              ,[gameId,id])
    )
  }

  playerFunctions.updateResources = (userId,gameId,type,additional) =>{
    return playerFunctions.findPlayerId(userId)
      .then( ({id}) =>
        db.none('UPDATE "player_resources" SET count = count + $1'
                  +' WHERE player_id = $2' +
                    'AND game_id = $3'
                    +'AND UPPER(resource_type) = UPPER($4)',
                    [additional,id,gameId,type])
    )
  }

  playerFunctions.buildBuilding = (playerId,gameId,x_cord,y_cord,buildingType) => {
    return playerFunctions.findPlayerId(userId)
    .then( ({id}) =>
      db.none('UPDATE game_vertices SET user_id = $1, item = $2'
                    +'WHERE x = $3 AND y = $4 AND game_id = $5',
                    [id,buildingType,x_cord,y_cord,gameId])
    )
  }

  playerFunctions.buildRoad = (playerId,gameId,vertexStartId,vertexEndId) =>{
    return db.one('INSERT into "connections" (vertex_start,vertex_end,player_id,game_id)'
            +' VALUES ($1,$2,$3,$4) RETURNING connection_id', [vertexStartId,vertexEndId,playerId,gameId]);
  }

  playerFunctions.getOwnedRoads = (playerId,gameId) => {
    return db.many('SELECT * FROM "connections" WHERE player_id = $1 AND game_id = $2',
                  [playerId,gameId]);
  }

  return playerFunctions;
}
