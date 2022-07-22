// scroll bar
import "simplebar/src/simplebar.css";

import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

//
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import reportWebVitals from "./reportWebVitals";
import { Web3ContextProvider } from "./context/Web3Context";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { makeStore } from "./redux/store";
import { Provider } from "react-redux";
import { Web3StorageContextProvider } from "./context/Web3Storage";
import { NoteContextProvider } from "./context/CreateNoteContext";
// ----------------------------------------------------------------------

ReactDOM.render(
  <HelmetProvider>
    <Provider store={makeStore()}>
      <BrowserRouter>
      <NoteContextProvider>
        <Web3ContextProvider>
          <Web3StorageContextProvider>
            <App />
          </Web3StorageContextProvider>
        </Web3ContextProvider>
        </NoteContextProvider>
      </BrowserRouter>
    </Provider>
  </HelmetProvider>,
  document.getElementById("root")
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
