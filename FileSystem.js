const fs = require('fs')

module.exports = class FileSystem {
  static read(filePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        if (err) return reject(err)
        resolve(data)
      })
    })
  }

  static write(filePath, content) {
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, content.toString(), (err) => {
        if (err) return reject(err)
        resolve()
      })
    })
  }
}
