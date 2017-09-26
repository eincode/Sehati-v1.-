import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import CustomTextInput from '../../../components/CustomTextInput';
import ListButton from '../../../components/ListButton';
import CustomButton from '../../../components/CustomButton';
import ValueList from '../../../components/ValueList';

import metrics from '../../../config/metrics';

export default class NewSchedule extends Component {

    static navigationOptions = {
        title: 'Jadwal baru'
    }

    state = {
        summary: false
    }

    summary() {
        if (this.state.summary) {
            return (
                <View>
                    <ValueList
                        title={'Total biaya pemeriksaan'}
                        content={'Rp. 1.000.000'}
                    />
                    <ValueList
                        title={'Biaya home service'}
                        content={'Rp. 100.000'}
                    />
                    <ValueList
                        title={'Total pembayaran'}
                        content={'Rp. 1.100.000'}
                    />
                </View>
            )
        }
    }

    status() {
        if (this.state.summary) {
            return (
                <View style={styles.statusContainer}>
                    <Text style={styles.status}>P E N D I N G</Text>
                </View>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {this.status()}
                    <View style={styles.divider} />
                    <View style={styles.question}>
                        <Text style={styles.text}>Mengapa perlu periksa ke</Text>
                        <Text style={styles.text}>laboratorium di trisemester 3?</Text>
                    </View>
                    <View style={styles.divider} />
                    <ListButton
                        text={'Pilih provinsi'}
                        arrow={true}
                        onPress = {() => this.props.navigation.navigate('selectProvinsi')}
                    />
                    <ListButton
                        text={'Pilih kabupaten/kota'}
                        arrow={true}
                        onPress = {() => this.props.navigation.navigate('selectKabupaten')}
                    />
                    <View style={styles.divider} />
                    <ListButton
                        text={'Pilih lab klinik'}
                        arrow={true}
                        onPress = {() => this.props.navigation.navigate('selectLab')}
                    />
                    <ListButton
                        text={'Pilih cabang'}
                        arrow={true}
                        onPress = {() => this.props.navigation.navigate('selectBranch')}                
                    />
                    <View style={styles.divider} />
                    <ListButton
                        text={'Pilih layanan'}
                        arrow={true}
                        onPress = {() => this.props.navigation.navigate('selectService')}
                    />
                    <ListButton
                        text={'Pilih tanggal pemeriksaan'}
                        arrow={true}
                        onPress = {() => this.props.navigation.navigate('selectDate')}
                    />
                    <ListButton
                        text={'Perkiraan jam home service'}
                        arrow={true}
                        onPress = {() => this.props.navigation.navigate('selectHour')}
                    />
                    <View style={styles.divider} />
                    {this.summary()}
                    <View style={styles.buttonContainer}>
                        <CustomButton
                            text='Lanjutkan'
                            buttonStyle={styles.button}
                            textStyle={styles.buttonText}
                            onPress={() => this.setState({ summary: true })}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    divider: {
        height: 10
    },

    text: {
        fontFamily: 'roboto-regular'
    },

    item: {
        height: 50,
        backgroundColor: 'white',
        paddingLeft: 20
    },

    itemText: {
        color: 'grey'
    },

    question: {
        paddingLeft: 20,
        height: 70,
        backgroundColor: 'white',
        justifyContent: 'center'
    },

    button: {
        marginTop: 20,
        backgroundColor: 'rgb(92, 234, 151)'
    },

    buttonText: {
        fontFamily: 'roboto-regular',
        color: 'white'
    },

    buttonContainer: {
        alignItems: 'center'
    },

    statusContainer: {
        backgroundColor: '#ffff8d',
        alignItems: 'center',
        height: 30,
        width: metrics.DEVICE_WIDTH,
        justifyContent: 'center'
    },

    status: {
        fontFamily: 'roboto-regular',
        color: 'grey'
    }
})