import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
const url = 'http://sehati-project.net/assets/connection'

export default{
    DEVICE_WIDTH: width,
    DEVICE_HEIGHT: height,
    BASE_URL: url,
    SECONDARY_COLOR: 'rgb(92, 234, 151)',
    LOCATION_URL: 'https://pasarsuroboyo.id/api/daerah/'
}
