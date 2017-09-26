import React, { Component } from 'react';
import { Stopwatch } from 'react-native-stopwatch-timer';
import { View, StyleSheet, Text, ActivityIndicator, FlatList } from 'react-native';
import { connect } from 'react-redux';

import StopwatchButtons from '../../../components/StopwatchButtons';
import metrics from '../../../config/metrics';

class HitungTendangan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stopwatchStart: false,
            stopwatchReset: false,
            switchButton: 'switchOn',
            kick: 0,
            isDataLoading: false,
            data: null,
            currentTime: ''
        }
        this.getCurrentTime = this.getCurrentTime.bind(this)
    }

    static navigationOptions = {
        title: 'Hitung Tendangan'
    }

    componentDidMount() {
        this.setState({ isDataLoading: true });
        let request = {
            username: this.props.username
        }
        let formBody = []
        for (let key in request) {
            let encodedKey = encodeURIComponent(key)
            let encodedValue = encodeURIComponent(request[key])
            formBody.push(encodedKey + '=' + encodedValue)
        }
        formBody = formBody.join('&')
        fetch(metrics.BASE_URL + '/get_tendangan.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then((response) => response.json())
            .then((responseJson) => {
                let data = [];
                for (let i = responseJson.id_tendangan.length - 1; i >= 0; i--) {
                    data.push({
                        key: i,
                        id_tendangan: responseJson.id_tendangan[i],
                        waktu_tendangan: responseJson.waktu_tendangan[i],
                        durasi_tendangan: responseJson.durasi_tendangan[i],
                        count_tendangan: responseJson.count_tendangan[i],
                        tanggal_tendangan: responseJson.tanggal_tendangan[i],
                    })
                }
                this.setState({ data: data, isDataLoading: false })
            })
    }

    renderList() {
        if (this.state.isDataLoading) {
            return (
                <ActivityIndicator />
            )
        } else {
            return (
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) =>
                        <View style={styles.itemContainer}>
                            <View style={styles.itemDetails}>
                                <Text>{item.tanggal_tendangan}</Text>
                            </View>
                            <View style={styles.itemDetails}>
                                <Text>{item.waktu_tendangan}</Text>
                            </View>
                            <View style={styles.itemDetails}>
                                <Text>{item.durasi_tendangan}</Text>
                            </View>
                            <View style={styles.itemDetails}>
                                <Text>{item.count_tendangan}</Text>
                            </View>
                        </View>
                    }
                />
            )
        }
    }

    switchButtonPressed() {
        if (this.state.switchButton == 'switchOn') {
            this.setState({
                switchButton: 'switchOff',
                stopwatchStart: true,
                stopwatchReset: false,
                kick: 0
            });
        } else {
            this.setState({
                switchButton: 'switchOn',
                stopwatchStart: false,
                stopwatchReset: true
            });
            let request = {
                waktu_tendangan: `${new Date().getHours()}:${new Date().getMinutes()}`,
                durasi_tendangan: this.currentTime.slice(3),
                username: this.props.username,
                count_tendangan: 10
            }
            let formBody = []
            for (let key in request) {
                let encodedKey = encodeURIComponent(key)
                let encodedValue = encodeURIComponent(request[key])
                formBody.push(encodedKey + '=' + encodedValue)
            }
            formBody = formBody.join('&')

            fetch(metrics.BASE_URL + '/insert_tendangan.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formBody
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.componentDidMount();
                })
        }
    }

    kick() {
        if (this.state.switchButton == 'switchOn') {
            return;
        }
        var kick = this.state.kick;
        kick++;
        this.setState({
            kick: kick
        })
        if (kick == 10) {
            this.switchButtonPressed();
            this.setState({
                kick: 0
            })
            return;
        }
    }

    getCurrentTime(time){
        this.currentTime = time
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.stopwatchContainer}>
                    <Stopwatch
                        start={this.state.stopwatchStart}
                        reset={this.state.stopwatchReset}
                        options={stopwatchStyle}
                        getTime={this.getCurrentTime}
                    />
                    <View>
                        <Text style={stopwatchStyle.text}>{this.state.kick}</Text>
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonsContainer}>
                        <StopwatchButtons
                            type={this.state.switchButton}
                            onPress={() => this.switchButtonPressed()}
                        />
                    </View>
                    <View style={styles.buttonsContainer}>
                        <StopwatchButtons
                            type={'kick'}
                            onPress={() => this.kick()}
                        />
                    </View>
                </View>
                <View style={styles.tableHeader}>
                    <Text style={{ flex: 1, textAlign: 'center' }}>Tanggal</Text>
                    <Text style={{ flex: 1, textAlign: 'center' }}>Waktu</Text>
                    <Text style={{ flex: 1, textAlign: 'center' }}>Lama</Text>
                    <Text style={{ flex: 1, textAlign: 'center' }}>Tendangan</Text>
                </View>
                <View style={styles.tableContainer}>
                    {this.renderList()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    stopwatchContainer: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        flex: 1,
        marginRight: 20
    },

    buttonsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },

    container: {
        flex: 1
    },

    tableHeader: {
        flexDirection: 'row',
        marginHorizontal: 10
    },

    tableContainer: {
        flex: 2,
        backgroundColor: 'white',
        marginTop: 10,
        justifyContent: 'center'
    },

    itemContainer: {
        width: metrics.DEVICE_WIDTH,
        height: 30,
        flexDirection: 'row'
    },

    itemDetails: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const stopwatchStyle = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        justifyContent: 'center'
    },

    text: {
        fontSize: 30,
    }
})

const mapStateToProps = (state) => {
    return {
        username: state.setUsername.username
    }
}

export default connect(mapStateToProps)(HitungTendangan);