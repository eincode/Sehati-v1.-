import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import PropTypes from 'prop-types';

import metrics from '../config/metrics';

export default class MenuItem extends Component {

    static propTypes = {
        text: PropTypes.string.isRequired,
        onPress: PropTypes.func
    }

    render(){
        const { onPress, text, ...otherProps } = this.props;
        return(
            <TouchableOpacity onPress = {onPress}>
                <View style = {styles.container}>
                    <View style = {styles.iconContainer}>
                        {this.props.children}
                    </View>
                    <View style = {styles.textContainer}>
                        <Text>{text}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: metrics.DEVICE_WIDTH,
        padding: 5,
        backgroundColor: 'white',
        flexDirection: 'row'
    },

    iconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textContainer: {
        flex: 5,
        justifyContent: 'center'
    }
})
