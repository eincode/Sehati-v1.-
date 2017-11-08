import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'

import CustomTextInput from '../../../components/CustomTextInput'
import TipsItem from '../../../components/TipsItem'
import metrics from '../../../config/metrics'

export default class TipsKehamilanKategori extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.kategori} `
    })

    constructor(props) {
        super(props)
        this.state = {
            isDataLoading: false,
            tipsList: null
        }
    }

    componentDidMount() {
        const kategori = this.props.navigation.state.params.kategori
        this.setState({ isDataLoading: true })
        fetch(metrics.BASE_URL + '/get_tips_kehamilan.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                let tipsList = []
                for (let key in responseJson) {
                    if (responseJson[key].kategori_tips == kategori) {
                        tipsList.push(responseJson[key])
                    }
                }
                this.setState({ isDataLoading: false, tipsList: tipsList })
            })
    }

    renderContent() {
        if (this.state.isDataLoading) {
            return (
                <ActivityIndicator />
            )
        } else {
            return (
                <FlatList
                    data={this.state.tipsList}
                    renderItem={({ item }) =>
                        <TipsItem
                            text={item.judul_tips}
                            image={{ uri: item.photo_tips }}
                            onPress={() => this.props.navigation.navigate('tipsKehamilanDetail', { title: item.judul_tips, image: item.photo_tips, content: item.detail_tips })}
                        />
                    }
                />
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <CustomTextInput
                    placeholder={'Search'}
                    style={styles.search}
                />
                {this.renderContent()}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    search: {
        backgroundColor: '#FFF',
        width: metrics.DEVICE_WIDTH,
        borderRadius: 5,
        marginBottom: 10
    }
})