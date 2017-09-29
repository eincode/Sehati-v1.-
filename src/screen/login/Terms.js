import React, { Component } from 'react';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { WebView, StyleSheet, Button, Text, ScrollView } from 'react-native';

import HeaderRight from '../../components/HeaderRight';

const content = require('../../../assets/contents/syarat.html')

export default class Terms extends Component{
    static navigationOptions = ({navigation}) => {
        const { navigate } = navigation;
        return{
            title: 'Syarat dan Ketentuan',
            headerRight: (
                <HeaderRight
                    navigation = {navigation}
                />
            )
        }
    }

    render(){
        return(
            <ScrollView>
                <AutoHeightWebView
                    source={content}
                />
            </ScrollView>
        )
    }
}
