import { generatePrivateKey } from 'viem/accounts'
import fs from 'fs';
import { createObjectCsvWriter } from 'csv-writer';
import { privateKeyToAccount } from 'viem/accounts'

// 假设这是你的数据
let data = Array(10).fill('_').map((_, index) => {
  const privateKey = generatePrivateKey()
  const publicKey = privateKeyToAccount(privateKey).address
  return {  
    index: index,
    privateKey: privateKey,
    publicKey: publicKey
  }
})
// const privateKey = generatePrivateKey()

let csvWriter = createObjectCsvWriter({
  path: '../out.csv',
  header: [
    {id: 'index', title: 'INDEX'},
    {id: 'privateKey', title: 'PRIVATE KEY'},
    {id: 'publicKey', title: 'PUBLIC KEY'},
  ],
});

csvWriter.writeRecords(data)       // 返回一个 promise
  .then(() => {
    console.log('...Done');
  });
