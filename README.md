# Number Validation Component
## Overview
The **Number Validation Component** is a React Native input component designed for validating and formatting phone numbers. It provides real-time validation feedback and includes a shaking animation for invalid input. This component is customizable, allowing you to specify the error color, language, and whether the input should be masked for secure entry.

## Installation
Install the **Number Validation Component** using npm:

```bash
npm react-native-valid-number-checker-animated
```

## Usage
Import the component into your React Native project:
```javascript
import ValidateNumber from 'react-native-valid-number-checker-animated';
```

## Props
- **value (string, required):** Controlled input value.
- **language (string, optional):** Language code for phone number validation (default is 'EN', option is 'TR').
- **errorColor (string, optional):** Color for error messages (default is 'red').
- **secureTextEntry (boolean, optional):** Enable secure text entry (default is false).


## Example

```javascript
import React, { useState } from 'react';
import { View } from 'react-native';
import {ValidateNumber} from 'react-native-valid-number-checker-animated';

const MyForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <View>
      <ValidateNumber
        value={(text)=>console.log(text)}
        language="en"
        errorColor="red"
        secureTextEntry={false}
      />
    </View>
  );
};
```

## Styling

The component can be styled using the following styles:

- **container:** The main container.
- **inputContainer:** The container for the input and icon.
- **imageWithTextInput:** Styles for the row containing the image and text input.
- **input:** Styles for the text input.
- **icon:** Styles for the icon.

## Animation
The component includes a shaking animation when an invalid phone number is detected. This animation is triggered automatically when the input is invalid.

## Validation
The validation is performed in real-time as the user types, providing immediate feedback on the validity of the phone number. The error messages, if any, are displayed below the input.