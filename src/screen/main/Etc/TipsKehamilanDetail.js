import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, WebView, ScrollView, Platform } from 'react-native'

export default class TipsKehamilanDetail extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title} `
    })

    render() {
        const { params } = this.props.navigation.state
        let font = Platform.OS == 'ios' ? '100%' : '101%'
        params.content = `<img style="width:100%" src="${params.image}"/>` + params.content
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <WebView
                    source={{ html: params.content+`<style>p, li{font-family: roboto; font-size: ${font}}</style>` }}
                    style={styles.webView}
                    scalesPageToFit={Platform.OS == 'android' ? true : false}
                />
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    image: {
        height: 100,
        resizeMode: 'cover'
    },

    webView: {
        backgroundColor: 'transparent'
    }
})
