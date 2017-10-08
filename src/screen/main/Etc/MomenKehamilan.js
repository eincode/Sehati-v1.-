import React, { Component } from 'react'
import { View, StyleSheet, Text, FlatList, ActivityIndicator, Image, DeviceEventEmitter, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'

import metrics from '../../../config/metrics'

class MomenKehamilan extends Component {

    static navigationOptions = ({ navigation }) => {
        const { navigate, state } = navigation;
        return {
            title: 'Momen Kehamilan'
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            data: null,
            isFabButtonsVisible: false
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
            .catch(() => {
                this.setState({ data: 'none' })
            })
    }

    renderData() {
        if (this.state.data != 'none') {
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
        } else if (this.state.data == 'none') {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'grey' }}>
                        Anda belum memiliki momen apapun
                    </Text>
                </View>
            )
        } else {
            return (
                <ActivityIndicator />
            )
        }
    }

    renderButtons() {
        if (this.state.isFabButtonsVisible) {
            return (
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={{ marginBottom: 10, marginTop: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: metrics.SECONDARY_COLOR, width: 35, height: 35, borderRadius: 100, elevation: 5, shadowColor: '#000', shadowRadius: 5, shadowOpacity: 1, shadowOffset: { width: 0, height: 3 }}} onPress={() => this.props.navigation.navigate('newMoment')} >
                        <Icon name={'photo-camera'} style={{ color: 'white', fontSize: 20 }}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginBottom: 15, marginTop: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: metrics.SECONDARY_COLOR, width: 35, height: 35, borderRadius: 100, elevation: 5, shadowColor: '#000', shadowRadius: 5, shadowOpacity: 1, shadowOffset: { width: 0, height: 3 }}} onPress={() => this.props.navigation.navigate('newMomentCaption', { selectedImage: null })}>
                        <Icon name={'edit'} style={{ color: 'white', fontSize: 20 }}/>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderData()}
                <View style={{ position: 'absolute', bottom: 1, right: 1, marginRight: 20, marginBottom: 20, }}>
                    {this.renderButtons()}
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: metrics.SECONDARY_COLOR, width: 55, height: 55, borderRadius: 100, elevation: 5, shadowColor: '#000', shadowRadius: 5, shadowOpacity: 1, shadowOffset: { width: 0, height: 3 }}} onPress={() => this.setState({ isFabButtonsVisible: !this.state.isFabButtonsVisible })}>
                        <Text style={{ color: 'white', fontSize: 25 }}>+</Text>
                    </TouchableOpacity>
                </View>
                
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
