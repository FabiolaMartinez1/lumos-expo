import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Dimensions } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';

export default function TabTwoScreen() {
  const [color, setColor] = useState('#ffffff'); // Initial color state

  const resetColor = () => {
    setColor('#ffffff');
  };

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <View style={styles.colorPickerContainer}>
        <ColorPicker
          color={color}
          onColorChangeComplete={setColor}
          thumbSize={40}
          sliderSize={40}
          gapSize={16}
          row={false}
          swatches={false}
          discrete={false}
        />
      </View>
      <Pressable style={styles.button} onPress={resetColor}>
        <Text style={styles.buttonText}>Reset to White</Text>
      </Pressable>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  colorPickerContainer: {
    width: width * 0.8, // 80% of screen width
    height: width * 0.8, // Maintain aspect ratio
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#31C6E8',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.6, // 60% of screen width
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
