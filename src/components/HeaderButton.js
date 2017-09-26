import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight, Text, View, Image, StyleSheet, TextInput } from 'react-native';

import metrics from '../config/metrics';

const arrowIcon = require('../../assets/icons/Panah-kanan-abu.png');

export default class HeaderButton extends Component {

    static propTypes = {
        arrow: PropTypes.bool,
        onPress: PropTypes.func,
        header: PropTypes.string.isRequired,
        keyboardType: PropTypes.string,
        secureTextEntry: PropTypes.bool,
        initialValue: PropTypes.string,
        onFocus: PropTypes.func,
        onChangeText: PropTypes.func
    }

    static defaultProps = {
        arrow: false
    }

    render() {
        const { header, text, arrow, onPress, keyboardType, secureTextEntry, initialValue, onFocus, onChangeText ,...otherProps } = this.props;
        return (
            <View {...otherProps}>
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <View style = {styles.headerContainer}>
                            <Text style = {styles.header}>{header}</Text>
                        </View>
                        <View style = {styles.detailContainer}>
                            <TextInput style={styles.text} keyboardType={keyboardType} secureTextEntry={secureTextEntry} defaultValue={initialValue} onFocus={onFocus} onChangeText={onChangeText} underlineColorAndroid={'transparent'}/>
                        </View>
                    </View>
                    <View style = {styles.arrowContainer}>
                        <Image source = {arrow ? arrowIcon : null} style = {styles.arrow}/>
                    </View>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingLeft: 20,
        justifyContent: 'center',
        height: 60,
        width: metrics.DEVICE_WIDTH,
        borderBottomWidth: 1,
        borderColor: 'rgb(233, 233, 239)'
    },

    textContainer: {
        justifyContent: 'center',
        width: metrics.DEVICE_WIDTH,
        paddingLeft: 20
    },

    headerContainer: {
        flex: 2,
        justifyContent: 'flex-end'
    },

    detailContainer: {
        flex: 3.5,
        justifyContent: 'center',
    },

    header: {
        fontFamily: 'roboto-regular',
        color: 'grey',
        fontSize: 10
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
