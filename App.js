import React, { useState } from 'react';
import { View, Button, TextInput, Text, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const App = () => {
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [dateInput, setDateInput] = useState('');
  const [timeInput, setTimeInput] = useState('');
  const [finalDateTime, setFinalDateTime] = useState(''); 

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = (tempDate.getMonth() + 1) + '/' + tempDate.getDate() + '/' + tempDate.getFullYear();
    setDateInput(fDate);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || date;
    setShowTime(Platform.OS === 'ios');
    setDate(currentTime);

    let tempTime = new Date(currentTime);
    let fTime = tempTime.getHours().toString().padStart(2, '0') + ':' + tempTime.getMinutes().toString().padStart(2, '0');
    setTimeInput(fTime);
  };

  const handleSubmit = () => {
    setFinalDateTime(`${dateInput} ${timeInput}`);
    alert(`Final Date and Time: ${dateInput} ${timeInput}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Departure Date (MM/DD/YYYY)</Text>
        <TextInput
          style={styles.input}
          placeholder="Select Date"
          value={dateInput}
          onFocus={() => {
            setShowDate(true);
          }}
          showSoftInputOnFocus={false} 
        />
        {showDate && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
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
          onFocus={() => {
            setShowTime(true);
          }}
          showSoftInputOnFocus={false} 
        />
        {showTime && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'time'}
            is24Hour={true}
            display="default"
            onChange={onTimeChange}
          />
        )}
      </View>

      <Button title="Submit" onPress={handleSubmit} />
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
});

export default App;
