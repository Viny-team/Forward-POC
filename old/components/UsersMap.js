import React from 'react'
import {StyleSheet, View} from 'react-native'
import MapView from 'react-native-maps'

export default usersMap = props => {
    let userLocationMarker = null
    let location = null

    if (props.location) {
        userLocationMarker = <MapView.Marker coordinate={props.location} />
        location = {
            latitude: props.location.latitude,
            longitude: props.location.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05
        }
    }

    return (
        <View style={styles.mapContainer}>
            <MapView 
                region={location}
                style={styles.map}
            >
                {userLocationMarker}
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    mapContainer: {
        width: '100%',
        height: 200,
        marginTop: 20
    },
    map: {
        width: '100%',
        height: '100%'
    }
})