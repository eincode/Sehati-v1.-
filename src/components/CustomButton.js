import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, Image, View, StyleSheet } from 'react-native';

import metrics from '../config/metrics';

export default class CustomButton extends Component{

    static propTypes = {
        text: PropTypes.string.isRequired,
        arrow: PropTypes.bool,
        onPress: PropTypes.func,
        buttonStyle: PropTypes.any,
        textStyle: PropTypes.any
    }

    static defaultProps = {
        arrow: false
    }

    getArrow() {
        if (this.props.arrow) {
            return (<View style={styles.arrowContainer}>
                <Image source={require('../../assets/icons/Panah-kanan-abu.png')} style={styles.arrow} />
            </View>)
        }
    }

    render(){
        const { text, textStyle, arrow, onPress, buttonStyle, ...otherProps } = this.props;
        return(
            <View {...otherProps}>
                <TouchableOpacity onPress = {onPress} style = {[styles.itemContainer, styles.container, buttonStyle]}>
                    <View style = {styles.textContainer}>
                        <Text style = {textStyle}>{text}</Text>
                    </View>
                    {this.getArrow()}
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: metrics.DEVICE_WIDTH*0.8,
        borderRadius: 50,
        alignContent: 'center'
    },

    textContainer: {
        alignItems: 'center',
        width: metrics.DEVICE_WIDTH*0.8
    },

    arrowContainer: {
        flex: 1
    },

    arrow: {
        resizeMode: 'contain',
        width: 50,
        alignSelf: 'flex-end'
    },

    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
