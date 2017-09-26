import React, { Component } from 'react';
import { FlatList } from 'react-native';

import ListButton from './ListButton';

const BUTTONS = [...[...Array(40).keys()].map(i => ({ title: 'Minggu ' + (i + 1), key: i }))];

export default class WeekList extends Component {

    render() {
        return (
            <FlatList
                data={BUTTONS}
                style={{ flex: 1 }}
                initialNumToRender={BUTTONS.length}
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