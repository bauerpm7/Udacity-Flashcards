import React from 'react';
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {addQuestion} from '../actions';
import {connect} from 'react-redux';
import {addQuestionForDeck} from '../utils/storage';

class NewQuestion extends React.Component {

    state = {
        question: '', answer: ''
    };

    submitQuestion = () => {
        let alert = {};
        const {question, answer} = this.state;
        const {title, questions} = this.props.navigation.state.params;

        if (question === '') {
            Alert.alert('Mandatory', 'Question cannot be empty');
            return;
        }
        if (answer === '') {
            Alert.alert('Mandatory', 'Answer cannot be empty');
            return;
        }

        const params = {title, questions, question, answer};

        this.props.dispatch(addQuestion(params));

        addQuestionForDeck({
            card: {question, answer},
            deckName: title
        });

        Alert.alert('Successful', 'Question Added Successfully',
            [
                {
                    text: 'OK', onPress: () =>
                    this.props.navigation.goBack()
                }
            ],);
    };

    render() {
        const {question, answer} = this.state;

        return (
            <View style={style.container}>
                <Text>Enter New Question: </Text>
                <TextInput
                    defaultValue="Question"
                    value={question}
                    style={style.input}
                    onChangeText={question => this.setState({question})}/>
                <Text>Enter Answer:</Text>
                <TextInput
                    defaultValue="Answer"
                    value={answer}
                    style={style.input}
                    onChangeText={answer => this.setState({answer})}/>

                <TouchableOpacity
                    onPress={this.submitQuestion}
                    style={style.submitButton}>
                    <Text style={style.submitText}>Submit</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        paddingTop: 50
    },
    input: {
        width: '100%',
        height: 50,
        padding: 12,
        margin: 20,
        backgroundColor: '#fff',
        borderRadius: 7,

    },
    submitButton: {
        backgroundColor: '#f50057',
        margin: 24,
        marginTop: 50,
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
    submitText: {
        color: '#fff',
        fontSize: 22,
        textAlign: 'center',
        lineHeight: 25
    },
});

function mapStateToProps(state) {
    return {
        decks: state,
    };
}

export default connect(mapStateToProps)(NewQuestion);
