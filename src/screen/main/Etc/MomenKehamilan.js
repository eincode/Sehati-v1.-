import React, { Component } from 'react'
import { View, StyleSheet, Text, FlatList, ActivityIndicator, Image, DeviceEventEmitter } from 'react-native'
import { connect } from 'react-redux'

import metrics from '../../../config/metrics'

class MomenKehamilan extends Component {

    static navigationOptions = ({ navigation }) => {
        const { navigate, state } = navigation;
        return {
            title: 'Momen Kehamilan',
            headerRight: (
                <Text style={{ marginRight: 20, color: 'grey' }} onPress={() => navigate('newMoment')}>Tambah</Text>
            )
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            data: null
        }
    }

    componentWillMount() {
        DeviceEventEmitter.addListener('shouldRefresh', (e) => {
            if (e) {
                this.componentDidMount()
            }
        })
    }

    componentDidMount() {
        this.setState({ data: null })
        let request = {
            username: this.props.username
        }
        let formBody = []
        for(let key in request){
            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(request[key]);
            formBody.push(encodedKey + '=' + encodedValue)
        }
        formBody = formBody.join('&');

        fetch(metrics.BASE_URL + '/get_momen2.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ data: responseJson.id_momen.map((e, index) => {
                    return {
                        id: responseJson.id_momen[index],
                        photo: responseJson.photo_momen[index],
                        caption: responseJson.caption[index],
                        time: responseJson.time[index],
                        date: responseJson.date[index],
                        week: responseJson.post_momen[index]
                    }
                }).reverse() })
                console.log(this.state.data)
            })
    }

    renderData() {
        if (this.state.data) {
            return (
                <FlatList
                    data={ this.state.data }
                    renderItem={({ item }) => {
                        return (
                            <MomentList
                                week={item.week}
                                photo={item.photo}
                                caption={item.caption}
                            />
                        )
                    }}
                    keyExtractor={(item, index) => index}
                />
            )
        } else {
            return (
                <ActivityIndicator />
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderData()}
            </View>
        )
    }

}

class MomentList extends Component {

    renderImage() {
        if (this.props.photo == '') {
            return null
        } else {
            return (
                <Image
                    source={{ uri: this.props.photo }}
                    style={{ width: metrics.DEVICE_WIDTH * 0.9, height: metrics.DEVICE_WIDTH*0.9, alignSelf: 'center' }}
                />
            )
        }
    }

    render() {
        return(
            <View style={{ width: metrics.DEVICE_WIDTH, paddingLeft: 10, paddingRight: 10 }}>
                <View style={{ flexDirection: 'row', height: 50 }}>
                    <View style={{ width: 7, flex: 1, alignItems: 'center' }}>
                        <View style={{ backgroundColor: 'grey', width: 3, flex: 3 }}/>
                        <View style={{ backgroundColor: metrics.SECONDARY_COLOR, width: 7, height: 7, borderRadius: 50 }}/>
                        <View style={{ backgroundColor: 'grey', width: 3, flex: 3 }}/>
                    </View>
                    <View style={{ flex: 10, justifyContent: 'center' }}>
                        <Text>Minggu {this.props.week}</Text>
                    </View>
                </View>
                <View>
                    {this.renderImage()}
                    <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 10 }}>
                        <Text>{this.props.caption}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

const mapStateToProps = (state) => {
    return {
        username: state.setUsername.username
    }
}

export default connect(mapStateToProps)(MomenKehamilan)
