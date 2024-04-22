class PigDice {
    constructor() {
      this.players = [];
      this.currentPlayerIndex = 0;
      this.scores = [0, 0];
      this.currentRoundScore = 0;
    }
  
    addPlayer(playerName) {
      this.players.push(playerName);
    }
  
    rollDie() {
      return Math.floor(Math.random() * 6) + 1;
    }
  
    switchPlayer() {
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
      this.currentRoundScore = 0;
    }
  
    playTurn() {
      const roll = this.rollDie();
      if (roll === 1) {
        this.currentRoundScore = 0;
        this.switchPlayer();
        return 0;
      } else {
        this.currentRoundScore += roll;
        return roll;
      }
    }
  
    hold() {
      this.scores[this.currentPlayerIndex] += this.currentRoundScore;
      const winnerIndex = this.scores.findIndex(score => score >= 100);
      if (winnerIndex !== -1) {
        return this.players[winnerIndex];
      }
      this.switchPlayer();
      return null;
    }
  
    getCurrentPlayer() {
      return this.players[this.currentPlayerIndex];
    }
  
    getCurrentRoundScore() {
      return this.currentRoundScore;
    }
  
    getTotalScore(playerIndex) {
      return this.scores[playerIndex];
    }
  }
  
  module.exports = PigDice;