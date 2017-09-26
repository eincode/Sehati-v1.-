import React, { Component } from 'react';
import { TouchableHighlight, Image, View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import metrics from '../config/metrics';

export default class PictureListItem extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        detail: PropTypes.string.isRequired,
        image: PropTypes.any.isRequired,
        onPress: PropTypes.func
    }

    render() {
        const { name, detail, image, onPress, ...otherProps } = this.props;
        return (
            <TouchableHighlight {...otherProps} onPress = {onPress}>
                <View style = {styles.masterContainer}>
                    <View style={styles.container}>
                        <View style={styles.imageContainer}>
                            <Image source={image} style={styles.image} />
                        </View>
                        <View style={styles.textContainer}>
                            <View style={styles.text}>
                                <Text style={styles.name}>{name}</Text>
                            </View>
                            <View style={styles.text}>
                                <Text style={styles.week}>{detail}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.arrowContainer}>
                        <Image source={require('../../assets/icons/Panah-kanan-abu.png')} />
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        width: metrics.DEVICE_WIDTH - 30,
        flexDirection: 'row',
        padding: 20
    },

    masterContainer: {
        width: metrics.DEVICE_WIDTH,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: '#F0F0F0',
        borderBottomWidth: 1
    },

    arrowContainer: {
        alignSelf: 'center',
        flex: 1,
    },

    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    textContainer: {
        flex: 5,
        paddingHorizontal: 5
    },

    text: {
        flex: 1,
        paddingLeft: 20
    },

    image: {
        height: 50,
        width: 50,
        resizeMode: 'contain',
        borderRadius: 10
    },

    name: {
        alignItems: 'flex-end',
        fontFamily: 'roboto-regular'
    },

    week: {
        alignItems: 'flex-start',
        fontFamily: 'roboto-regular',
        fontSize: 10,
        color: 'grey'
    }
})
