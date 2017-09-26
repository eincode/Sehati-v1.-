import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback, ActivityIndicator, Alert } from 'react-native';
import Modal from 'react-native-modal';
import CheckBox from 'react-native-icon-checkbox';
import { connect } from 'react-redux'

import CustomTextInput from '../../../components/CustomTextInput';
import metrics from '../../../config/metrics';
import CustomButton from '../../../components/CustomButton';

class TextInputItem extends Component {

    static propTypes = {
        placeholder: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onChange: PropTypes.func
    }

    render() {
        const { placeholder, label, onChange } = this.props;
        return (
            <View style={styles.itemContainer}>
                <View style={styles.textInputContainer}>
                    <CustomTextInput
                        placeholder={placeholder}
                        keyboardType='numeric'
                        onChangeText={onChange}
                    />
                </View>
                <View style={styles.labelContainer}>
                    <Text>{label}</Text>
                </View>
            </View>
        )
    }

}

class PickerItem extends Component {

    static propTypes = {
        label: PropTypes.string.isRequired,
        items: PropTypes.array,
        selectedItem: PropTypes.string,
        onItemPress: PropTypes.func
    }

    state = {
        isModalVisible: false
    }

    renderItems(items, selectedItem, onPress) {
        return items.map(function (item, index) {
            return (
                <TouchableOpacity style={styles.listItem}>
                    <CheckBox
                        iconStyle={styles.checkboxIconStyle}
                        label={item}
                        size={30}
                        checked={selectedItem == item ? true : false}
                        onPress={() => {
                            onPress(item);
                        }}
                    />
                </TouchableOpacity>
            )
        })
    }

    handleModal() {
        this.setState({ isModalVisible: !this.state.isModalVisible })
    }

    render() {
        const { label, items, selectedItem, onItemPress } = this.props;
        return (
            <View>
                <TouchableOpacity style={styles.pickerItemContainer} onPress={() => this.handleModal()}>
                    <View style={styles.labelPickerContainer}>
                        <Text>{label}</Text>
                    </View>
                    <View style={styles.pickerContainer}>
                        <Text>{selectedItem}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableWithoutFeedback onPress={() => this.handleModal()}>
                    <Modal isVisible={this.state.isModalVisible} style={styles.bottomModal}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContent}>
                                {this.renderItems(items, selectedItem, onItemPress)}
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                </TouchableWithoutFeedback>
            </View>
        )
    }

}

