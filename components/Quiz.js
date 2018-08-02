import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { NavigationActions } from 'react-navigation'

export default class Quiz extends React.Component {

    state = {
        questionIndex: 0,
        correctAnswers: 0,
        showAnswer: false,
    }

    onCorrect = () => {
        const {questionIndex, correctAnswers} = this.state;
        this.setState({questionIndex: questionIndex + 1, correctAnswers: correctAnswers + 1, showAnswer: false});
    }

    startQuiz = () => {
        this.setState({questionIndex: 0, correctAnswers: 0, showAnswer: false});
    }

    backToDeck = () => {
        this.props.navigation.goBack();

    }

    onIncorrect = () => {
        this.setState({questionIndex: this.state.questionIndex + 1});
    }

    showAnswer = () => {
        this.setState({showAnswer: !this.state.showAnswer});
    }

    render() {
        const {questionIndex, correctAnswers, showAnswer} = this.state;
        const {questions} = this.props.navigation.state.params;
        const questionAvailable = questionIndex < questions.length;
        

        return (
            <View style={{flex: 1}}>
                {questionAvailable ? (
                    <View style={styles.container}>

                        <View style={{flex: 1}}>
                            <View>
                                <Text style={styles.cardCounter}>{questionIndex+1} / {questions.length}</Text>
                            </View>
                        </View>

                        <View style={{flex: 2}}>
                            <View>
                                {showAnswer ? (
                                    <View style={{alignItems: 'center'}}>
                                        <Text style={{fontSize: 36}}>{questions[questionIndex].answer}</Text>

                                        <TouchableOpacity onPress={this.showAnswer}>
                                            <Text style={{fontSize: 18, color: '#70dd2f'}}>Show Question</Text>
                                        </TouchableOpacity>

                                    </View>) : (
                                    <View style={{alignItems: 'center'}}>
                                        <Text style={{fontSize: 36}}>{questions[questionIndex].question}</Text>

                                        <TouchableOpacity onPress={this.showAnswer}>
                                            <Text style={{fontSize: 18, color: '#ff463f'}}>Show Answer</Text>
                                        </TouchableOpacity>

                                    </View>
                                )}
                            </View>
                        </View>

                        <View style={{alignItems: 'center', justifyContent: 'space-around', flex: 2}}>
                            <View style={styles.container}>
                                <TouchableOpacity style={styles.correctBtn} onPress={this.onCorrect}>
                                  <Text style = {styles.btnText}>Correct</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.incorrectBtn} onPress={this.onIncorrect} >
                                  <Text style = {styles.btnText}>Incorrect</Text>
                                </TouchableOpacity>

                            </View>

                        </View>

                    </View>

                ) : (
                    <View style={styles.container}>
                        <Text style={{ textAlign: 'center'}}>Score: {correctAnswers}/{questions.length}</Text>

                        <View style={{alignItems: 'center', justifyContent: 'space-around', flex: 2}}>
                            <View style={styles.container}>
                                <TouchableOpacity style={styles.correctBtn} onPress={this.startQuiz}>
                                    <Text style={styles.btnText}>Start Quiz</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.incorrectBtn} onPress={this.backToDeck}>
                                    <Text style={styles.btnText}>Back to Deck</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    cardCounter: {
        textAlign: 'center',
        fontSize: 16
    },
    correctBtn:{
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
    incorrectBtn:{
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
    btnText: {
        color: '#fff',
        justifyContent: 'center',
        height: 30,
        textAlign: 'center',
        width: 200,
        fontSize: 16,
        lineHeight: 25
    }
});


