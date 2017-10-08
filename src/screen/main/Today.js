import React, { Component } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { connect } from 'react-redux';

import Tabs from '../../components/Tabs';
import Bayiku from './Today/Bayiku';
import Kehamilanku from './Today/Kehamilanku';
import metrics from '../../config/metrics';

class Today extends Component {
    static navigationOptions = {
        tabBarLabel: 'Hari ini',
        tabBarIcon: ({ focused }) => {
            switch (focused) {
                case true: return (
                    <Image source={require('../../../assets/icons/Hari-ini-hijau.png')} />
                )
                case false: return (
                    <Image source={require('../../../assets/icons/Hari-ini-abu.png')} />
                )
            }
        }
    }

    state = {
        activePage: 'bayi',
        data: null
    }

    onChangeTab(param) {
        switch (param) {
            case 'bayi': this.setState({ activePage: 'bayi' }); return;
            case 'kehamilan': this.setState({ activePage: 'kehamilan' }); return;
        }
    }

    getActivePage() {
        switch (this.state.activePage) {
            case 'bayi': return <Bayiku data={this.state.data} navigation={this.props.navigation} />
            case 'kehamilan': return <Kehamilanku data={this.state.data} navigation={this.props.navigation} />
        }
    }

    componentDidMount() {
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(nextProps) {
        let request = {
            minggu: nextProps.week
        }
        let formBody = [];
        for (let key in request) {
            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(request[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');

        fetch(metrics.BASE_URL+'/get_artikel.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then((response) => response.json())
        .then((responseJson) => this.setState({ data: responseJson }))
        
    }

    render() {
        return (
            <View style={styles.container}>
                <Tabs
                    initialTab={this.state.activePage}
                    onChangeTab={(param) => { this.onChangeTab(param) }} />
                {this.getActivePage()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

const mapStateToProps = (state) => {
    return {
        username: state.setUsername.username,
        week: state.setWeek.week,
        rootNav: state.storeNavigator.navigator        
    }
}

export default connect(mapStateToProps)(Today);