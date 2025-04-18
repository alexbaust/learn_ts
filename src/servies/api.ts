let words = [
    'abend',
    'abtei',
    'acker',
    'adler',
    'ahorn',
    'aktie',
    'allee',
    'altar',
    'ampel',
    'angel',
    'apfel',
    'april',
    'arena',
    'armee',
    'asche',
    'asien',
    'atem',
    'atlas',
    'autor',
    'azubi',
    'bacon',
    'bahne',
    'bande',
    'banal',
    'barde',
    'baron',
    'beere',
    'beleg',
    'beruf',
    'besen',
    'beste',
    'beton',
    'beute',
    'bezir',
    'bibel',
    'biene',
    'birke',
    'blatt',
    'blitz',
    'blume',
    'boden',
    'bogen',
    'bonus',
    'boxer',
    'braun',
    'brief',
    'brise',
    'brock',
    'bruch',
    'buhne',
    'bunte',
    'busch',
    'cello',
    'clown',
    'comic',
    'creme',
    'daune',
    'dachs',
    'dame',
    'datum',
    'degen',
    'deich',
    'diele',
    'dinge',
    'disko',
    'dosen',
    'drach',
    'drang',
    'duell',
    'dunst',
    'eagle',
    'ecken',
    'edel',
    'ehren',
    'eiche',
    'eigen',
    'eimer',
    'einig',
    'eisen',
    'eklat',
    'elche',
    'elite',
    'engel',
    'enkel',
    'enten',
    'epoche',
    'ernte',
    'essen',
    'ethik',
    'eulen',
    'event',
    'fabel',
    'faden',
    'falle',
    'farbe',
    'farce',
    'fasen',
    'faust',
    'feder',
    'feier',
    'feine',
    'fels',
    'ferne',
    'feuer',
    'finte',
    'firma',
    'fisch',
    'flair',
    'flock',
    'flora',
    'fluch',
    'flugs',
    'folge',
    'fonds',
    'forst',
    'frage',
    'frech',
    'freud',
    'friede',
    'front',
    'frost',
    'fuchs',
    'funke',
    'furie',
    'fusel',
    'gabel',
    'garde',
    'garni',
    'gasse',
    'geben',
    'geist',
    'genie',
    'geste',
    'glanz',
    'glatt',
    'gleis',
    'glück',
    'gnade',
    'gockl',
    'gold',
    'grace',
    'grube',
    'grund',
    'gummi',
    'gunst',
    'gurke',
    'hafen',
    'haken',
    'halde',
    'hallo',
    'hammer',
    'hauch',
    'hebel',
    'heben',
    'heide',
    'heilig',
    'heißt',
    'helix',
    'herde',
    'heuer',
    'himmel',
    'hirse',
    'hobel',
    'hoffe',
    'holz',
    'honig',
    'hosen',
    'hotel',
    'hufte',
    'hunde',
    'hurra',
    'hütte',
    'ideal',
    'idyll',
    'immer',
    'impfe',
    'indie',
    'insel',
    'intim',
    'irren',
    'jagen',
    'jahre',
    'japan',
    'jeder',
    'jetzt',
    'joker',
    'jogge',
    'junge',
    'juror',
    'kabel',
    'kamin',
    'kanal',
    'karge',
    'karma',
    'kasse',
    'kater',
    'kette',
    'kiefer',
    'kiosk',
    'klang',
    'klima',
    'knall',
    'knopf',
    'kohle',
    'kombi',
    'könig',
    'kranz',
    'kraut',
    'kreis',
    'krone',
    'kunst',
    'kurve',
    'küsse',
    'laden',
    'lachs',
    'lampe',
    'lauch',
    'leben',
    'lehre',
    'leine',
    'lende',
    'licht',
    'liebe',
    'lilie',
    'linie',
    'lions',
    'liste',
    'loben',
    'loden',
    'logik',
    'lotse',
    'luchs',
    'lüfte',
    'lügen',
    'lunge',
    'lustig',
    'machen',
    'mafia',
    'magen',
    'malen',
    'manie',
    'markt',
    'maske',
    'matte',
    'mauer',
    'mehr',
    'meile',
    'melde',
    'mensa',
    'miete',
    'milch',
    'miliz',
    'mitte',
    'mogel',
    'monde',
    'moral',
    'motiv',
    'musik',
    'mütze',
    'nabel',
    'nacht',
    'nadel',
    'naive',
    'narbe',
    'nasse',
    'natur',
    'nebel',
    'nette',
    'neuen',
    'niese',
    'notiz',
    'nudel',
    'nutze',
    'oasen',
    'obere',
    'ocker',
    'offen',
    'ohren',
    'olymp',
    'onkel',
    'opfer',
    'optik',
    'orden',
    'orgel',
    'ortet',
    'ostern',
    'pacht',
    'paket',
    'pappe',
    'parka',
    'pause',
    'pelz',
    'penny',
    'perle',
    'pfade',
    'pflug',
    'pilze',
    'plage',
    'platt',
    'plump',
    'pokal',
    'polar',
    'pools',
    'prahl',
    'preis',
    'prima',
    'prinz',
    'probe',
    'puder',
    'punkt',
];
words = words.filter((word) => word.length === 5);

export const getRandomWord = () => {
    return words[Math.floor(Math.random() * words.length)];
};
