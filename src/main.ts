import promptSync from 'prompt-sync';
import { CardDeck } from './deck';
import { Player } from './player';

function isNumber(input: unknown): boolean {
    return typeof input === 'number';
}

function isValidAction(input: string): boolean {
    return input === 'stand' || input === 'hit';
}

const prompt = promptSync();

let deck = new CardDeck();
let bank = new Player();
let player = new Player();

// clear the hands
bank.clearHand();
player.clearHand();

while (true) {
    if (player.isBankrupt()) {
        console.log(`Player ${player.playerID} is bankrupt`);
        break;
    }

    // Place a bet
    let numberBet: number;
    while (true) {
        player.displayBalance();
        const stringBet = prompt('Enter your bet in €: ');
        // to number
        numberBet = Number(stringBet);
        // validate bet
        if (isNumber(numberBet)) {
            if (player.bet(numberBet)) {
                console.log(`Player ${player.playerID} bet ${numberBet}€`);
                break;
            } else {
                console.log(`Bet ${numberBet} is not in [0, ${player.getBalance()}]`);
            }
        } else {
            console.log('No valid Number supplied');
        }
    }

    if (!deck.enoughCards(10)) {
        // reset the deck
        deck = new CardDeck();
    }
    // give each player two cards
    player.newCard(deck.getNextCard());
    player.newCard(deck.getNextCard());
    bank.newCard(deck.getNextCard());
    bank.newCard(deck.getNextCard());

    // players turn
    while (true) {
        // show the hands
        player.displayHand(false);
        bank.displayHand(true);

        let action: string;
        while (true) {
            action = prompt('Your action (hit/stand): ');
            if (isValidAction(action)) {
                break;
            } else {
                console.log('Invalid action provided');
            }
        }

        // apply the aciton
        if (action === 'hit') {
            player.newCard(deck.getNextCard());
            // check if lost
            const value = player.evaluateHand();

            if (value > 21) {
                break;
            }
        } else if (action === '^C' || action === 'exit') {
            console.log(1 / 0);
        } else {
            break;
        }
    }

    // evaluate who won
    const playerValue = player.evaluateHand();

    if (playerValue > 21) {
        console.log(`Player ${player.playerID} lost! (Total: ${playerValue})`);
        break;
    }

    // play as bank
    while (bank.evaluateHand() < 17) {
        bank.newCard(deck.getNextCard());
    }

    // show hands
    player.displayHand(false);
    bank.displayHand(false);

    const bankValue = bank.evaluateHand();
    const bankOvershoot = bankValue > 21;

    // check for blackjacks
    const playerHasBlackjack = player.hasBlackjack();

    let factor: number;
    if (bankOvershoot) {
        if (playerHasBlackjack) {
            factor = 1 + 3 / 2;
            console.log('Player won: Bankovershoot and Player has Blackjack');
        } else {
            factor = 2;
            console.log('Player won: Bankovershoot');
        }
    } else {
        // both below 21
        if (bankValue > playerValue) {
            factor = 0;
            console.log('Bank won: larger value');
        } else if (bankValue === playerValue) {
            factor = 1;
            console.log('Tie');
        } else {
            if (playerHasBlackjack) {
                factor = 1 + 3 / 2;
                console.log('Player won: greater value and Player has Blackjack');
            } else {
                factor = 2;
                console.log('Player won: greater value');
            }
        }
    }
    console.log(`Payout-Factor ${factor}`);
    player.payout(numberBet, factor);

    // clear Hands
    player.clearHand();
    bank.clearHand();
}

console.log('Game is over!');
