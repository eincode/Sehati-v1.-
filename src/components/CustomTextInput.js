import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import metrics from '../config/metrics';

export default class CustomTextInput extends Component {

    static propTypes = {
        placeholder: PropTypes.string,
        onChangeText: PropTypes.func,
        onBlur: PropTypes.func,
        keyboardType: PropTypes.string,
        secureTextEntry: PropTypes.bool,
        style: PropTypes.any,
        multiline: PropTypes.bool,
        onSubmitEditing: PropTypes.func
    }

    static defaultProps = {
        keyboardType: 'default',
        secureTextEntry: false
    }

    focus = () => this.textInputRef.focus();

    render() {
        const { placeholder, onChangeText, keyboardType, onBlur, secureTextEntry, style, onFocus, value, onSubmitEditing, ...otherProps } = this.props;
        return (
            <View style={[styles.container, style]} {...otherProps}>
                <TextInput
                    ref={(ref) => this.textInputRef = ref}
                    placeholder={placeholder}
                    onChangeText={onChangeText}
                    onBlur={onBlur}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    underlineColorAndroid={'transparent'}
                    style={styles.inputText}
                    onFocus={onFocus}
                    value={value}
                    onSubmitEditing={onSubmitEditing}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingHorizontal: 20
    },

    inputText: {
        height: 50
    }
})
