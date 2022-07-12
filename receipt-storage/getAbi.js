const fs = require('fs');

const copyABI = () => new Promise((res, rej) => {
  const contract = JSON.parse(fs.readFileSync('./build/contracts/EmailReceipt_Contract.json', 'utf8'));
  const JsonAbi = JSON.stringify(contract.abi)
  console.log(JsonAbi)
  var proc = require('child_process').spawn('pbcopy');
  proc.stdin.write(JsonAbi);
  proc.stdin.end();
  res()
})


copyABI()
  .then(() => {
    console.log('ABI copied')
    process.exit(0)
  })
  .catch((e) => {
    console.log('failed to copy ABI:', e)
    process.exit(0)
  })