import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

import metrics from '../config/metrics';

export default class ValueList extends Component{

    static propTypes = {
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired
    }

    render(){
        const { title, content } = this.props;
        return(
            <View style = {styles.container}>
                <View style = {styles.titleContainer}>
                    <Text style = {styles.title}>{title}</Text>
                </View>
                <View style = {styles.contentContainer}>
                    <Text style = {styles.content}>{content}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: 'white',
        width: metrics.DEVICE_WIDTH,
        paddingLeft: 20
    },

    titleContainer: {
        flex: 1,
        marginTop: 5
    },

    title: {
        color: 'grey',
        fontSize: 12,
        fontFamily: 'roboto-regular'
    },

    contentContainer: {
        flex: 2
    },

    content: {
        fontFamily: 'roboto-regular'
    }
})
