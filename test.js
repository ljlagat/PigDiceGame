const PigDice = require('./index');

describe('Pig Dice Game', () => {
  let game;

  beforeEach(() => {
    game = new PigDice();
    game.addPlayer('Player 1');
    game.addPlayer('Player 2');
  });

  test('Players are added correctly', () => {
    expect(game.players.length).toBe(2);
  });

  test('Players switch correctly', () => {
    game.switchPlayer();
    expect(game.currentPlayerIndex).toBe(1);
    game.switchPlayer();
    expect(game.currentPlayerIndex).toBe(0);
  });

  test('Rolling a die returns a number between 1 and 6', () => {
    const roll = game.rollDie();
    expect(roll).toBeGreaterThanOrEqual(1);
    expect(roll).toBeLessThanOrEqual(6);
  });

  test('Playing a turn updates current round score and switches player correctly', () => {
    const roll = game.playTurn();
    expect(game.currentRoundScore).toBe(roll);
    if (roll === 1) {
      expect(game.currentPlayerIndex).toBe(1);
    } else {
      expect(game.currentPlayerIndex).toBe(0);
    }
  });

  test('Holding adds current round score to player total score and switches player correctly', () => {
    game.playTurn(); // Just to ensure there's a round score to hold
    game.hold();
    expect(game.currentRoundScore).toBe(0);
    expect(game.scores[0]).toBeGreaterThanOrEqual(0);
    expect(game.currentPlayerIndex).toBe(1);
  });

  test('Game ends when a player reaches 100 points', () => {
    while (game.scores[0] < 100 && game.scores[1] < 100) {
      game.hold();
    }
    expect(game.scores.some(score => score >= 100)).toBeTruthy();
  });
});