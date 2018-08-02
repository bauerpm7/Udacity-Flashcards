import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

export default class Deck extends React.Component {
    render() {
        const {title, questions} = this.props;

        return <View style={styles.deck}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 24}}>{title}</Text>
                <Text style={{fontSize: 18, color: '#666666'}}>
                    {questions && questions.length} {questions.length > 1 ? 'cards' : 'card'}
                </Text>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    deck: {
        flexDirection: 'row',
        height: 120,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        borderRadius: 5,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowRadius: 4,
        shadowOpacity: 0.7

    },
});
