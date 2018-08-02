import React from 'react';
import {View} from 'react-native';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers/index.js';
import {createStackNavigator, createMaterialTopTabNavigator} from 'react-navigation';
import {setNotification} from './utils/notification';
import NewDeck from './components/NewDeck';
import DeckList from './components/DeckList.js';
import DeckInfo from './components/DeckInfo.js';
import NewQuestion from './components/NewQuestion';
import Quiz from './components/Quiz.js'

const Tabs = createMaterialTopTabNavigator(
    {
        DeckList: {
            screen: DeckList,
            navigationOptions: {
                tabBarLabel: 'All Decks'
            },
        },
        NewDeck: {
            screen: NewDeck,
            navigationOptions: {
                tabBarLabel: 'New Deck',
            },
        },
    },
    {
       tabBarOptions: {
            style: {
                backgroundColor: '#3f51b5'
            },
            indicatorStyle: {
                backgroundColor: '#f50057'
            }
        },  
    }
);

const AppNavigator = createStackNavigator({
    Home: {
        screen: Tabs,
        navigationOptions: {title: 'Home'},
    },
    DeckInfo: {
        screen: DeckInfo,
        navigationOptions: {
            headerTintColor: '#000',
        },
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            title: 'Quiz',
            headerTintColor: '#000',
        },
    },
    NewQuestion: {
        screen: NewQuestion,
        navigationOptions: {
            title: 'Add Question',
            headerTintColor: '#000',
        },
    },
});

export default class App extends React.Component {
    componentDidMount() {
        setNotification();
    }

    render() {
        return <Provider store={createStore(reducer)}>
            <View style={{flex: 1}}>
                <AppNavigator />
            </View>
        </Provider>
    }
};
