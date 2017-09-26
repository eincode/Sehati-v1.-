import React, { Component } from 'react'
import { WebView, StyleSheet, View, ScrollView } from 'react-native'
import AutoHeightWebView from 'react-native-autoheight-webview';

const content = require('../../../../assets/contents/kebijakan.html')

export default class Kebijakan extends Component {

    static navigationOptions = {
        title: 'Kebijakan dan Privasi'
    }

    render() {
        return (
            <ScrollView>
                <AutoHeightWebView
                    source={content}
                />
            </ScrollView>
        )
    }

}
