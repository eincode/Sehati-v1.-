import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import ListButton from '../../../components/ListButton';
import CustomButton from '../../../components/CustomButton';

class Bayiku extends Component{

    static navigationOptions = {
        title: 'Jurnal baru'
    }

    render(){
        const { rootNav } = this.props;
        return(
            <View style = {styles.container}>
                <ListButton 
                    text = {'Panjang badan'}
                    arrow = {true}
                    onPress = {() => rootNav.navigate('detailJournal', { title: 'Panjang Badan', field: 'panjang_tubuh_bayi', column: ['Panjang','Bertambah'], type: 'bayi' })}
                />
                <ListButton 
                    text = {'Berat badan'}
                    arrow = {true}
                    onPress = {() => rootNav.navigate('detailJournal', { title: 'Berat Badan', field: 'berat_tubuh_bayi', column: ['Berat', 'Bertambah'], type: 'bayi' })}
                />
                <View style = {styles.divider}/>
                <ListButton 
                    text = {'Denyut jantung'}
                    arrow = {true}
                    onPress = {() => rootNav.navigate('detailJournal', { title: 'Denyut Jantung', field: 'denyut_jantung_bayi', column: ['Denyut', 'Bertambah'], type: 'bayi' })}
                />
                <ListButton 
                    text = {'Plasenta'}
                    arrow = {true}
                    onPress = {() => rootNav.navigate('detailJournal', { title: 'Plasenta' })}                    
                />
                <ListButton 
                    text = {'Cairan ketuban'}
                    arrow = {true}
                    onPress = {() => rootNav.navigate('detailJournal', { title: 'Cairan Ketuban', field: 'cairan_ketuban_bayi', column: ['Cairan ketuban'], type: 'bayi' })}
                />
                <ListButton 
                    text = {'Kelainan kongenital'}
                    arrow = {true}
                    onPress = {() => rootNav.navigate('detailJournal', { title: 'Kelainan Kongenital', field: 'kelainan_kongenital_bayi', column: ['Kelainan kongenital'], type: 'bayi' })}
                />
                <View style = {styles.divider}/>
                <CustomButton 
                    text = 'Jurnal baru'
                    buttonStyle = {styles.button}
                    textStyle = {styles.buttonText}
                    onPress = {() => this.props.rootNav.navigate('newJournal')}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center'
    },

    divider:{
        height: 10
    },

    button: {
        backgroundColor: 'rgb(92, 234, 151)',
    },

    buttonText: {
        color: 'white',
        fontFamily: 'roboto-regular'
    }
})

const mapStateToProps = (state) => {
    return{
        rootNav: state.storeNavigator.navigator
    }
}

export default connect(mapStateToProps)(Bayiku);