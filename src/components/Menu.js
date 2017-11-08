import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, TouchableWithoutFeedback, AsyncStorage, Platform, WebView, Button } from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';

class Menu extends Component {

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
            this.props.rootNav.dispatch(resetAction('loginRegister'))
        } else {
            this.props.rootNav.navigate(screen);
        }
    }

    render() {
        let font = Platform.OS == 'ios' ? '101%' : '101%'
        console.log(this.props)
        return (
            <View>
                <TouchableOpacity onPress={() => this.handleModal()}>
                    <Image style={{ marginRight: 20, resizeMode: 'contain', width: 25, height: 25 }} source={require('../../assets/icons/Information-icon.png')} />
                </TouchableOpacity>
                    <Modal isVisible={this.state.modalOpened} style={styles.modal}>
                        <View style={styles.modalContent}>
                          <WebView
                            source={{ html: this.props.content+`<style>p, li{font-family: roboto; font-size: ${font}}</style>` }}
                            style={styles.webView}
                            scalesPageToFit={Platform.OS == 'android' ? true : false}                    
                          />
                        </View>
                        <Button 
                          title={'Tutup'}
                          color={'rgb(92, 234, 151)'}
                          onPress={() => this.handleModal()}
                        />
                    </Modal>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    modal: {
        margin: 0
    },

    modalContent: {
        backgroundColor: 'white',
        paddingBottom: 10,
        paddingTop: 10,
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        flex: 1
    },

    webView: {
      backgroundColor: 'transparent',
      flex: 1
    }
})

const mapStateToProps = (state) => {
    return {
        rootNav: state.storeNavigator.navigator
    }
}

export default connect(mapStateToProps)(Menu);
