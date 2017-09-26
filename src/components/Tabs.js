import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

export default class Tabs extends Component{

    static propTypes = {
        initialTab: PropTypes.string.isRequired,
        onChangeTab: PropTypes.func.isRequired
    }

    state = {
        activeTab: 'bayi'
    }

    componentWillMount(){
        this.setState({activeTab: this.props.initialTab});
    }

    componentWillReceiveProps(nextProps){
        this.setState({activeTab: nextProps.initialTab});
    }

    render(){
        const { initialTab, onChangeTab } = this.props;
        return(
            <View style = {styles.container}>
                <TouchableOpacity style = {(this.state.activeTab === 'bayi') ? styles.activeTab : styles.tab} onPress = {() => onChangeTab('bayi')}>
                    <Text style = {(this.state.activeTab === 'bayi') ? styles.activeText : null}>Bayiku</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {(this.state.activeTab === 'kehamilan') ? styles.activeTab : styles.tab} onPress = {() => onChangeTab('kehamilan')}>
                    <Text style = {(this.state.activeTab === 'kehamilan') ? styles.activeText : null}>Kehamilanku</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'rgb(86,234,146)'
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'rgb(248,248,248)'
    },
    activeTab: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'rgb(86,234,146)'
    },

    activeText: {
        color: 'white'
    }
})
