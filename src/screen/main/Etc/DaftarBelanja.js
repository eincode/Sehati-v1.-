import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import CheckBox from 'react-native-icon-checkbox';

export default class DaftarBelanja extends Component {

    static navigationOptions = {
        title: 'Daftar Belanja'
    }

    state = {
        isChecked: false
    }

    render(){
        return(
            <View style = {styles.container}>
                <CheckBox
                    iconStyle = {{color: '#0095ff'}}
                    label="Keperluan menyusui"
                    size={30}
                    checked={this.state.isChecked}
                    style = {styles.checkboxItem}
                />
                <CheckBox
                    iconStyle = {{color: '#0095ff'}}
                    label="Perawatan bayi"
                    size={30}
                    checked={this.state.isChecked}
                    style = {styles.checkboxItem}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10
    }
})