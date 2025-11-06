import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AntDesign from '@expo/vector-icons/AntDesign'; // Import AntDesign icons

// Reusable Question component
const Question = ({ image, options, onSelect }) => {
    return (
        <View style={styles.questionBox}>
            <Image source={image} style={styles.image} />
            <Picker
                style={styles.picker}
                onValueChange={(value) => onSelect(value)}
            >
                <Picker.Item
                    label="🎯 Select your answer..."
                    value=""
                    color="#888"
                />

                {options.map((opt, index) => (
                    <Picker.Item key={index} label={opt} value={opt} />
                ))}
            </Picker>
        </View>
    );
};

const QuizApp = () => {
    const [answers, setAnswers] = useState(Array(10).fill(''));

    const questions = [
        { image: require('./img/shaunthesheep.jpg'), options: ['Shaun the Sheep', 'Tom', 'Jerry'], correct: 'Shaun the Sheep' },
        { image: require('./img/tomandjerry.jpg'), options: ['Tom', 'Jerry', 'Both Tom & Jerry'], correct: 'Both Tom & Jerry' },
        { image: require('./img/mrbean.jpg'), options: ['Mr. Bean', 'Pink Panther', 'Minions'], correct: 'Mr. Bean' },
        { image: require('./img/crayonshinchan.jpg'), options: ['Crayon Shinchan', 'Mickey Mouse', 'SpongeBob'], correct: 'Crayon Shinchan' },
        { image: require('./img/mickeymouse.jpg'), options: ['Mickey Mouse', 'Tom', 'Jerry'], correct: 'Mickey Mouse' },
        { image: require('./img/pinkpanther.jpg'), options: ['Pink Panther', 'Minions', 'Smurf'], correct: 'Pink Panther' },
        { image: require('./img/smurf.jpg'), options: ['Smurf', 'SpongeBob', 'Pingu'], correct: 'Smurf' },
        { image: require('./img/spongebob.jpg'), options: ['SpongeBob', 'Minions', 'Mickey Mouse'], correct: 'SpongeBob' },
        { image: require('./img/pingu.jpg'), options: ['Pingu', 'Smurf', 'Crayon Shinchan'], correct: 'Pingu' },
        { image: require('./img/minions.jpg'), options: ['Minions', 'Pink Panther', 'Mr. Bean'], correct: 'Minions' },
    ];

    const handleSelect = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleSubmit = () => {
        if (answers.includes('')) {
            Alert.alert('Incomplete', 'Please answer all questions before submitting!');
            return;
        }

        let score = 0;
        questions.forEach((q, index) => {
            if (answers[index] === q.correct) score++;
        });

        let message = '';
        if (score === questions.length) message = 'Excellent! You got all correct! 🎉';
        else if (score >= questions.length - 2) message = 'Good job! Almost perfect!';
        else if (score >= 1) message = 'You can do better next time!';
        else message = 'Oops! Try again and enjoy the cartoons!';

        Alert.alert('Quiz Result', `You got ${score}/${questions.length} correct.\n${message}`);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>

                {/* Title with pink heart icons */}
                <View style={styles.titleContainer}>
                    <AntDesign name="heart" size={24} color="pink" />
                    <Text style={styles.title}> Cartoon Quiz </Text>
                    <AntDesign name="heart" size={24} color="pink" />
                </View>

                {questions.map((q, index) => (
                    <Question
                        key={index}
                        image={q.image}
                        options={q.options}
                        onSelect={(value) => handleSelect(index, value)}
                    />
                ))}

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Submit Answers</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'center',
    },
    titleContainer: {
        flexDirection: 'row', // align heart icons and text horizontally
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 15,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginHorizontal: 10, // space between text and hearts
    },
    questionBox: {
        marginBottom: 20,
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 250,
        borderRadius: 10,
        marginBottom: 5,
    },
    picker: {
        width: 220,
        borderWidth: 1,
    },
    button: {
        backgroundColor: '#2196F3',
        padding: 12,
        borderRadius: 10,
        marginTop: 15,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default QuizApp;
