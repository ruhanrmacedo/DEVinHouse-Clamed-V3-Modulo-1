import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { RouteProp, useRoute } from '@react-navigation/native';

type RootStackParamList = {
  MapaEntrega: {
    origem: { latitude: number; longitude: number; nome: string };
    destino: { latitude: number; longitude: number; nome: string };
  };
};

export default function MapaEntregaPage() {
  const route = useRoute<RouteProp<RootStackParamList, 'MapaEntrega'>>();
  const { origem, destino } = route.params;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: origem.latitude,
          longitude: origem.longitude,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
      >
        <Marker
          coordinate={{ latitude: origem.latitude, longitude: origem.longitude }}
          title={origem.nome}
          description="Ponto de Origem"
        />
        <Marker
          coordinate={{ latitude: destino.latitude, longitude: destino.longitude }}
          title={destino.nome}
          description="Ponto de Destino"
        />
        <Polyline
          coordinates={[
            { latitude: origem.latitude, longitude: origem.longitude },
            { latitude: destino.latitude, longitude: destino.longitude },
          ]}
          strokeColor="#1E90FF"
          strokeWidth={4}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
