import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, TouchableWithoutFeedback, AsyncStorage } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from 'react-native-vector-icons';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import MenuItem from './MenuItem';

const resetAction = (routeName) => {
    return NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: routeName })
        ]
    })
}

class MenuButton extends Component {

    state = {
        modalOpened: false
    }

    handleModal() {
        this.setState({ modalOpened: !this.state.modalOpened })
    }

    handleNavigation(screen) {
        this.handleModal();
        if (screen == 'logout') {
            AsyncStorage.setItem('login', 'false')
            this.props.rootNav.dispatch(resetAction('loginSelection'))
        } else {
            this.props.rootNav.navigate(screen);
        }
    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={() => this.handleModal()}>
                    <Image style={{ marginRight: 20 }} source={require('../../assets/icons/Menu.png')} />
                </TouchableOpacity>
                <TouchableWithoutFeedback onPress={() => this.handleModal()}>
                    <Modal isVisible={this.state.modalOpened} style={styles.modal}>
                        <View style={styles.modalContent}>
                            <MenuItem text='Pengaturan' onPress={() => this.handleNavigation('settings')}>
                                <Image source={require('../../assets/icons/settings.png')} style={{ height: 20, resizeMode: 'contain' }}/>
                            </MenuItem>
                            <MenuItem text='Tentang Sehati' onPress={() => this.handleNavigation('about')}>
                                <Image source={require('../../assets/icons/Information-icon.png')} style={{ height: 20, resizeMode: 'contain' }}/>
                            </MenuItem>
                            <MenuItem text='Keluar' onPress = {() => this.handleNavigation('logout')}>
                                <Image source={require('../../assets/icons/logout.png')} style={{ height: 20, resizeMode: 'contain' }}/>
                            </MenuItem>
                        </View>
                    </Modal>
                </TouchableWithoutFeedback>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0
    },

    modalContent: {
        backgroundColor: 'white',
        paddingBottom: 10,
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
})

const mapStateToProps = (state) => {
    return {
        rootNav: state.storeNavigator.navigator
    }
}

export default connect(mapStateToProps)(MenuButton);
