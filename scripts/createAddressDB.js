import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'
import Datastore from 'nedb';

// 创建数据库
let db = new Datastore({ filename: './mydb.nedb', autoload: true });

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

data.forEach((wallet, i) => {
  db.insert(wallet, function (err, newDoc) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Document inserted with _id: ${newDoc._id}`);
  });
})

