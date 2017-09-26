import React, { Component } from 'react'
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native'

import ListButton from '../../../components/ListButton'
import metrics from '../../../config/metrics'

export default class SelectProvince extends Component {

    componentDidMount() {
        fetch(metrics.LOCATION_URL + 'provinsi', {
            method: 'GET'
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ data: responseJson })
            })
    }

    constructor(props) {
        super(props)
        this.state = {
            data: null
        }
    }

    renderList() {
        if (this.state.data) {
            return (
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => {
                        return (
                            <ListButton
                                arrow={true}
                                text={item.provinsi}
                                onPress={() => this.props.navigation.goBack(null)}
                            />
                        )
                    }}
                />
            )
        } else {
            <ActivityIndicator />
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderList()}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
