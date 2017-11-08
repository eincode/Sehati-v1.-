import React, { Component } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import CheckBox from 'react-native-icon-checkbox';
import { connect } from 'react-redux';

import metrics from '../../../config/metrics';

class DaftarJanjiTemu extends Component {

    static navigationOptions = {
        title: 'Daftar Janji Temu '
    }

    constructor(props) {
        super(props);
        this.state = {
            isDataLoading: false,
            scheduleList: null
        }
    }

    componentDidMount() {
        this.setState({ isDataLoading: true });
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

        fetch(metrics.BASE_URL + '/get_jadwal_all.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({ isDataLoading: false, scheduleList: responseJson });
            })
    }

    renderContent() {
        if (this.state.isDataLoading) {
            return (
                <ActivityIndicator size='large' />
            )
        } else {
            return (
                <FlatList
                    data={this.state.scheduleList}
                    renderItem={({ item }) =>
                        <CheckBox
                            iconStyle={styles.checkboxIconStyle}
                            label={item.judul_jadwal}
                            size={30}
                            checked={item.status_jadwal == 'belum' ? false : true}
                            style={styles.checkboxItem}
                            onPress={() => console.log('pressed')}
                        />
                    }
                    keyExtractor={(item, index) => index}
                />
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
    },

    checkboxItem: {
        paddingLeft: 20,
        backgroundColor: 'white',
        paddingRight: 20
    },

    checkboxIconStyle: {
        color: 'rgb(92, 234, 151)'
    },
})

const mapStateToProps = (state) => {
    return {
        username: state.setUsername.username
    }
}

export default connect(mapStateToProps)(DaftarJanjiTemu);