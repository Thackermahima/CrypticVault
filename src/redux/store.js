import { configureStore } from "@reduxjs/toolkit";
import {
  createApiWithReactHooks,
  initializeSfApiSlice,
  initializeSubgraphSlice,
  setFrameworkForSdkRedux,
  allSubgraphSliceEndpoints,
} from "@superfluid-finance/sdk-redux";
import { Framework } from "@superfluid-finance/sdk-core";
import { networks } from "./networks";
import { ethers } from "ethers";

export const { sfApi } = initializeSfApiSlice(createApiWithReactHooks);

export const sfSubgraph = initializeSubgraphSlice(
  createApiWithReactHooks
).injectEndpoints(allSubgraphSliceEndpoints);

const infuraProviders = networks.map((network) => ({
  chainId: network.chainId,
  frameworkGetter: () =>
    Framework.create({
      chainId: network.chainId,
      provider: new ethers.providers.JsonRpcProvider(network.rpcUrl),
    }),
}));

export const makeStore = () => {
  infuraProviders.map((x) =>
    setFrameworkForSdkRedux(x.chainId, x.frameworkGetter)
  );

  const store = configureStore({
    reducer: {
      sfApi: sfApi.reducer,
      sfSubgraph: sfSubgraph.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(sfApi.middleware)
        .concat(sfSubgraph.middleware),
  });

  return store;
};
