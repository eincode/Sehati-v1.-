import React, { Component } from 'react';
import { View, StyleSheet, Image, ActivityIndicator, ScrollView, WebView } from 'react-native';
import { connect } from 'react-redux';
import AutoHeightWebView from 'react-native-autoheight-webview';

import TodayList from '../../../components/TodayList';
import metrics from '../../../config/metrics'

class Kehamilanku extends Component{

    state = {
        data: null
    }

    componentDidMount(){
        this.setState({ data: this.props.data })
    }

    componentWillReceiveProps(nextProps){
        this.setState({ data: nextProps.data })
    }

    render(){
        const { data } = this.state;
        if (data) {
            return(
                <ScrollView style = {styles.container} contentContainerStyle={{ alignItems: 'center' }}>
                    <Image source = {{ uri: data.source_photo_kehamilanku }} style = {styles.picture}/>
                    <AutoHeightWebView
                        source = {{ html: data.isi_kehamilanku+'<style>p, li{font-family: roboto; font-size: 90%}</style>' }}
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
        backgroundColor: 'white'
    },

    picture: {
        width: metrics.DEVICE_WIDTH,
        height: metrics.DEVICE_HEIGHT * 0.5,
        resizeMode: 'contain',
        marginBottom: 10
    },

    webview: {
        width: metrics.DEVICE_WIDTH,
    },

    listContainer: {
        marginTop: 10
    }
})

const mapStateToProps = (state) => {
    return {
        rootNav: state.storeNavigator.navigator
    }
}

export default connect(mapStateToProps)(Kehamilanku);
