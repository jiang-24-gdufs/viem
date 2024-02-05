import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'
import { createObjectCsvWriter } from 'csv-writer';

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

let csvWriter = createObjectCsvWriter({
  path: '../out.csv',
  header: [
    {id: 'index', title: 'INDEX'},
    {id: 'privateKey', title: 'PRIVATE KEY'},
    {id: 'publicKey', title: 'PUBLIC KEY'},
  ],
});

csvWriter.writeRecords(data) 
  .then(() => {
    console.log('...Done');
  });
