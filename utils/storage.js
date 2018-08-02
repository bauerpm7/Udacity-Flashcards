import {AsyncStorage} from 'react-native';

export const DECKS_STORAGE_KEY = 'decks:udacicards';

let data = {
    React: {
        title: 'React',
        id: 1533047663982,
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces',
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event',
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        id: 1533047693733,
        questions: [
            {
                question: 'What is a closure?',
                answer:
                    'The combination of a function and the lexical environment within which that function was declared.',
            }
        ]
    }
};

export function fetchDecks() {
    AsyncStorage.clear();
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(results => {
        return results === null ? initialData() : JSON.parse(results)
    });
}

export async function removeDeck (deckId) {
    try{
        let decksJSON= await AsyncStorage.getItem(DECKS_STORAGE_KEY);
        let usersArray = JSON.parse(decksJSON);
        alteredDecks = decksArray.filter(function(e){
            return e.id !== deckId.id

        })
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(alteredDecks));
    }
    catch(error){
        console.log(error)
    }
};

export function createDeck(deck) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(deck));
}

export function addQuestionForDeck({card, deckName}) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY, (err, result) => {
        let decks = JSON.parse(result);

        let newQuestions = JSON.parse(JSON.stringify(decks[deckName].questions));
        newQuestions[newQuestions.length] = card;

        const value = JSON.stringify({
            [deckName]: {title: deckName, questions: newQuestions},
        });

        AsyncStorage.mergeItem(DECKS_STORAGE_KEY, value);
    });
}

export function initialData() {
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
    return data;
}