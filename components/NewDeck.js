import React from 'react';
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {createDeck} from '../utils/storage';
import {connect} from 'react-redux';
import {addDeck} from '../actions';

class AddDeck extends React.Component {
    componentWillMount() {
        this.setState({
            text: ''
        })
    }

    addNewDeck = () => {
        const entry = this.state;
        const {decks} = this.props;

        if (!entry.text) {
            Alert.alert(
                'Mandatory',
                'Deck Name Cannot Be Empty'
            );
        } else {
            if (decks[entry.text]) {
                Alert.alert(
                    'Error!',
                    'Deck Already Exists'
                );
            } else {
                const newDeck = {[entry.text]: {title: entry.text, questions: [], id: Date.now()}};

                this.props.dispatch(addDeck(newDeck));
                createDeck(newDeck);

                Alert.alert(
                    'Successful', 'Deck Added',
                    [
                        {text: 'OK', onPress: () => this.props.navigation.navigate('IndividualDeck', {
                            title: entry.text,
                            questions : []
                        })},
                    ],
                );

                this.setState({text: ''});
            }
        }
        console.log(decks)
    };

    render() {
        return (
            <View style={style.container}>
                <Text style={style.title}>What is the title of your new deck ?</Text>

                <TextInput
                    value={this.state.text}
                    style={style.input}
                    onChangeText={text => this.setState({text})}/>

                <TouchableOpacity
                    onPress={this.addNewDeck}
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
    },
    title: {
        fontSize: 28,
        marginTop: 30,
        textAlign: 'center'
    },
    input: {
        width: '100%',
        height: 44,
        padding: 8,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: '#fff',
        margin: 30
    },
    submitButton: {
        marginTop: 30,
        backgroundColor: '#f50057',
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

export default connect(mapStateToProps)(AddDeck);
