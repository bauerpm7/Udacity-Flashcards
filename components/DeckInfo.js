import React from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

class DeckInfo extends React.Component {

    render() {
        let {title} = this.props.navigation.state.params;
        const questions = this.props.decks[title] && this.props.decks[title].questions;

        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 36}}>{title}</Text>
                    <Text style={{fontSize: 22, marginTop: 12}}>{questions.length} {questions.length > 1 ? 'cards' : 'card'}
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('NewQuestion', {
                            title,
                            questions,
                        });
                    }}
                    style={styles.addCard}>
                    <Text style={styles.addCardTitle}>Add Card</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('Quiz', {
                            title,
                            questions,
                        });
                    }}
                    style={styles.startQuiz}>
                    <Text style={styles.startQuizTitle}>Start Quiz</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,

    },
    addCard: {
        backgroundColor: '#3f51b5',
        margin: 24,
        padding: 10,
        height: 50,
        borderRadius: 5,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowRadius: 3,
        shadowOpacity: 1
    },
    startQuiz: {
        backgroundColor: '#f50057',
        margin: 24,
        padding: 10,
        height: 50,
        borderRadius: 5,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowRadius: 3,
        shadowOpacity: 1
    },
    addCardTitle: {
        color: '#fff',
        fontSize: 22,
        textAlign: 'center',
        lineHeight: 25
    },
    startQuizTitle: {
        color: '#fff',
        fontSize: 22,
        textAlign: 'center',
        lineHeight: 25
    }
});

function mapStateToProps(state) {
    return {
        decks: state,
    };
}

export default connect(mapStateToProps)(DeckInfo);
