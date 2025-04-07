import { Card, CardColor, CardType, Deck } from './types';

export function displayCard(card: Card): void {
    console.log(`Card: ${card.type} with value ${card.value} (${card.color})`);
}

export function getDeck(): Deck {
    let deck: Deck = [];

    // each color
    let colors = [1, 2, 3, 4];
    for (const color of colors) {
        // Add numbers
        const cardColor = Object.values(CardColor)[color];
        for (let value = 2; value < 10; value++) {
            deck.push({
                color: cardColor,
                type: CardType.Number,
                value: value,
            });
        }

        // add pictures
        let pictures: CardType[] = [CardType.Jack, CardType.Queen, CardType.King];
        for (const pic of pictures) {
            deck.push({
                color: cardColor,
                type: pic,
                value: 10,
            });
        }

        // add ass
        deck.push({
            color: cardColor,
            type: CardType.Ass,
            value: 11,
        });
    }
    return deck;
}
