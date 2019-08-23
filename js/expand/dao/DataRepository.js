import { AsyncStorage } from 'react-native'

export default class DataRepository {
  saveRepository(url, items) {
    if (!url || !items) return
    let wrapData = { items: items, update_date: new Date().getTime() }
    AsyncStorage.setItem(url, JSON.stringify(wrapData))
  }

  fetchRepository(url) {
    return new Promise((resolve, reject) => {
      // 获取本地数据
      this.fetchLocalRepository(url)
        .then(result => {
          if (result) {
            resolve(result)
          } else {
            this.fetchNetrepository(url)
              .then(result => {
                resolve(result)
              })
              .catch(e => {
                reject(e)
              })
          }
        })
        .catch(error => {
          this.fetchNetrepository(url)
            .then(result => {
              resolve(result)
            })
            .catch(e => {
              reject(e)
            })
        })
    })
  }

  fetchLocalRepository(url) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(url, (error, result) => {
        if (!error) {
          try {
            resolve(JSON.parse(result))
          } catch (e) {
            reject(e)
          }
        } else {
          reject(error)
        }
      })
    })
  }

  fetchNetrepository(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => response.json())
        .then(result => {
          if (!result) {
            reject(new Error('responseData is null'))
          }
          resolve(result.items)
          this.saveRepository(url, result.items)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
