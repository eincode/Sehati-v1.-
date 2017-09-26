import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import PropTypes from 'prop-types';

export default class SquareButton extends Component {

    static propTypes = {
        text: PropTypes.string.isRequired,
        arrow: PropTypes.string,
        buttonStyle: PropTypes.any,
        textStyle: PropTypes.any,
        onPress: PropTypes.func
    }

    getLeftArrow() {
        if (this.props.arrow == 'left') {
            return (
                <View style={styles.arrowContainer}>
                    <Image source={require('../../assets/icons/Panah-kiri-putih.png')} style={styles.arrow} />
                </View>
            )
        }
    }

    getRightArrow() {
        if (this.props.arrow == 'right') {
            return (
                <View style={styles.arrowContainer}>
                    <Image source={require('../../assets/icons/Panah-kanan-putih.png')} style={styles.arrow} />
                </View>
            )
        }
    }

    render() {
        const { text, arrow, buttonStyle, textStyle, onPress, ...otherProps } = this.props;
        return (
            <View {...otherProps}>
                <TouchableOpacity style={[styles.container, buttonStyle]} onPress = {onPress}>
                    {this.getLeftArrow()}
                    <View style={styles.textContainer}>
                        <Text style={textStyle}>{text}</Text>
                    </View>
                    {this.getRightArrow()}
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'row'
    },

    arrowContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },

    arrow: {
        resizeMode: 'contain',
        width: 50,
    },
})
