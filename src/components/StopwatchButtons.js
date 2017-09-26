import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
const Kick = require('../../assets/buttons/Kick.png');
const Start = require('../../assets/buttons/Start.png');
const Stop = require('../../assets/buttons/Stop.png');

import metrics from '../config/metrics';

class StopwatchButtons extends Component {

  static propTypes = {
    type: PropTypes.string.isRequired,
    onPress: PropTypes.func
  }

  static defaultProps = {
    type: 'switchOn'
  }

  state = {
    type: this.props.type
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      type: nextProps.type
    })
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { type, text, onPress, ...otherProps } = this.props;
    const state = this.state.type;
    switch(state){
      case 'switchOn' :
        return (
          <TouchableOpacity onPress = {onPress}>
            <Image source = {Start} style = {styles.switchOnButton}/>
          </TouchableOpacity>
        );
      case 'switchOff' :
        return (
          <TouchableOpacity onPress = {onPress}>
            <Image source = {Stop} style = {styles.switchOnButton}/>
          </TouchableOpacity>
        );
      case 'kick' :
        return(
          <TouchableOpacity onPress = {onPress}>
            <Image source = {Kick} style = {styles.switchOnButton}/>
          </TouchableOpacity>
        )
    }
  }
}

const styles = StyleSheet.create({
  switchOnButton: {
    resizeMode: 'contain',
    width: metrics.DEVICE_WIDTH*0.25,
    height: metrics.DEVICE_WIDTH*0.25
  },

  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'rgb(92, 234, 151)',
  }
})

export default StopwatchButtons
