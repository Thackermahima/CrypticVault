https://github.com/mansijoshi17/CrypticVault/blob/master/src/context/Web3Context.js

```
await axios
        .get(
          `https://api.covalenthq.com/v1/1/address/accounts[0]/balances_v2/?key=${process.env.REACT_APP_COVELANT_KEY}`
        )
        .then((res) => setBalance(res.data));
```