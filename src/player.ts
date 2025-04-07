import { displayCard as _displayCard } from './card';
import { Card, CardType, Deck } from './types';

export class Player {
    static playerCount = 0;
    public playerID: number;
    private hand: Deck = [];
    private balance: number = 100;

    constructor() {
        this.playerID = Player.playerCount;
        Player.playerCount += 1;
    }

    displayBalance(): void {
        console.log(`Player's funds: ${this.balance}€`);
    }

    displayHand(hidden: boolean): void {
        for (const card of this.hand) {
            _displayCard(card);
            if (hidden) {
                console.log('Card: [hidden]');
                break;
            }
        }

        if (!hidden) {
            console.log(`(Total: ${this.evaluateHand()})`);
        } else {
            console.log(`(Total: ??)`);
        }
    }

    getBalance(): number {
        return this.balance;
    }

    hasBlackjack(): boolean {
        if (this.hand.length != 2) {
            return false;
        }

        const sortedHand = this.hand.sort((Card) => Card.value);

        const firstIsPicture =
            sortedHand[0].type === CardType.Jack ||
            sortedHand[0].type === CardType.Queen ||
            sortedHand[0].type === CardType.King;
        const secondIsAss = sortedHand[1].type === CardType.Ass;
        return firstIsPicture && secondIsAss;
    }

    bet(bet: number): boolean {
        const valid = bet <= this.balance && bet > 0;
        if (valid) {
            this.balance -= bet;
        }
        return valid;
    }

    payout(bet: number, factor: number): void {
        this.balance += bet * factor;
    }

    isBankrupt(): boolean {
        return this.balance <= 0;
    }

    newCard(card: Card): void {
        this.hand.push(card);
    }

    clearHand(): void {
        this.hand = [];
    }

    evaluateHand(): number {
        let value = 0;
        let i = 0;
        const sortedHand = this.hand.sort((Card) => Card.value);
        for (const card of sortedHand) {
            if (card.type === CardType.Ass) {
                if (i < sortedHand.length - 1) {
                    // case multiple asses
                    // value must be always one
                    value += 1;
                } else {
                    // pick either 1 or 11
                    const valueOne = value + 1;
                    const valueEleven = value + 11;

                    const errorOne = 21 - valueOne;
                    const errorEleven = 21 - valueEleven;

                    if (errorOne <= 0) {
                        value += 1;
                    } else {
                        if (errorEleven >= 0) {
                            // both erros are >=0
                            // pick the smaller error
                            if (errorOne <= errorEleven) {
                                value += 1;
                            } else {
                                value += 11;
                            }
                        } else {
                            value += 1;
                        }
                    }
                }
            } else {
                value += card.value;
            }
            i += 1;
        }

        return value;
    }
}
