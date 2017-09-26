import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default class SelectDate extends Component {

    static navigationOptions = {
        title: 'Pilih tanggal pemeriksaan'
    }

    state = {

    }

    onDayPress(day) {
        this.setState({ markedDay: day.dateString })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style = {styles.calendarContainer}>
                    <Calendar />
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },

    spacer: {
        height: 30
    },

    calendarContainer: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: 'white'
    }
})