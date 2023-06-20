import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { store } from "./redux/gameStore.ts";
import { Provider } from "react-redux";
import { DisplayProvider } from "./DisplayProvider.tsx";
import { AppProvider } from "./AppProvider.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <DisplayProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </DisplayProvider>
    </Provider>
  </React.StrictMode>
);
