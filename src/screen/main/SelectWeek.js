import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';

import ListButton from '../../components/ListButton';
import store from '../../service/store';
import { setWeek } from '../../service/action';
import WeekList from '../../components/WeekList';

const backAction = NavigationActions.back();
const setWeekToNavigation = (week) => {
    console.log('po', week);
    return NavigationActions.setParams({
        params: { week: week },
        key: 'main'
    })
}

const setWeekReset = (week) => {
    console.log(week);
    return NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: 'main', params: { week: week } })
        ]
    })
}

export default class SelectWeek extends Component {

    static navigationOptions = {
        title: 'Pilih minggu '
    }

    handlePress(week) {
        store.dispatch(setWeek(week));
        this.props.navigation.dispatch(setWeekToNavigation(week))
        setTimeout(() => { this.props.navigation.dispatch(backAction) });
    }

    render() {
        let items = [];
        for(let i = 1 ; i <= 40 ; i++) {
            items.push({
                key: i,
                title: 'Minggu ' + i
            })
        }
        return (
            <FlatList
                data={items}
                style={{ flex: 1 }}
                initialNumToRender={items.length}
                removeClippedSubviews={false}
                renderItem={(item) => (
                    <ListButton
                        arrow={true}
                        text={item.item.title}
                        onPress={() => this.handlePress(item.index + 1)}
                    />
                )}
            />
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue'
    },

    divider: {
        height: 10
    }
})