import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import { Animated, PanResponder, StyleSheet, View, Image } from "react-native";

export default function App() {
  const scale = useRef(new Animated.Value(1)).current;
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      pan.setOffset({
        x: pan.x._value,
        y: pan.y._value,
      });
      pan.setValue({ x: 0, y: 0 });
    },
    onPanResponderMove: (evt, gestureState) => {
      const touches = evt.nativeEvent.touches;
      if (touches.length >= 2) {
        Animated.spring(scale, {
          toValue: 3,
          friction: 3,
          useNativeDriver: false,
        }).start();
      }
      pan.setValue({x: gestureState.dx, y: gestureState.dy})
    },
    onPanResponderRelease: () => {
      pan.flattenOffset();
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: false,
      }).start();
    },
  });


  return (
    <View style={styles.container}>
      <Animated.Image {...panResponder.panHandlers} source={require('./assets/logo.png')} style={[styles.box, pan.getLayout(), { transform: [{ scale: scale }] }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: 100,
    height: 80,
    borderRadius: 4,
  },
});
