import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const App = () => {
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [dateInput, setDateInput] = useState('');
  const [timeInput, setTimeInput] = useState('');
  const [name, setName] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [airlineCode, setAirlineCode] = useState('');
  const [flightNumber, setFlightNumber] = useState('');

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === 'ios');
    setDate(currentDate);
    const formattedDate = (currentDate.getMonth() + 1) + '/' + currentDate.getDate() + '/' + currentDate.getFullYear();
    setDateInput(formattedDate);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || date;
    setShowTime(Platform.OS === 'ios');
    setDate(currentTime);
    const formattedTime = currentTime.getHours().toString().padStart(2, '0') + ':' + currentTime.getMinutes().toString().padStart(2, '0');
    setTimeInput(formattedTime);
  };

  const handleSubmit = () => {
    Alert.alert('Final Date and Time', `${dateInput} ${timeInput}`);
  };

  const isFormComplete = () => {
    return (
      name !== '' &&
      from !== '' &&
      to !== '' &&
      airlineCode !== '' &&
      flightNumber !== '' &&
      dateInput !== '' &&
      timeInput !== ''
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manual Departure Input</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter Name"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>From:</Text>
        <TextInput
          style={styles.input}
          value={from}
          onChangeText={setFrom}
          placeholder="Enter Departure Location"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>To:</Text>
        <TextInput
          style={styles.input}
          value={to}
          onChangeText={setTo}
          placeholder="Enter Arrival Location"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Airline Code:</Text>
        <TextInput
          style={styles.input}
          value={airlineCode}
          onChangeText={setAirlineCode}
          placeholder="Enter Airline Code"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Flight Number:</Text>
        <TextInput
          style={styles.input}
          value={flightNumber}
          onChangeText={setFlightNumber}
          placeholder="Enter Flight Number"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Departure Date (MM/DD/YYYY)</Text>
        <TextInput
          style={styles.input}
          placeholder="Select Date"
          value={dateInput}
          onFocus={() => setShowDate(true)}
          showSoftInputOnFocus={false}
        />
        {showDate && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Departure Time (Military Time)</Text>
        <TextInput
          style={styles.input}
          placeholder="Select Time"
          value={timeInput}
          onFocus={() => setShowTime(true)}
          showSoftInputOnFocus={false}
        />
        {showTime && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onTimeChange}
          />
        )}
      </View>
      
      <TouchableOpacity
        style={[styles.button, { backgroundColor: isFormComplete() ? '#FFF' : '#383838' }]}
        onPress={handleSubmit}
        disabled={!isFormComplete()}
      >
        <Text style={[styles.buttonText, { color: isFormComplete() ? '#000' : '#606060' }]}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FFF',
  },
  button: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
  buttonText: {
    fontSize: 16,
  },
});

export default App;
