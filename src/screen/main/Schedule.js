import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, FlatList, ActivityIndicator } from 'react-native';
import CheckBox from 'react-native-icon-checkbox';
import { connect } from 'react-redux';

import store from '../../service/store';
import { setWeek } from '../../service/action';
import SquareButton from '../../components/SquareButton';
import metrics from '../../config/metrics';

class Schedule extends Component {
    static navigationOptions = {
        tabBarLabel: 'Jadwal ',
        tabBarIcon: ({ focused }) => {
            switch (focused) {
                case true: return (
                    <Image source={require('../../../assets/icons/Jadwal-hijau.png')} />
                )
                case false: return (
                    <Image source={require('../../../assets/icons/Jadwal-abu.png')} />
                )
            }
        }
    }

    state = {
        isChecked: false,
        scheduleList: null,
        isLoadingData: true,
        scheduleList: []
    }

    componentWillMount() {
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.setState({ isLoadingData: true })
        let request = {
            username: nextProps.username,
            minggu: nextProps.week
        }
        let formBody = []
        for(let key in request){
            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(request[key]);
            formBody.push(encodedKey + '=' + encodedValue)
        }
        formBody = formBody.join('&');

        fetch(metrics.BASE_URL + '/get_jadwal.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ scheduleList: responseJson, isLoadingData: false })
            })
    }

    handlePressCheckedBox = (checked) => {
        this.props.rootNav.navigate('newSchedule');
    }

    updateScheduleStatus(id) {
        let request = {
            username: this.props.username,
            id_jadwal: id
        }
        let formBody = []
        for (let key in request) {
            let encodedKey = encodeURIComponent(key)
            let encodedValue = encodeURIComponent(request[key])
            formBody.push(encodedKey + '=' + encodedValue)
        }
        formBody = formBody.join('&')

        fetch(metrics.BASE_URL + '/edit_check_jadwal.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.status != 'success') {
                alert('Ada yang salah')
            }
        })
    }

    renderScheduleList() {
        if (this.state.isLoadingData) {
            return (
                <ActivityIndicator />
            )
        } else {
            return (
                <View>
                    <FlatList
                        data={this.state.scheduleList}
                        extraData={this.state}
                        renderItem={({ item, index }) =>
                            <CheckBox
                                iconStyle={styles.checkboxIconStyle}
                                label={item.judul_jadwal}
                                size={30}
                                checked={item.status_jadwal == 'belum' ? false : true}
                                style={styles.checkboxItem}
                                onPress={(checked) => {
                                    let scheduleList = this.state.scheduleList
                                    scheduleList[index].status_jadwal == 'sudah' ? scheduleList[index].status_jadwal = 'belum' : scheduleList[index].status_jadwal = 'sudah'
                                    this.setState({ scheduleList: scheduleList })
                                    this.updateScheduleStatus(scheduleList[index].id_jadwal_user)
                                }}
                            />
                        }
                        keyExtractor={(item, index) => index}
                        removeClippedSubviews={false}
                    />
                </View>
            )
        }
    }

    getCompletedSchedule() {
        let count = 0
        for (let index in this.state.scheduleList) {
            if (this.state.scheduleList[index].status_jadwal == 'sudah') {
                count++
            }
        }
        return count
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.summaryContainer}>
                    <Text> {this.getCompletedSchedule()}/{this.state.scheduleList.length || 0} telah diselesaikan </Text>
                </View>
                {this.renderScheduleList()}
                <View style={styles.buttonsContainer}>
                    <SquareButton
                        text='Minggu lalu'
                        buttonStyle={styles.buttons}
                        arrow='left'
                        textStyle={styles.buttonText}
                        onPress={() => store.dispatch(setWeek(this.props.week - 1))}
                    />
                    <SquareButton
                        text='Minggu depan'
                        buttonStyle={styles.buttons}
                        arrow='right'
                        textStyle={styles.buttonText}
                        onPress={() => store.dispatch(setWeek(this.props.week + 1))}
                    />
                </View>
                <View style={{ marginTop: 20, alignItems: 'center' }}>
                    <SquareButton
                        text={'Lihat seluruh jadwal'}
                        buttonStyle={{ borderRadius: 5, height: 50, backgroundColor: '#FFF', borderColor: 'rgb(92, 234, 151)', borderWidth: 3, width: metrics.DEVICE_WIDTH * 0.6 }}
                        textStyle={{ fontFamily: 'roboto-regular', color: 'rgb(92, 234, 151)' }}
                        onPress={() => this.props.rootNav.navigate('daftarJanjiTemu')}
                    />
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    checkboxItem: {
        paddingLeft: 20,
        backgroundColor: 'white',
        paddingRight: 20
    },

    checkboxIconStyle: {
        color: 'rgb(92, 234, 151)'
    },

    summaryContainer: {
        height: 40,
        marginLeft: 15,
        justifyContent: 'center'
    },

    buttonsContainer: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    buttons: {
        backgroundColor: 'rgb(92, 234, 151)',
        borderRadius: 5,
        height: 50,
        width: metrics.DEVICE_WIDTH * 0.4
    },

    buttonText: {
        color: 'white',
        fontFamily: 'roboto-regular'
    }
})

const mapStateToProps = (state) => {
    return {
        rootNav: state.storeNavigator.navigator,
        week: state.setWeek.week,
        username: state.setUsername.username
    }
}

export default connect(mapStateToProps)(Schedule);
