import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';

import ListButton from '../../../components/ListButton';

const DATA_SOURCE = [{title: 'Jakarta Barat', key: 0}, {title: 'Jakarta Pusat', key: 1}, {title: 'Jakarta Selatan', key: 2}, {title: 'Jakarta Timur', key: 3}, ]
const backAction = NavigationActions.back()

export default class SelectKabupaten extends Component{

    static navigationOptions = {
        title: 'Pilih kabupaten/kota'
    }

   render(){
        return (
            <FlatList 
                style = {styles.list}
                contentContainerStyle = {styles.container}
                data = {DATA_SOURCE}
                renderItem = {(item) => (
                    <ListButton 
                        arrow = {true}
                        text = {item.item.title}
                        onPress = {() => this.props.navigation.dispatch(backAction)}
                    />
                )}
            />
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    list: {
        marginTop: 20
    }
})