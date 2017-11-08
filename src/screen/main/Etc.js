import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';

import PictureButton from '../../components/PictureButton';

class Etc extends Component{
    static navigationOptions = {
        tabBarLabel: 'Lain-lain ',
        tabBarIcon: ({ focused }) => {
            switch (focused){
                case true : return(
                    <Image source = {require('../../../assets/icons/Lain-lain-hijau.png')}/>
                )
                case false : return(
                    <Image source = {require('../../../assets/icons/Lain-lain-abu.png')}/>
                )
            }
        }
    }

    render(){
        return(
            <View style = {styles.container}>
                <View style = {styles.pictureContainer}>
                    <PictureButton
                        text = {'Daftar janji temu'}
                        picture = {require('../../../assets/pictures/Momen-kehamilanku.png')}
                        style = {styles.picture}
                        onButtonPressed = {() => this.props.rootNav.navigate('daftarJanjiTemu')}
                    />
                    <PictureButton
                        text = {'Hitung tendangan'}
                        picture = {require('../../../assets/pictures/Hitung-tendangan.png')}
                        style = {styles.picture}
                        onButtonPressed = {() => this.props.rootNav.navigate('hitungTendangan')}
                    />
                </View>
                <View style = {styles.pictureContainer}>
                    <PictureButton
                        text = {'Hitung Kontraksi'}
                        picture = {require('../../../assets/pictures/Hitung-kontraksi.png')}
                        style = {styles.picture}
                        onButtonPressed = {() => this.props.rootNav.navigate('hitungKontraksi')}
                    />
                    <PictureButton
                        text = {'Momen kehamilan'}
                        picture = {require('../../../assets/pictures/Daftar-belanja.png')}
                        style = {styles.picture}
                        onButtonPressed = {() => this.props.rootNav.navigate('momenKehamilan')}
                    />
                </View>
                <View style = {styles.pictureContainer}>
                    <PictureButton
                        text = {'Tanya jawab kehamilan'}
                        picture = {require('../../../assets/pictures/Tanya-jawab-kehamilan.png')}
                        style = {styles.picture}
                        onButtonPressed = {() => this.props.rootNav.navigate('tanyaJawabKehamilan')}
                    />
                    <PictureButton
                        text = {'Tips Kehamilan'}
                        picture = {require('../../../assets/pictures/Tips-kehamilan.png')}
                        style = {styles.picture}
                        onButtonPressed = {() => this.props.rootNav.navigate('tipsKehamilan')}
                    />
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    pictureContainer: {
        flexDirection: 'row'
    },

    picture: {
        marginLeft: 10
    }
})

const mapStateToProps = (state) => {
    return{
        rootNav: state.storeNavigator.navigator
    }
}

export default connect(mapStateToProps)(Etc);
