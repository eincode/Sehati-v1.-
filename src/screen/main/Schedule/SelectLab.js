import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';

import ListButton from '../../../components/ListButton';

const DATA_SOURCE = [{title: 'BioTest', key: 0}, {title: 'Gunung Sahari', key: 1}, {title: 'Prodia', key: 2}]
const backAction = NavigationActions.back()

export default class SelectLab extends Component{

    static navigationOptions = {
        title: 'Pilih klinik '
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