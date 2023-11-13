import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useState } from 'react'
import Database from '../Database'

const EntryScreen = ({ navigation }) => {
  const [search, setSearch] = useState('')
  const [hikes, setHikes] = useState([])

  const handleSearch = async () => {
    if (!search) return Alert.alert('Please enter search')
    const data = await Database.searchHikes(search)
    setHikes(data)
  }
  const renderHikeItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.todoItem}
        onPress={() => navigation.navigate('Detail', { hike: item })}
      >
        <Text style={styles.textResult}>{item.name}</Text>
      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={search}
        onChangeText={setSearch}
        placeholder='Enter Search by hike name'
      />
      <TouchableOpacity style={styles.addButton} onPress={handleSearch}>
        <Text style={styles.addButtonText}>Search Hike</Text>
      </TouchableOpacity>
      {hikes.length > 0 ? (
        <FlatList
          data={hikes}
          renderItem={renderHikeItem}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={styles.label}>No result</Text>
      )}
    </View>
  )
}

export default EntryScreen

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  textResult: {
    fontSize: 20,
    marginBottom: 10,
    color: 'black',
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
  label: {
    fontSize: 20,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 20,
  },
  todoItem: {
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginTop: 10,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
})
