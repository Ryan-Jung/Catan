'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('players', ['user_id'],{
                              type: 'foreign key',
                              name: 'player_user_id_fk',
                              references:{
                                  table:'users',
                                  field:'id'
                              }
                            }
            )
            .then( () => queryInterface.addConstraint('player_resources', ['player_id'], {
                              type: 'foreign key',
                              name: 'player_resources_player_id_fk',
                              references:{
                                  table: 'players',
                                  field: 'id'
                                },
                                onDelete:'cascade'
                            }
            ))
            .then( () => queryInterface.addConstraint('player_resources',['game_id'], {
                              type: 'foreign key',
                              name: 'player_resources_game_id_fk',
                              references:{
                                  table: 'games',
                                  field: 'id'
                              },
                                onDelete: 'cascade'
                            }
            ))
            .then( () => queryInterface.addConstraint('dev_cards',['game_id'],{
                                type: 'foreign key',
                                name: 'dev_cards_game_id_fk',
                                references: {
                                  table: 'games',
                                  field: 'id'
                                },
                                onDelete: 'cascade'
                          }
            ))
            .then( () => queryInterface.addConstraint('dev_cards',['player_id'],{
                            type: 'foreign key',
                            name: 'dev_cards_player_id_fk',
                            references: {
                                table: 'players',
                                field: 'id'
                            },
                            onDelete: 'cascade'
                          }
            ));
  },

  down: (queryInterface, Sequelize) => {

  }
};
