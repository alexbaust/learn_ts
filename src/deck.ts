import { getDeck } from './card';
import { Card, Deck } from './types';

function shuffleDeck(deck: Deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

export class CardDeck {
    private deck: Deck;

    constructor() {
        this.deck = CardDeck.newDeck();
    }

    static newDeck(): Deck {
        let deck: Deck = getDeck();

        return shuffleDeck(deck);
    }

    public getNextCard(): Card {
        return this.deck.pop()!;
    }

    public isEmpty(): boolean {
        return this.deck.length === 0;
    }

    public enoughCards(minimum: number): boolean {
        return this.deck.length >= minimum;
    }
}
