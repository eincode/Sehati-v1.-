import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';

import ListButton from '../../../components/ListButton';

const DATA_SOURCE = [{title: '10:00 - 12.00 WIB', key: 0}, {title: '12:00 - 14:00 WIB', key: 1}, {title: '14:00 - 16:00 WIB', key: 2}, {title: '16:00 - 18:00 WIB', key: 3} ]
const backAction = NavigationActions.back()

export default class SelectKabupaten extends Component{

    static navigationOptions = {
        title: 'Pilih jam layanan '
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