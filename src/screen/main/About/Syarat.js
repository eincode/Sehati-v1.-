import React, { Component } from 'react'
import { WebView, StyleSheet, View, ScrollView } from 'react-native'
import AutoHeightWebView from 'react-native-autoheight-webview';

const content = require('../../../../assets/contents/syarat.html');

export default class Syarat extends Component {

    static navigationOptions = {
        title: 'Syarat & Ketentuan'
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
