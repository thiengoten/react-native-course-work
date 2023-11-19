import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import RadioGroup from 'react-native-radio-buttons-group'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import Database from '../Database'

const DetailScreen = ({ route }) => {
  const { hike } = route.params

  const [name, setName] = useState(hike.name)
  const [location, setLocation] = useState(hike.location)
  const [date, setDate] = useState(new Date(hike.date))
  const [distance, setDistance] = useState(hike.distance)
  const [description, setDescription] = useState(hike.description)
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(hike.difficulty)
  const [selectedId, setSelectedId] = useState(hike?.is_Parking?.toString())
  const [items, setItems] = useState([
    { label: 'HIGH', value: 'high' },
    { label: 'MEDIUM', value: 'medium' },
    { label: 'LOW', value: 'low' },
  ])

  const radioButtons = useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Yes',
        value: 'yes',
      },
      {
        id: '0',
        label: 'No',
        value: 'no',
      },
    ],
    []
  )

  useEffect(() => {
    setName(hike.name)
    setLocation(hike.location)
    setDate(new Date(hike.date))
    setDistance(hike.distance)
    setDescription(hike.description)
    setValue(hike.difficulty)
    setSelectedId(hike?.is_Parking?.toString())
  }, [hike])

  const handleUpdateTodo = async () => {
    const hikeUpdate = {
      name,
      location,
      date: date.toISOString(),
      distance,
      description,
      is_Parking: selectedId,
      difficulty: value,
      id: hike.id,
    }
    await Database.updateHike(hikeUpdate)
    Alert.alert('Success', 'Hike updated successfully.')
  }
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate
    setDate(currentDate)
  }

  const showDatepicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: 'date',
      is24Hour: true,
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder='Enter Name'
      />
      <Text style={styles.label}>Location:</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder='Enter location'
      />
      <Text style={styles.label}>Date:</Text>
      <SafeAreaView>
        <Button
          onPress={showDatepicker}
          title={date ? date.toLocaleDateString() : 'Select Date'}
        />
      </SafeAreaView>
      <Text style={styles.label}>Distance:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Distance'
          inputMode='numeric'
          value={distance.toString()}
          onChangeText={setDistance}
        />
        <Text style={styles.prefix}>km</Text>
      </View>
      <View style={styles.isParking}>
        <Text style={styles.label}>Difficulty:</Text>
        <DropDownPicker
          containerStyle={{
            width: '60%',
          }}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </View>
      <View style={styles.isParking}>
        <Text style={styles.label}>Is there parking?</Text>
        <RadioGroup
          radioButtons={radioButtons}
          onPress={setSelectedId}
          selectedId={selectedId}
          layout='row'
        />
      </View>
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder='Enter Description'
      />
      <TouchableOpacity style={styles.addButton} onPress={handleUpdateTodo}>
        <Text style={styles.addButtonText}>Update Hike</Text>
      </TouchableOpacity>
    </View>
  )
}

export default DetailScreen

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 20,
    marginBottom: 10,
    color: '',
  },
  input: {
    fontSize: 20,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
  },
  addButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 20,
  },
  inputContainer: {
    fontSize: 20,
    borderWidth: 1,
    flexDirection: 'row',
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
  },
  prefix: {
    paddingHorizontal: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  isParking: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 40,
  },
})