class NewJournal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bentukValue: 'Normal',
            proporsiValue: 'Normal',
            ketebalanValue: 'Normal',
            letakValue: 'Normal',
            cairanKetubanValue: 'Normal',
            kelainanKongenitalValue: 'Tidak Ada',
            panjangBadanValue: '',
            beratBadanValue: '',
            denyutJantungValue: '',
            isLoading: false,
            isError: false
        }
    }

    static navigationOptions = ({ navigation }) => {
        const { navigate } = navigation;
        return {
            title: 'Jurnal baru'
        }
    }

    componentDidMount() {
        Alert.alert('Konfirmasi', 'Mohon tanyakan data ini pada bidanmu sebelum mengisi')
    }

    renderLoading() {
        if (this.state.isLoading) {
            return (
                <ActivityIndicator />
            )
        }
    }

    sendData() {
        this.setState({ isLoading: true });
        let request = {
            username: this.props.username,
            status: 'bayiku',
            panjang_tubuh_bayi: this.state.panjangBadanValue,
            berat_tubuh_bayi: this.state.beratBadanValue,
            denyut_jantung_bayi: this.state.denyutJantungValue,
            plasenta_bentuk_bayi: this.state.bentukValue,
            plasenta_proporsi_bayi: this.state.proporsiValue,
            plasenta_ketebalan_bayi: this.state.ketebalanValue,
            plasenta_letak_bayi: this.state.letakValue,
            cairan_ketuban_bayi: this.state.cairanKetubanValue,
            kelainan_kongenital_bayi: this.state.kelainanKongenitalValue,
        }
        let formBody = []
        for (let key in request) {
            let encodedKey = encodeURIComponent(key)
            let encodedValue = encodeURIComponent(request[key])
            formBody.push(encodedKey + '=' + encodedValue)
        }
        formBody = formBody.join('&')

        fetch(metrics.BASE_URL + '/insert_jurnal.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status == 'success') {
                    this.setState({ isLoading: false })
                    this.props.navigation.navigate('newJournalContinue');
                } else {
                    this.setState({ isLoading: false, isError: true })
                }
            })
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <TextInputItem
                    placeholder='Panjang Badan'
                    label='mm'
                    onChange={(value) => this.setState({ panjangBadanValue: value })}
                />
                <TextInputItem
                    placeholder='Berat Badan'
                    label='gram'
                    onChange={(value) => this.setState({ beratBadanValue: value })}
                />
                <TextInputItem
                    placeholder='Denyut Jantung'
                    label='dpm'
                    onChange={(value) => this.setState({ denyutJantungValue: value })}
                />
                <View style={styles.divider}>
                    <Text>Plasenta</Text>
                </View>
                <PickerItem
                    label={'Bentuk'}
                    items={['Normal', 'Tidak Normal']}
                    selectedItem={this.state.bentukValue}
                    onItemPress={(item) => this.setState({ bentukValue: item })}
                />
                <PickerItem
                    label={'Proporsi'}
                    items={['Normal', 'Tidak Normal']}
                    selectedItem={this.state.proporsiValue}
                    onItemPress={(item) => this.setState({ proporsiValue: item })}
                />
                <PickerItem
                    label={'Ketebalan'}
                    items={['Normal', 'Tidak Normal']}
                    selectedItem={this.state.ketebalanValue}
                    onItemPress={(item) => this.setState({ ketebalanValue: item })}
                />
                <PickerItem
                    label={'Letak'}
                    items={['Normal', 'Tidak Normal']}
                    selectedItem={this.state.letakValue}
                    onItemPress={(item) => this.setState({ letakValue: item })}
                />
                <View style={styles.divider} />
                <PickerItem
                    label={'Cairan Ketuban'}
                    items={['Normal', 'Sedikit', 'Banyak']}
                    selectedItem={this.state.cairanKetubanValue}
                    onItemPress={(item) => this.setState({ cairanKetubanValue: item })}
                />
                <PickerItem
                    label={'Kelainan Kongenital'}
                    items={['Tidak Ada', 'Minor', 'Mayor']}
                    selectedItem={this.state.kelainanKongenitalValue}
                    onItemPress={(item) => this.setState({ kelainanKongenitalValue: item })}
                />
                {this.renderLoading()}
                <View style = {{ alignItems: 'center', marginTop: 10 }}>
                    <CustomButton
                        text={this.state.isError ? 'Terjadi kesalahan' : 'Lanjut'}
                        buttonStyle={styles.button}
                        textStyle={styles.buttonText}
                        onPress={() => this.sendData()}
                    />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    divider: {
        marginTop: 5,
        marginBottom: 5,
        height: 30,
        paddingLeft: 20,
        justifyContent: 'center'
    },

    itemContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingRight: 10,
        marginBottom: 5
    },

    textInputContainer: {
        flex: 10
    },

    labelContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    pickerItemContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingRight: 20,
        paddingLeft: 20,
        marginBottom: 5,
        paddingTop: 5,
        paddingBottom: 5,
        height: 50,
    },

    labelPickerContainer: {
        flex: 2,
        justifyContent: 'center'
    },

    pickerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0
    },

    modalContent: {
        backgroundColor: 'white',
        paddingBottom: 20,
        paddingTop: 20,
        justifyContent: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        paddingLeft: 20
    },

    listItem: {
        height: 50,
        justifyContent: 'center',
        marginBottom: 5
    },

    checkboxIconStyle: {
        color: 'rgb(92, 234, 151)'
    },

    button: {
        backgroundColor: 'rgb(92, 234, 151)',
    },

    buttonText: {
        color: 'white',
        fontFamily: 'roboto-regular'
    }
})

const mapStateToProps = (state) => {
    return{
        username: state.setUsername.username
    }
}

export default connect(mapStateToProps)(NewJournal)
