import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Animated, Easing, Image } from 'react-native';
import { validatePhoneNumber } from './validationUtils';

// ValidateNumber bileşeni, telefon numarası girişini doğrulayan ve hata durumlarında animasyon ekleyen bir React Native bileşenidir.
// Props:
// - value: Telefon numarasının değerini kontrol etmek için dışarıdan alınan fonksiyon.
// - language: Telefon numarasının doğruluğunu kontrol etmek için kullanılan dil.
// - errorColor: Hata durumunda kullanılacak renk (Varsayılan: 'red').
// - secureTextEntry: Güvenli metin girişini etkinleştirmek için kullanılır (Varsayılan: false).

const ValidateNumber = ({value, language, errorColor, secureTextEntry }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [validationResult, setValidationResult] = useState({ isValid: true, errors: [] });
  // Telefon numarası değiştiğinde çalışan fonksiyon.
  const handlePhoneNumberChange = (text) => {
    setPhoneNumber(text);
    const result = validatePhoneNumber(text, language);
    setValidationResult(result);
    value(text) // Dışarıdan gelen fonksiyonu çağırarak değeri kontrol et.
  };
  // Sarsılma animasyonu için Animated değeri.
  const shakeAnimationValue = new Animated.Value(0);

  useEffect(() => {
     // Hata durumunda sarsılma animasyonunu tetikleyen useEffect.
    if (!validationResult.isValid) {
      startShakeAnimation();
    }
  }, [validationResult.isValid]);


  // // Remove non-numeric characters
  // useEffect(() => {
  //   const numericPhoneNumber = phoneNumber.replace(/\D/g, '');
  //   setPhoneNumber(numericPhoneNumber)
  // }, [phoneNumber])
  

// Sarsılma animasyonunu başlatan fonksiyon.
const startShakeAnimation = () => {
  // ShakeAnimation değerini sıfırla.
  shakeAnimationValue.setValue(0);

  // Sırasıyla çalışacak animasyonlar.
  Animated.sequence([
    // Birinci adımda pozitif yönde sarsılma.
    Animated.timing(shakeAnimationValue, { toValue: 10, duration: 100, easing: Easing.linear, useNativeDriver: true }),

    // İkinci adımda negatif yönde sarsılma.
    Animated.timing(shakeAnimationValue, { toValue: -10, duration: 100, easing: Easing.linear, useNativeDriver: true }),

    // Üçüncü adımda pozitif yönde sarsılma.
    Animated.timing(shakeAnimationValue, { toValue: 10, duration: 100, easing: Easing.linear, useNativeDriver: true }),

    // Son adımda sıfıra dönme.
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