import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import metrics from '../config/metrics';

class MainLeftHeader extends Component {

    componentWillMount(){
        this.setState({ week: this.props.week })
    }

    componentWillReceiveProps(nextProps){
        this.setState({ week: nextProps.week })
    }

    getTrisemester() {
        if (this.state.week <= 13) {
            return '1'
        } else if (this.state.week <= 26) {
            return '2'
        } else {
            return '3'
        }
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('selectWeek')}>
                <Text style={{ marginLeft:10, fontWeight: 'bold', color: metrics.SECONDARY_COLOR }}>Trisemester {this.getTrisemester()}</Text>
                <Text style={{ marginLeft: 10, }}>Minggu ke: {this.state.week}</Text>
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        week: state.setWeek.week
    }
}

export default connect(mapStateToProps)(MainLeftHeader);
