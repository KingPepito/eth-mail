const fs = require('fs')

const copyABI = () => new Promise((res, rej) => {
  const contract = JSON.parse(fs.readFileSync('./receipt-storage/build/contracts/EmailReceipt_Contract.json', 'utf8'));
  const JsonAbi = JSON.stringify(contract.abi)
  console.log(JsonAbi)
  var proc = require('child_process').spawn('pbcopy');
  proc.stdin.write(JsonAbi);
  proc.stdin.end();
  res()
})

copyABI()

// export const getAbiForContract = async nameContract => {
//   const file = await get(`./build/contracts/${nameContract}.json`)
//   console.log(file)
//   const contract = JSON.parse(file);
//   console.log(contract)
//   const JsonAbi = JSON.stringify(contract.abi)
//
//   return JsonAbi
// }
