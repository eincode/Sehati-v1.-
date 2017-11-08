import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';

import ListButton from '../../../components/ListButton';

const DATA_SOURCE = [{title: 'Home service', key: 0}, {title: 'Periksa di lab', key: 1}]
const backAction = NavigationActions.back()

export default class SelectService extends Component{

    static navigationOptions = {
        title: 'Pilih layanan '
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