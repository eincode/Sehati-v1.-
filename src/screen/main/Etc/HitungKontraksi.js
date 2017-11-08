import React, { Component } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, FlatList } from 'react-native';
import { Stopwatch } from 'react-native-stopwatch-timer';
import { connect } from 'react-redux';

import StopwatchButtons from '../../../components/StopwatchButtons';
import metrics from '../../../config/metrics';
import MenuButton from '../../../components/Menu'

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
    title: 'Hitung Kontraksi ',
    headerRight: (
      <MenuButton
        content = {`<p><strong>HITUNG KONTRAKSI</strong></p>
         
                 <p><strong>&nbsp;</strong></p>\n 
                 <p><strong>Kenapa menghitung kontraksi bermanfaat?</strong></p>\n 
                 <ol>\n 
                 <li>Menghitung kontraksi membantu Bunda memantau kontraksi yang dirasakan</li>\n 
                 <li>Kontraksi merupakan salah satu penanda kesiapan untuk melahirkan.</li>\n 
                 <li>Kontraksi yang semakin kuat, lama, dekat jaraknya dan sakit, umumnya merupakan pertanda buah hati sudah siap menyapa Dunia.</li>\n 
                 </ol>\n 
                 <p>&nbsp;</p>\n 
                 <p><strong>Kenapa kontraksi timbul?</strong></p>\n 
                 <ol>\n 
                 <li>Kontraksi timbul karena adanya pengencangan pada otot uterine atau saluran kencing.</li>\n 
                 <li>Bentuk kontraksi beragam, mulai dari keram hingga perut terasa kencang, panas dalam (<em>burning</em>), sakit punggung, dan lain-lain.</li>\n 
                 </ol>\n 
                 <p>&nbsp;</p>\n 
                 <p><strong>Apa yang harus dilakukan saat kontraksi terasa?</strong></p>\n 
                 <ol>\n 
                 <li>Setiap dokter atau bidan memiliki instruksi yang berbeda. Tidak ada salahnya jika sejak awal Bunda menanyakan hal ini kepada mereka.</li>\n 
                 <li>Secara umum, pada kehamilan pertama, biasanya dokter atau bidan akan meminta Bunda untuk menghubungi mereka saat kontraksi terjadi setiap 5 menit selama 1 menit dalam rentang waktu setidaknya satu jam.</li>\n 
                 </ol>\n 
                 <p>&nbsp;</p>\n 
                 <p><strong><em>Yuk</em></strong><strong> Manfaatkan Fitur Hitung Kontraksi</strong></p>\n 
                 <ol>\n 
                 <li>Tekan &ldquo;Mulai Kontraksi&rdquo; saat Bunda merasakan kontraksi dan tekan &ldquo;Stop Kontraksi&rdquo; saat kontraksi berhenti.</li>\n 
                 <li>Aplikasi ini akan merekam dan menyimpan data, menghitung lamanya kontraksi, rentang waktu diantara dua kontraksi, dan rata-ratanya.</li>\n 
                 </ol>\n 
                 <p>&nbsp;</p>\n 
                 <p><strong>Penting</strong></p>\n 
                 <ol>\n 
                 <li>Jika ketuban pecah, akan terjadi percepatan proses kelahiran, segera hubungi dokter atau bidan bunda.</li>\n 
                 <li>Jika ini bukan kehamilan pertama dan proses kelahiran pada kehamilan pertama Bunda berlangsung cepat, atau Bunda sudah mengalami pembukaan serta pelunakan rahim, segera hubungi dokter atau bidan Bunda begitu terjadi kontraksi yang sakit.</li>\n 
                 </ol >`}
      />
    )
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
          console.log()
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