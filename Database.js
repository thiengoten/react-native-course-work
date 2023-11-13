import * as SQLite from 'expo-sqlite'

const database_name = 'HikeApp.db'
const database_version = '1.0'
const database_displayname = 'Hike App Database'
const database_size = 200000

const db = SQLite.openDatabase(
  database_name,
  database_version,
  database_displayname,
  database_size
)

const initDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS hikes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        location TEXT,
        description TEXT,
        is_Parking INTEGER,
        difficulty TEXT,
        distance INTEGER,
        date TEXT
      );`,
      [],
      () => console.log('Database and table created successfully.'),
      (error) => console.log('Error occurred while creating the table.', error)
    )
  })
}

const getHikes = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM hikes',
        [],
        (tx, { rows }) => {
          if (rows.length === 0) {
            return resolve([])
          }
          resolve(rows._array)
        },
        (tx, error) => {
          reject(error)
        }
      )
    })
  })
}

const insertHike = (data) => {
  const {
    name,
    location,
    date,
    distance,
    description,
    is_Parking,
    difficulty,
  } = data
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO hikes (name, location, date, distance, description, is_Parking, difficulty) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, location, date, distance, description, is_Parking, difficulty],
        (tx, { insertId, rowsAffected }) => {
          if (rowsAffected > 0) {
            console.log('Hike inserted successfully.')
          }
          resolve(insertId)
        },
        (tx, error) => {
          reject(error)
        }
      )
    })
  })
}

const updateHike = (data) => {
  const {
    id,
    name,
    location,
    date,
    distance,
    description,
    is_Parking,
    difficulty,
  } = data
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE hikes SET name = ?, location = ?, date = ?, distance = ?, description = ?, is_Parking = ?, difficulty = ? WHERE id = ?',
        [
          name,
          location,
          date,
          distance,
          description,
          is_Parking,
          difficulty,
          id,
        ],
        (tx, { rowsAffected }) => {
          if (rowsAffected > 0) {
            console.log('Hike updated successfully.')
          }
          resolve(rowsAffected)
        },
        (tx, error) => {
          reject(error)
        }
      )
    })
  })
}

const deleteHike = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM hikes WHERE id = ?',
        [id],
        (tx, { rowsAffected }) => {
          if (rowsAffected > 0) {
            console.log('Hike deleted successfully.')
          }
          resolve(rowsAffected)
        },
        (tx, error) => {
          reject(error)
        }
      )
    })
  })
}

const deleteAllHikes = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM hikes',
        [],
        (tx, { rowsAffected }) => {
          if (rowsAffected > 0) {
            console.log('All hikes deleted successfully.')
          }
          resolve(rowsAffected)
        },
        (tx, error) => {
          reject(error)
        }
      )
    })
  })
}

const searchHikes = (searchText) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM hikes WHERE name LIKE ?',
        [`%${searchText}%`],
        (tx, { rows }) => {
          resolve(rows._array)
        },
        (tx, error) => {
          reject(error)
        }
      )
    })
  })
}

const dropTable = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DROP TABLE hikes',
        [],
        (tx, { rowsAffected }) => {
          resolve(rowsAffected)
        },
        (tx, error) => {
          reject(error)
        }
      )
    })
  })
}

const Database = {
  initDatabase,
  getHikes,
  insertHike,
  updateHike,
  deleteHike,
  dropTable,
  deleteAllHikes,
  searchHikes,
}

export default Database
