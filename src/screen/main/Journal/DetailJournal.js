import React, { Component } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Table, TableWraper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import metrics from '../../../config/metrics';

class DetailJournal extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title
    })

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoadingData: false,
            tableHead: ['Tanggal', ...props.navigation.state.params.column]
        }
    }

    componentDidMount() {
        this.setState({ isLoadingData: true });
        let request = {
            username: this.props.username
        }
        let formBody = []
        for(let key in request){
            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(request[key])
            formBody.push(encodedKey + '=' + encodedValue)
        }
        formBody = formBody.join('&')
        fetch(metrics.BASE_URL + '/get_jurnal2.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then((response) => response.json())
            .then((responseJson) => {
                this.mapData(responseJson, this.props.navigation.state.params.field, this.props.navigation.state.params.type);
            })
    }

    mapData(response, field, type) {
        let data = [];
        for (let i = 0; i < response[field].length; i++) {
            if (this.props.navigation.state.params.column[1]){
                let diff = i == 0 ? 0 : response[field][i] - response[field][i-1];
                if (type == 'bayi') {
                    data.push([response.tanggal_bayi[i], response[field][i], diff]);
                } else {
                    data.push([response.tanggal_kehamilan[i], response[field][i], diff]);
                }
            } else {
                if (type == 'bayi'){
                    data.push([response.tanggal_bayi[i], response[field][i]]);
                } else {
                    data.push([response.tanggal_kehamilan[i], response[field][i]]);
                }
            }
        }
        this.setState({ data: data, isLoadingData: false })
    }

    renderContent() {
        if (this.state.isLoadingData) {
            return (
                <ActivityIndicator size='large' />
            )
        } else if (this.state.data.length == 0) {
            return (
                <Text>Tidak ada data untuk ditampilkan</Text>
            )
        } else {
            return (
                <Table>
                    <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text} />
                    <Rows data={this.state.data} style={styles.row} textStyle={styles.text} />
                </Table>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderContent()}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },

    head: {
        width: metrics.DEVICE_WIDTH * 0.8,
        height: 40,
        backgroundColor: '#f1f8ff'
    },

    text: {
        alignSelf: 'center'
    },

    row: {
        width: metrics.DEVICE_WIDTH * 0.8,
        height: 30
    }
})

const mapStateToProps = (state) => {
    return {
        username: state.setUsername.username
    }
}

export default connect(mapStateToProps)(DetailJournal);