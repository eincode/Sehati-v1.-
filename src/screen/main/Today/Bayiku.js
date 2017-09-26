import React, { Component } from 'react';
import { View, StyleSheet, Image, ActivityIndicator, ScrollView, WebView, Text } from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { connect } from 'react-redux';

import TodayList from '../../../components/TodayList';
import metrics from '../../../config/metrics'

class Bayiku extends Component {

    state = {
        data: null
    }

    componentDidMount() {
        console.log(this.props.data)
        this.setState({ data: this.props.data })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ data: nextProps.data })
    }

    render() {
        const { data } = this.state;
        if (data) {
            return (
                <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center' }}  >
                    <Image source={{ uri: data.source_photo_bayiku }} style={styles.picture} />
                    <AutoHeightWebView
                        source={{ html: data.isi_bayiku+'<style>p, li{font-family: roboto; font-size: 90%}</style>' }}
                    />
                    <View style={styles.listContainer}>
                        <TodayList text='1' onPress = {() => this.props.rootNav.navigate('newJournal')}/>
                        <TodayList text='2' onPress = {() => this.props.navigation.navigate('schedule')}/>
                        <TodayList text='3' onPress = {() => this.props.rootNav.navigate('tipsKehamilan')}/>
                    </View>
                </ScrollView>
            )
        } else {
            return (
                <ActivityIndicator />
            )
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    picture: {
        width: metrics.DEVICE_WIDTH,
        height: metrics.DEVICE_HEIGHT * 0.5,
        resizeMode: 'cover',
        marginBottom: 10
    },

    webview: {
        width: metrics.DEVICE_WIDTH,
        height: metrics.DEVICE_HEIGHT * 0.5
    },

    listContainer: {
        marginTop: 10
    }
})

const mapStateToProps = (state) => {
    return{
        rootNav: state.storeNavigator.navigator
    }
}

export default connect(mapStateToProps)(Bayiku);
