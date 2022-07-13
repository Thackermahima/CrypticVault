## Superfluid
#####  https://github.com/mansijoshi17/DAOManagmentTool/blob/master/src/superfluid/index.js
#####  https://github.com/mansijoshi17/DAOManagmentTool/blob/master/src/pages/Payroll.js    
```
import SuperfluidSDK from "@superfluid-finance/js-sdk";
import { Web3Provider } from "@ethersproject/providers";
import { USDCx_Address } from "../contracts/contract";

 

const init = async (s , r) => {
  const sf = new SuperfluidSDK.Framework({
    ethers: new Web3Provider(window.ethereum),
    tokens: ["fUSDC"],
  });
  await sf.initialize();

  const sender = sf.user({
    address: s,
    token: USDCx_Address,
  });

  let receiver ;
  if (r) {
    receiver = sf.user({
      address: r,
      token: USDCx_Address,
    });
  }

  return { sender, receiver };
};

export const createFlow = async (s, r, f) => {
  const { sender, receiver } = await init(s, r);
  const tx = await sender.flow({
    recipient: receiver.address,
    flowRate: f,
  });
  return tx;
};

export const deleteFlow = async (s, r) => {
  const { sender, receiver } = await init(s, r);
  const tx = await sender.flow({
    recipient: receiver.address,
    flowRate: "0",
  });
  return tx;
};

export const flowDetails = async (s) => {
  const { sender } = await init(s);
  return await sender.details();
};

export const loadOutflows = async (sender) => {
  const result = await flowDetails(sender);
  const outflows = result.cfa.flows.outFlows;
  return outflows;
};
```