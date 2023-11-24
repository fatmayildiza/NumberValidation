import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Animated, Easing, Image } from 'react-native';
import { validatePhoneNumber } from './validationUtils';

const ValidateNumber = ({value, language, errorColor, secureTextEntry }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [validationResult, setValidationResult] = useState({ isValid: true, errors: [] });

  const handlePhoneNumberChange = (text) => {
    setPhoneNumber(text);
    const result = validatePhoneNumber(text, language);
    setValidationResult(result);
    value(text)
  };

  // Animated value for the shaking animation
  const shakeAnimationValue = new Animated.Value(0);

  useEffect(() => {
    // Trigger the shaking animation when validationResult.isValid becomes false
    if (!validationResult.isValid) {
      startShakeAnimation();
    }
  }, [validationResult.isValid]);


  // // Remove non-numeric characters
  // useEffect(() => {
  //   const numericPhoneNumber = phoneNumber.replace(/\D/g, '');
  //   setPhoneNumber(numericPhoneNumber)
  // }, [phoneNumber])
  

  const startShakeAnimation = () => {
    shakeAnimationValue.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnimationValue, { toValue: 10, duration: 100, easing: Easing.linear, useNativeDriver: true }),
      Animated.timing(shakeAnimationValue, { toValue: -10, duration: 100, easing: Easing.linear, useNativeDriver: true }),
      Animated.timing(shakeAnimationValue, { toValue: 10, duration: 100, easing: Easing.linear, useNativeDriver: true }),
      Animated.timing(shakeAnimationValue, { toValue: 0, duration: 100, easing: Easing.linear, useNativeDriver: true }),
    ]).start();
  };

  const interpolatedShakeAnimation = shakeAnimationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '1deg'],
  });

  const animatedStyle = {
    transform: [{ rotate: interpolatedShakeAnimation }],
  };


  return (
      <Animated.View style={[styles.inputContainer, validationResult.isValid ? null : animatedStyle]}>
        {validationResult.errors.length > 0 && (
          <View style={styles.errorContainer}>
            {validationResult.errors.map((error, index) => (
              <Text key={index} style={{color: errorColor ? errorColor : 'red'}}>
                {error}
              </Text>
            ))}
          </View>
        )}

        <View style={styles.imageWithTextInput}>
          <Image style={styles.icon} source={require('./assets/phoneIcon.png')} />
          <TextInput
            style={[
              {
                borderColor: !validationResult.isValid ?(errorColor ? errorColor : 'red') : 'gray',
                color: !validationResult.isValid ? 'red' : 'black',
                borderWidth: !validationResult.isValid ? 1 : 0.2,
              },
              styles.input,
            ]}
            secureTextEntry={secureTextEntry || false}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
          />
        </View>
      </Animated.View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginBottom: 10,
    justifyContent: 'center',
  },
  imageWithTextInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 40,
    marginTop: 5,
    borderRadius: 5,
    paddingHorizontal: 40,
    width: '100%',
    textAlign: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 5,
    opacity: 0.5,
    position: 'absolute',
  },
  errorContainer: {
    marginTop: 10,
  },
});

export default ValidateNumber;