import React, { Component } from 'react';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { WebView, StyleSheet, Button, Text, ScrollView, Platform } from 'react-native';

import HeaderRight from '../../components/HeaderRight';

const content = Platform.OS == 'ios' ? require('../../../assets/contents/syarat.html') : { uri: 'file:////android_asset/syarat.html' }

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
