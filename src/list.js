const { format: formatDate } = require('date-fns')

const fs = require('fs')
const path = require('path')

class List {
  constructor(dataFolderPath) {
    if (fs.existsSync(dataFolderPath)) {
      this.folder = dataFolderPath
    } else {
      throw new Error(`Data folder is absent, '${dataFolderPath}'`)
    }
  }

  get fileName() {
    const now = new Date()
    const dayMonthYear = 'dd-LL-yyyy'

    return path.resolve(
      this.folder,
      `list@${formatDate(now, dayMonthYear)}.txt`
    )
  }

  append(line) {
    fs.appendFileSync(this.fileName, `${line}\n`)
  }

  readFile(name) {
    let contents = false

    try {
      contents = fs.readFileSync(name)
    } catch (e) {}

    return contents
  }

  readLast() {
    return this.readFile(this.fileName)
  }
}

module.exports = List
