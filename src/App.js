import { StackNavigator } from 'react-navigation';
import { Platform, StatusBar, AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';

//Login screens
import LoginSelection from './screen/login/LoginSelection';
import LoginRegister from './screen/login/LoginRegister';
import Login from './screen/login/Login';
import Register from './screen/login/Register';
import PhoneNumber from './screen/login/PhoneNumber';
import Verification from './screen/login/Verification';
import Terms from './screen/login/Terms';
import Additional from './screen/login/Additional';
import ForgetPasswordEmail from './screen/login/ForgetPasswordEmail';
import ForgetPasswordInbox from './screen/login/ForgetPasswordInbox';
import NewPasswordInput from './screen/login/NewPasswordInput';
import PasswordChanged from './screen/login/PasswordChanged';
import Photo from './screen/login/Photo';

//Main screens
import Main from './screen/main/Main';
import Settings from './screen/main/Settings';
import SelectWeek from './screen/main/SelectWeek';
import About from './screen/main/About';

//Settings screens
import VerifyBidan from './screen/main/Settings/VerifyBidan';
import VerifyKader from './screen/main/Settings/VerifyKader';
import SelectProvince from './screen/main/Settings/SelectProvince';

//Schedule screens
import NewSchedule from './screen/main/Schedule/NewSchedule';
import SelectProvinsi from './screen/main/Schedule/SelectProvinsi';
import SelectKabupaten from './screen/main/Schedule/SelectKabupaten';
import SelectBranch from './screen/main/Schedule/SelectBranch';
import SelectHour from './screen/main/Schedule/SelectHour';
import SelectLab from './screen/main/Schedule/SelectLab';
import SelectService from './screen/main/Schedule/SelectService';
import SelectDate from './screen/main/Schedule/SelectDate';

//Journal screens
import NewJournal from './screen/main/Journal/NewJournal';
import DetailJournal from './screen/main/Journal/DetailJournal';
import NewJournalContinue from './screen/main/Journal/NewJournalContinue';

//Etc screens
import TipsKehamilan from './screen/main/Etc/TipsKehamilan';
import TipsKehamilanKategori from './screen/main/Etc/TipsKehamilanKategori';
import TipsKehamilanDetail from './screen/main/Etc/TipsKehamilanDetail';
import TanyaJawabKehamilan from './screen/main/Etc/TanyaJawabKehamilan';
import DaftarBelanja from './screen/main/Etc/DaftarBelanja';
import HitungKontraksi from './screen/main/Etc/HitungKontraksi';
import HitungTendangan from './screen/main/Etc/HitungTendangan';
import DaftarJanjiTemu from './screen/main/Etc/DaftarJanjiTemu';
import TanyaJawabKehamilanDetail from './screen/main/Etc/TanyaJawabKehamilanDetail';
import MomenKehamilan from './screen/main/Etc/MomenKehamilan';
import NewMoment from './screen/main/Etc/NewMoment';

//About screens
import Kebijakan from './screen/main/About/Kebijakan';
import Syarat from './screen/main/About/Syarat';

//Kader screens
import KaderMain from './screen/kader/Main';

//Bidan screens
import BidanMain from './screen/bidan/Main';
import BidanPatient from './screen/bidan/Patient';
import BidanKader from './screen/bidan/Kader';
import PasienKader from './screen/bidan/KaderPatient';

import store from './service/store';

const Screens = (signedIn = false) => {
  return StackNavigator({
  loginSelection: { screen: LoginSelection },
  loginRegister: { screen: LoginRegister },
  login: { screen: Login },
  register: { screen: Register },
  phoneNumber: { screen: PhoneNumber },
  verification: { screen: Verification },
  terms: { screen: Terms },
  additional: { screen: Additional },
  forgetPasswordEmail: { screen: ForgetPasswordEmail },
  forgetPasswordInbox: { screen: ForgetPasswordInbox },
  newPasswordInput: { screen: NewPasswordInput },
  passwordChanged: { screen: PasswordChanged },
  photo: { screen: Photo },
  main: { screen: Main },
  kader: { screen: KaderMain },
  bidan: { screen: BidanMain },
  bidanPatient: { screen: BidanPatient },
  bidanKader: { screen: BidanKader },
  pasienKader: { screen: PasienKader },
  newSchedule: { screen: NewSchedule },
  tipsKehamilan: { screen: TipsKehamilan },
  tipsKehamilanKategori: { screen: TipsKehamilanKategori },
  tipsKehamilanDetail: { screen: TipsKehamilanDetail },
  tanyaJawabKehamilan: { screen: TanyaJawabKehamilan },
  daftarBelanja: { screen: DaftarBelanja },
  newJournal: { screen: NewJournal },
  settings: { screen: Settings },
  selectWeek: { screen: SelectWeek },
  verifyBidan: { screen: VerifyBidan },
  verifyKader: { screen: VerifyKader },
  selectProvinsi: { screen: SelectProvinsi },
  selectKabupaten: { screen: SelectKabupaten },
  selectBranch: { screen: SelectBranch },
  selectHour: { screen: SelectHour },
  selectLab: { screen: SelectLab },
  selectService: { screen: SelectService },
  selectDate: { screen: SelectDate },
  about: { screen: About },
  hitungKontraksi: { screen: HitungKontraksi },
  hitungTendangan: { screen: HitungTendangan },
  daftarJanjiTemu: { screen: DaftarJanjiTemu },
  detailJournal: { screen: DetailJournal },
  newJournalContinue: { screen: NewJournalContinue },
  kebijakan: { screen: Kebijakan },
  syarat: { screen: Syarat },
  tanyaJawabKehamilanDetail: { screen: TanyaJawabKehamilanDetail },
  momenKehamilan: { screen: MomenKehamilan },
  selectProvince: { screen: SelectProvince },
  newMoment: { screen: NewMoment }
}, {
  initialRouteName: signedIn? 'main' : 'loginRegister'
})};

export default class sehatiApp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loginState: false
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('login', (err, result) => {
      this.setState({ loginState: result })
      SplashScreen.hide()
    })
  }

  render() {
    const App = Screens(this.state.loginState == 'true')
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}
