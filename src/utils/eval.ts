import { CharacterStatus } from '../types/wordType';

export function evalWords(
    wordOne: string,
    wordTwo: string
): [boolean, Array<CharacterStatus>] {
    wordTwo = wordTwo.toLowerCase();
    if (wordOne === wordTwo) {
        return [true, Array(5).fill(CharacterStatus.CORRECT)];
    }

    if (wordOne.length !== wordTwo.length) {
        return [false, Array(5).fill(CharacterStatus.FALSE)];
    }

    const countsOne: {
        [key: string]: number;
    } = {};
    for (let index = 0; index < wordOne.length; index++) {
        const element = wordOne[index];
        if (element in countsOne) {
            countsOne[element] += 1;
        } else {
            countsOne[element] = 1;
        }
    }

    const countsTwo: {
        [key: string]: number;
    } = {};
    for (let index = 0; index < wordTwo.length; index++) {
        const element = wordTwo[index];
        if (element in countsTwo) {
            countsTwo[element] += 1;
        } else {
            countsTwo[element] = 1;
        }
    }

    const result: Array<CharacterStatus> = Array(5);
    let done: boolean = true;

    for (let i = 0; i < wordOne.length; i++) {
        const charOne = wordOne[i];
        const charTwo = wordTwo[i];

        if (charOne === charTwo) {
            result[i] = CharacterStatus.CORRECT;
            continue;
        }

        if (charTwo in countsOne) {
            if (countsTwo[charTwo] == 1) {
                result[i] = CharacterStatus.WRONGPOSITION;
                countsOne[charTwo] -= 1;
                if (countsOne[charTwo] <= 0) {
                    delete countsOne[charTwo];
                }
                continue;
            } else {
                result[i] -= 1;
            }
        }

        done = false;
        result[i] = CharacterStatus.FALSE;
    }

    return [done, result];
}
