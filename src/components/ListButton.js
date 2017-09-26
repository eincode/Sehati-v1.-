import React, { Component } from 'react';
import { TouchableHighlight, Text, View, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import metrics from '../config/metrics';

const arrowIcon = require('../../assets/icons/Panah-kanan-abu.png');

export default class ListButton extends Component {

    static propTypes = {
        text: PropTypes.string.isRequired,
        arrow: PropTypes.bool,
        onPress: PropTypes.func,
    }

    static defaultProps = {
        arrow: false
    }

    render() {
        const { text, arrow, onPress, ...otherProps } = this.props;
        return (
            <TouchableHighlight onPress = {onPress} {...otherProps}>
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{text}</Text>
                    </View>
                    {arrow ? <View style={styles.arrowContainer}>
                        <Image source={arrowIcon} style={styles.arrow}/>
                    </View> : null}
                </View>
            </TouchableHighlight>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingLeft: 20,
        justifyContent: 'center',
        height: 70,
        width: metrics.DEVICE_WIDTH
    },

    textContainer: {
        justifyContent: 'center',
        width: metrics.DEVICE_WIDTH,
        paddingLeft: 20,
        paddingRight: 20
    },

    text: {
        fontFamily: 'roboto-regular'
    },

    arrowContainer: {
        justifyContent: 'center',
        flex: 1,
        marginRight: 20
    },

    arrow: {
        resizeMode: 'contain',
        width: 50,
        alignSelf: 'flex-end'
    },
})
