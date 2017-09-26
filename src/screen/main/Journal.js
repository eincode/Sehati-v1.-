import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';

import Bayiku from './Journal/Bayiku';
import Kehamilanku from './Journal/Kehamilanku';
import Tabs from '../../components/Tabs';

export default class Journal extends Component {
    static navigationOptions = {
        tabBarLabel: 'Jurnal',
        tabBarIcon: ({ focused }) => {
            switch (focused) {
                case true: return (
                    <Image source={require('../../../assets/icons/Jurnal-hijau.png')} />
                )
                case false: return (
                    <Image source={require('../../../assets/icons/Jurnal-abu.png')} />
                )
            }
        }
    }

    state = {
        activePage: 'bayi'
    }

    onChangeTab(param){
        switch(param){
            case 'bayi' : this.setState({activePage: 'bayi'}); return;
            case 'kehamilan' : this.setState({activePage: 'kehamilan'}); return;
        }
    }

    getActivePage(){
        switch (this.state.activePage){
            case 'bayi' : return <Bayiku/>
            case 'kehamilan' : return <Kehamilanku/>
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Tabs
                    initialTab={this.state.activePage}
                    onChangeTab={(param) => { this.onChangeTab(param) }} />
                {this.getActivePage()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})