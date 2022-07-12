const fs = require('fs');

const copyABI = (data) => new Promise((res, rej) => {
  const contract = JSON.parse(fs.readFileSync('./build/contracts/Pet_Contract.json', 'utf8'));
  const JsonAbi = JSON.stringify(contract.abi)
  console.log(JsonAbi)
  var proc = require('child_process').spawn('pbcopy');
  proc.stdin.write(data);
  proc.stdin.end();
  res()
})


copyABI()
  .then(() => {
    console.log('ABI copied')
  })
  .catch(() => {
    console.log('failed to copy ABI')
  })
