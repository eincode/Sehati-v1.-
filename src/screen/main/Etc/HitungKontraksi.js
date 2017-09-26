import React, { Component } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, FlatList } from 'react-native';
import { Stopwatch } from 'react-native-stopwatch-timer';
import { connect } from 'react-redux';

import StopwatchButtons from '../../../components/StopwatchButtons';
import metrics from '../../../config/metrics';

class HitungKontraksi extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stopwatchStart: false,
      stopwatchReset: false,
      buttonState: 'switchOn',
      isDataLoading: false,
      data: null,
      lastContractionTime: null,
      beginTime: null,
      endTime: null
    }
    this.getCurrentTime = this.getCurrentTime.bind(this)
  }

  static navigationOptions = {
    title: 'Hitung Kontraksi'
  }

  componentDidMount() {
    this.setState({ isDataLoading: true });
    let request = {
      username: this.props.username
    }
    let formBody = []
    for (let key in request) {
      let encodedKey = encodeURIComponent(key)
      let encodedValue = encodeURIComponent(request[key])
      formBody.push(encodedKey + '=' + encodedValue)
    }
    formBody = formBody.join('&')

    fetch(metrics.BASE_URL + '/get_kontraksi.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formBody
    }).then((response) => response.json())
      .then((responseJson) => {
        let data = [];
        for (let i = responseJson.id_kontraksi.length - 1; i >= 0; i--) {
          data.push({
            key: i,
            id_kontraksi: responseJson.id_kontraksi[i],
            durasi_kontraksi: responseJson.durasi_kontraksi[i],
            time_apart: responseJson.time_apart[i],
            time_kontraksi: responseJson.time_kontraksi[i],
            tanggal_kontraksi: responseJson.tanggal_kontraksi[i],
          })
        }
        this.setState({ data: data, isDataLoading: false })
      })
  }

  onBackPressed() {
    this.props.navigator.pop();
  }

  onSwitchPressed() {
    switch (this.state.buttonState) {
      case 'switchOn': this.setState({ buttonState: 'switchOff', stopwatchStart: true, stopwatchReset: false, beginTime: `${new Date().getHours()}:${new Date().getMinutes()}` }); return;
      case 'switchOff': {
        this.setState({ buttonState: 'switchOn', stopwatchStart: false, endTime: `${new Date().getHours()}:${new Date().getMinutes()}` });
        setTimeout(() => {
          let request = {
            username: this.props.username,
            time_apart: (this.state.lastContractionTime == null ? 0 : (Date.now() / 1000 - this.state.lastContractionTime)),
            durasi_kontraksi: this.currentTime.slice(-2),
            time_kontraksi: `${this.state.beginTime}-${this.state.endTime}`
          }
          let formBody = []
          for (let key in request) {
            let encodedKey = encodeURIComponent(key)
            let encodedValue = encodeURIComponent(request[key])
            formBody.push(encodedKey + '=' + encodedValue)
          }
          formBody = formBody.join('&')

          fetch(metrics.BASE_URL + '/insert_kontraksi.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
          }).then((response) => response.json())
            .then((responseJson) => {
              this.setState({ lastContractionTime: Date.now()/1000, stopwatchReset: true })
              this.componentDidMount()
            })
        }, 500)

        return;
      }
    }

  }

  getCurrentTime(time){
    this.currentTime = time
    console.log(time)
  }

  renderData() {
    if (this.state.isDataLoading) {
      return (
        <ActivityIndicator />
      )
    } else {
      return (
        <FlatList
          data={this.state.data}
          renderItem={({ item }) =>
            <View style={styles.itemContainer}>
              <View style={styles.itemDetails}>
                <Text>{item.durasi_kontraksi}</Text>
              </View>
              <View style={styles.itemDetails}>
                <Text>{item.time_apart}</Text>
              </View>
              <View style={styles.itemDetails}>
                <Text>{item.time_kontraksi}</Text>
              </View>
            </View>
          }
        />
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.stopwatchContainer} >
          <Stopwatch
            start={this.state.stopwatchStart}
            reset={this.state.stopwatchReset}
            options={stopwatchStyle}
            getTime={this.getCurrentTime}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <StopwatchButtons
            type={this.state.buttonState}
            onPress={() => this.onSwitchPressed()}
          />
          <View style={styles.tableHeader}>
            <Text style={{ flex: 1, textAlign: 'center' }}>Length</Text>
            <Text style={{ flex: 1, textAlign: 'center' }}>Time Apart</Text>
            <Text style={{ flex: 1, textAlign: 'center' }}>Time</Text>
          </View>
        </View>
        <View style={styles.tableContainer}>
          {this.renderData()}
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  stopwatchContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  tableContainer: {
    flex: 2,
    backgroundColor: 'white',
    justifyContent: 'center'
  },

  tableHeader: {
    flexDirection: 'row',
    marginHorizontal: 10
  },

  itemContainer: {
    width: metrics.DEVICE_WIDTH,
    height: 30,
    flexDirection: 'row'
  },

  itemDetails: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const stopwatchStyle = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center'
  },

  text: {
    fontSize: 30,
  }
})

const mapStateToProps = (state) => {
  return {
    username: state.setUsername.username
  }
}

export default connect(mapStateToProps)(HitungKontraksi);