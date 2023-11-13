import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Database from '../Database'
import { useIsFocused } from '@react-navigation/native'

const HomeScreen = ({ navigation }) => {
  const [hikes, setHikes] = useState([])
  const isFocused = useIsFocused()
  useEffect(() => {
    const fetchFunc = async () => {
      try {
        const data = await Database.getHikes()
        setHikes(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchFunc()
  }, [isFocused])
  const handleClearAll = async () => {
    Alert.alert('Delete All Hikes', 'Are you sure?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          await Database.deleteAllHikes()
          const data = await Database.getHikes()
          setHikes(data)
        },
      },
    ])
  }

  const handleDeleteTodo = async (id) => {
    Alert.alert('Delete Hike', 'Are you sure?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          await Database.deleteHike(id)
          const data = await Database.getHikes()
          setHikes(data)
        },
      },
    ])
  }

  const renderHikeItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.todoItem}
        onPress={() => navigation.navigate('Detail', { hike: item })}
      >
        <Text>{item.name}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteTodo(item.id)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={hikes}
        renderItem={renderHikeItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity style={styles.clearButton} onPress={handleClearAll}>
        <Text style={styles.addButtonText}>Clear All</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  clearButton: {
    backgroundColor: 'purple',
    padding: 16,
    borderRadius: 30,
    position: 'absolute',
    bottom: 16,
    right: 16,
    zIndex: 2,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: 'white',
  },
  addButton: {
    backgroundColor: 'green',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})
