# EVM 脚本

1. 批量创建私钥
  ```js
  import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'
  import { createObjectCsvWriter } from 'csv-writer';`
  ```
2. 把批量创建的私钥写入数据库
  ```js
  import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'
  import Datastore from 'nedb';
  ```
3. 加密私钥后再写入数据库
  ```js
  // 定义一个密钥和一个初始化向量
  const key = hexToBytes("2b7e151628aed2a6abf7158809cf4f3c");
  const iv = hexToBytes("f0f1f2f3f4f5f6f7f8f9fafbfcfdfeff");

  const encryptedPrivateKey = await encrypt(privateKeyBytes, key, iv);

  // 解密私钥
  const decryptedPrivateKeyBytes = await decrypt(encryptedPrivateKey, key, iv);
  ```
4. 