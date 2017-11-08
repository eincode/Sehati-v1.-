import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';

const resetAction = (routeName) => {
    return NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({routeName: routeName})
        ]
    })
}

class HeaderRight extends Component{

    static propTypes = {
        text: PropTypes.string
    }

    static defaultProps = {
        text: 'Lanjut'
    }

    render(){
        const { userType, navigation, text } = this.props;
        const { navigate, dispatch } = navigation;
        console.log(navigation);
        if (navigation.state.routeName == 'terms'){
            return(
                <Text style = {{marginRight: 20, color: 'grey'}}
                    onPress = {() => {
                        userType == 'main' ? navigate('additional', { type: 'normal' }) :
                        userType == 'kader' ? dispatch(resetAction('kader')) :
                        dispatch(resetAction('bidan'))}
                    }>
                    {text}
                </Text>
            )
        }
        return(
            <Text style = {{marginRight: 20, color: 'grey'}} onPress = {() => {userType == 'bidan' || userType == 'kader' ? navigation.navigate('photo') : navigation.navigate('terms')}}>Lanjut</Text>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        userType: state.setUserType.userType
    }
}

export default connect(mapStateToProps)(HeaderRight);
