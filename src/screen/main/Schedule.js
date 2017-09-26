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
        tabBarLabel: 'Jadwal',
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
        isLoadingData: true
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
                                    scheduleList[index].status_jadwal = 'sudah'
                                    this.setState({ scheduleList: scheduleList })
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

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.summaryContainer}>
                    <Text> 0/3 telah diselesaikan </Text>
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
