enum CardColor {
    Hearts = 'Hearts',
    Diamonds = 'Diamonds',
    Clubs = 'Clubs',
    Spades = 'Spades',
}

enum CardType {
    Number = 'Number',
    Jack = 'Jack',
    Queen = 'Queen',
    King = 'King',
    Ass = 'Ass',
}

interface Card {
    color: CardColor;
    value: number;
    type: CardType;
}

type Deck = Card[];

export { Card, CardColor, CardType, Deck };
