import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TextInput, DeviceEventEmitter, ScrollView } from 'react-native'
import { NavigationActions } from 'react-navigation'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { connect } from 'react-redux'

import CustomButton from '../../../components/CustomButton'
import metrics from '../../../config/metrics'

const backAction = NavigationActions.back({
	key: 'id-1506423751787-2'
})

class NewMomentCaption extends Component {

	static navigationOptions = ({ navigation }) => {
		const { navigate, state, dispatch } = navigation
		return {
			title: 'Momen Baru'
		}
	}

	constructor(props) {
		super(props)
		this.state = {
			message: ''
		}
	}

	saveMoment(caption, image) {
		let sentImage = (image != null) ? image : 'null'
		const self = this
        let request = {
            username: this.props.username,
            minggu: this.props.week,
            image: sentImage,
            caption: caption
        }
        let formBody = []
        for (let key in request) {
            let encodedKey = encodeURIComponent(key)
            let encodedValue = encodeURIComponent(request[key])
            formBody.push(encodedKey + '=' + encodedValue)
        }
        formBody = formBody.join('&')

        fetch(metrics.BASE_URL + '/insert_momen.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status == 'success') {
                    DeviceEventEmitter.emit('shouldRefresh', true)
					this.props.navigation.dispatch(NavigationActions.back({ key: self.props.navigation.state.params.id }))
                } else {
                    alert('Gagal')
                }
            })
	}
	
	renderImage() {
		if (this.props.navigation.state.params.image != null) {
			console.log(this.props.navigation.state.params.image)
			return (
				<View style={{ flex: 1, marginBottom: 10, marginTop: 5 }}>
					<Image source={{ uri: this.props.navigation.state.params.image }} style={{ flex: 1, resizeMode: 'contain' }}/>
				</View>
			)
		}
	}

	render() {
		const { params } = this.props.navigation.state
		return (
			<ScrollView style={styles.container}>
				{this.renderImage()}
				<View style={{ flex: 1, alignItems: 'center' }}>
					<TextInput 
						multiline={true}
						style={styles.textInput}
						onChangeText={(value) => this.setState({ message: value })}
						placeholder={'Tulis pesan disini'}
						underlineColorAndroid={'transparent'}
						textAlignVertical={'top'}
					/>
					<CustomButton
						text='Simpan'
						buttonStyle={styles.button}
						textStyle={styles.buttonText}
						onPress={() => {this.saveMoment(this.state.message, params.selectedImage)}}
					/>
					<KeyboardSpacer />
				</View>
			</ScrollView>
		)
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},

	textInput: {
        backgroundColor: '#FFFA',
        borderRadius: 5,
        marginBottom: 10,
		flex: 1,
		padding: 5,
		width: metrics.DEVICE_WIDTH,
		height: metrics.DEVICE_HEIGHT*0.4
	},
	
	button: {
		marginTop: 5,
        backgroundColor: 'rgb(92, 234, 151)'
	},

	buttonText: {
        fontFamily: 'roboto-regular',
        color: 'white'
    },
})

const mapStateToProps = (state) => {
	return {
		username: state.setUsername.username,
		week: state.setWeek.week
	}
}

export default connect(mapStateToProps)(NewMomentCaption)