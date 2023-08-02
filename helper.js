const fs = require('fs')
const readline = require('readline');


async function getArray(i, filename) {
    const fileStream = fs.createReadStream(filename);
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    })
    
    let count = 0;
    let ar = []
    for await (const line of rl) {
      ++count
      if (i - count < 10) ar.push(line)
    }
  
    return ar
  }
  
  async function getCount(filename) {
    const fileStream = fs.createReadStream(filename);
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    })
    
    let i = 0
    for await (const line of rl) {
      ++i
    }
    return i
  }

  module.exports = {getArray, getCount}