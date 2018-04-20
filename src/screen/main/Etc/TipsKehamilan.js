import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  WebView,
  Button
} from 'react-native'
import Modal from 'react-native-modal'

import CustomTextInput from '../../../components/CustomTextInput'
import TipsItem from '../../../components/TipsItem'
import metrics from '../../../config/metrics'

export default class TipsKehamilan extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDataLoading: false,
      tipsList: null,
      modalIsVisble: false,
      modalContent: null,
      filteredTips: null
    }
  }

  static navigationOptions = {
    title: 'Tips Kehamilan '
  }

  componentDidMount() {
    this.setState({ isDataLoading: true })
    fetch(metrics.BASE_URL + '/get_kategori_tips_kehamilan.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isDataLoading: false,
          tipsList: responseJson,
          filteredTips: responseJson
        })
      })
  }

  filter(query) {
    let filteredTips = []
    for (let tips of this.state.tipsList) {
      let isExist = tips.nama_kategori.toLowerCase().search(query) >= 0 ? true : false
      if (isExist) {
        filteredTips.push(tips)
      }
    }
    this.setState({ filteredTips: filteredTips })
  }

  renderContent() {
    const { navigation } = this.props
    if (this.state.isDataLoading) {
      return <ActivityIndicator size="large" />
    } else {
      return (
        <FlatList
          data={this.state.filteredTips}
          extraData={this.state}
          renderItem={({ item }) => (
            <TipsItem
              text={item.nama_kategori}
              image={{ uri: item.photo_kategori_tips }}
              onPress={() =>
                navigation.navigate('tipsKehamilanKategori', {
                  kategori: item.nama_kategori
                })
              }
            />
          )}
        />
      )
    }
  }

  showTips(detail) {
    this.handleModal()
    this.setState({ modalContent: detail })
  }

  handleModal() {
    this.setState({ modalIsVisble: !this.state.modalIsVisble })
  }

  render() {
    return (
      <View style={styles.container}>
        <CustomTextInput
          placeholder={'Search'}
          style={styles.textInput}
          onChangeText={value => this.filter(value)}
        />
        {this.renderContent()}
        <Modal isVisible={this.state.modalIsVisble}>
          <View style={styles.modalContent}>
            <WebView
              source={{ html: this.state.modalContent }}
              style={styles.webview}
            />
            <Button
              title="Tutup"
              onPress={() => this.handleModal()}
              color="rgb(92, 234, 151)"
            />
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  textInput: {
    backgroundColor: '#FFF',
    width: metrics.DEVICE_WIDTH,
    borderRadius: 5,
    marginBottom: 10
  },

  modalContent: {
    backgroundColor: 'white',
    width: metrics.DEVICE_WIDTH * 0.8,
    height: metrics.DEVICE_HEIGHT * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
    paddingTop: 20,
    borderRadius: 10
  },

  webview: {
    width: metrics.DEVICE_WIDTH * 0.8,
    height: metrics.DEVICE_HEIGHT * 0.5,
    marginBottom: 10,
    backgroundColor: 'transparent'
  }
})
