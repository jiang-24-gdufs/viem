import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'
import Datastore from 'nedb';
import { encrypt, decrypt } from 'ethereum-cryptography/aes.js'
import { hexToBytes, bytesToHex, utf8ToBytes } from "ethereum-cryptography/utils.js";

// 创建数据库
let db = new Datastore({ filename: './mydb_en.nedb', autoload: true });

// 假设这是你的数据
let data = await Array(1).fill('_').map(async (_, index) => {
  const privateKey = generatePrivateKey()
  const publicKey = privateKeyToAccount(privateKey).address

  // 定义一个密钥和一个初始化向量
  const key = hexToBytes("2b7e151628aed2a6abf7158809cf4f3c");
  const iv = hexToBytes("f0f1f2f3f4f5f6f7f8f9fafbfcfdfeff");

  // 将私钥转换为字节数组加密私钥
  const privateKeyBytes = hexToBytes(privateKey);
  const encryptedPrivateKey = await encrypt(privateKeyBytes, key, iv);

  // 解密私钥
  const decryptedPrivateKeyBytes = await decrypt(encryptedPrivateKey, key, iv);

  // 将解密后的字节数组转换回十六进制字符串
  const decryptedPrivateKey = bytesToHex(decryptedPrivateKeyBytes);
  return {
    index: index,
    privateKey: privateKey,
    publicKey: publicKey,
    encryptedPrivateKey, decryptedPrivateKey
  }
})

data.forEach((wallet, i) => {
  wallet.then(wallet => {
    db.insert(wallet, function (err, newDoc) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Document inserted with _id: ${newDoc._id}`);
    })
  });
})

