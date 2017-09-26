import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TextInput, DeviceEventEmitter } from 'react-native'
import { NavigationActions } from 'react-navigation'
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
			title: 'Momen Baru',
			headerRight: (
                <Text style={{ marginRight: 20, color: 'grey' }} onPress={() => dispatch(backAction)}>Simpan</Text>
            )
		}
	}

	constructor(props) {
		super(props)
		this.state = {
			message: ''
		}
	}

	saveMoment(caption, image) {
		const self = this
        let request = {
            username: this.props.username,
            minggu: this.props.week,
            image: image,
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

	render() {
		const { params } = this.props.navigation.state
		return (
			<View style={styles.container}>
				<View style={{ flex: 1, marginBottom: 10, marginTop: 5 }}>
					<Image source={{ uri: params.image }} style={{ flex: 1, resizeMode: 'contain' }}/>
				</View>
				<View style={{ flex: 1, alignItems: 'center' }}>
					<TextInput 
						multiline={true}
						style={styles.textInput}
						onChangeText={(value) => this.setState({ message: value })}
						placeholder={'Tulis pesan disini'}
						underlineColorAndroid={'transparent'}
					/>
					<CustomButton
						text='Simpan'
						buttonStyle={styles.button}
						textStyle={styles.buttonText}
						onPress={() => {this.saveMoment(this.state.message, params.selectedImage)}}
					/>
				</View>
			</View>
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
		width: metrics.DEVICE_WIDTH
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