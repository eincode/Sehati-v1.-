import React, { Component } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Text, TouchableWithoutFeedback } from 'react-native';
import MyWebView from 'react-native-webview-autoheight';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import HTMLView from 'react-native-htmlview';

import CustomTextInput from '../../../components/CustomTextInput';
import ListButton from '../../../components/ListButton';
import metrics from '../../../config/metrics';

class TanyaJawabKehamilan extends Component {

    static navigationOptions = {
        title: 'Tanya Jawab Kehamilan '
    }

    state = {
        data: null,
        isModalVisible: false,
        modalContent: null
    }

    mapData(response) {
        let data = [];
        for (let i = 0 ; i < response.judul_faq.length ; i++) {
            if (response.post_faq[i] == this.props.week) {
                data.push({
                    judul_faq: response.judul_faq[i],
                    detail_faq: response.detail_faq[i],
                    key: i
                })
            }
        }
        this.setState({ data: data })
    }

    renderData(){
        if (this.state.data == null) {
            return (
                <ActivityIndicator />
            )
        } else {
            return (
                <FlatList
                    data = {this.state.data}
                    renderItem = {({item}) => <ListButton
                        text = {item.judul_faq}
                        arrow = {true}
                        onPress = {() => this.props.navigation.navigate('tanyaJawabKehamilanDetail', { content: item.detail_faq, title: item.judul_faq })}
                    />}
                />
            )
        }
    }

    handleModal(){
        this.setState({ isModalVisible: !this.state.isModalVisible })
    }

    componentDidMount(){
        fetch('http://sehati-project.net/assets/connection/get_faq.php', {
            method: 'POST'
        }).then((response) => response.json())
            .then((responseJson) => {
                this.mapData(responseJson);
        })
    }

    render(){
        return(
            <View style = {styles.container}>
                <CustomTextInput
                    placeholder = {'Search'}
                    style = {styles.textInput}
                />
                {this.renderData()}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    textInput: {
        backgroundColor: '#FFF',
        width: metrics.DEVICE_WIDTH,
        borderRadius: 5,
        marginBottom: 10
    },

    modal: {
        justifyContent: 'flex-end',
        margin: 0
    },

    modalContent: {
        backgroundColor: 'white',
        width: metrics.DEVICE_WIDTH*0.8,
        height: metrics.DEVICE_HEIGHT*0.5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        padding: 10,
        paddingTop: 20,
        borderRadius: 10
    },

    webview: {
        width: metrics.DEVICE_WIDTH * 0.8,
        backgroundColor: 'transparent'
    }
})

const mapStateToProps = (state) => {
    return {
        week: state.setWeek.week
    }
}

export default connect(mapStateToProps)(TanyaJawabKehamilan);
