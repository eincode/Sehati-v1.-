import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import ListButton from '../../../components/ListButton';

const items = ['Berat badan', '']

class Kehamilanku extends Component{

    render(){
        const { rootNav } = this.props;
        return(
            <View style = {styles.container}>
                <ListButton
                    text = {'Berat badan'}
                    arrow = {true}
                    onPress = {() => rootNav.navigate('detailJournal', { title: 'Berat Badan', field: 'berat_tubuh_kehamilan', column: ['Berat', 'Bertambah'], type: 'kehamilan' })}
                />
                <View style = {styles.divider}/>
                <ListButton
                    text = {'Denyut nadi'}
                    arrow = {true}
                    onPress = {() => rootNav.navigate('detailJournal', { title: 'Denyut Nadi', field: 'denyut_jantung_kehamilan', column: ['Denyut', 'Bertambah'], type: 'kehamilan' })}
                />
                <ListButton
                    text = {'Tekanan darah'}
                    arrow = {true}
                    onPress = {() => rootNav.navigate('detailJournal', { title: 'Tekanan Darah', field: 'tekanan_darah_kehamilan', column: ['Tekanan', 'Bertambah'], type: 'kehamilan' })}
                />
                <ListButton
                    text = {'Suhu tubuh'}
                    arrow = {true}
                    onPress = {() => rootNav.navigate('detailJournal', { title: 'Suhu Tubuh', field: 'suhu_tubuh_kehamilan', column: ['Suhu', 'Bertambah'], type: 'kehamilan' })}
                />
                <ListButton
                    text = {'Pernapasan'}
                    arrow = {true}
                    onPress = {() => rootNav.navigate('detailJournal', { title: 'Pernapasan', field: 'pernapasan_kehamilan', column: ['Pernapasan', 'Bertambah'], type: 'kehamilan' })}
                />
                <View style = {styles.divider}/>
                <ListButton
                    text = {'Lingkar lengan atas'}
                    arrow = {true}
                    onPress = {() => rootNav.navigate('detailJournal', { title: 'Lingkar Lengan', field: 'lingkar_lengan_kehamilan', column: ['Tinggi', 'Bertambah'], type: 'kehamilan' })}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    divider: {
        height: 10
    }
})

const mapStateToProps = (state) => {
    return {
        rootNav: state.storeNavigator.navigator
    }
}

export default connect(mapStateToProps)(Kehamilanku);
