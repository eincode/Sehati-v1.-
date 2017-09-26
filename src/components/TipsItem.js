import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import metrics from '../config/metrics';

export default class TipsItem extends Component {

    static propTypes = {
        text: PropTypes.string.isRequired,
        image: PropTypes.any,
        onPress: PropTypes.func
    }

    render(){
        const { text, image, onPress } = this.props;
        return(
            <TouchableOpacity style = {styles.container} onPress = {onPress}>
                <View style = {styles.imageContainer}>
                    <Image source = {image} style = {styles.image}/>
                </View>
                <View style = {styles.textContainer}>
                    <View style = {styles.titleContainer}>
                        <Text style = {styles.title}>{text}</Text>
                    </View>
                    <View style = {styles.actionContainer}>
                        <Text style = {styles.action}>View tips</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        width: metrics.DEVICE_WIDTH,
        height: 90,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#F0F0F0'
    },

    imageContainer: {
        justifyContent: 'center',
        paddingLeft: 10,
        flex: 1
    },

    image: {
        resizeMode: 'cover',
        height: 70,
        width: 70,
        borderRadius: 5
    },

    textContainer: {
        flex: 3
    },

    titleContainer: {
        flex: 1,
        justifyContent: 'center'
    },

    title: {
        fontFamily: 'roboto-regular'
    },

    actionContainer: {
        paddingRight: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },

    action: {
        fontFamily: 'roboto-regular',
        color: 'rgb(92, 234, 151)'
    }
})
