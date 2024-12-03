import React from "react";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

export const muiCache = createCache({
  key: "mui",
  prepend: true,
});
const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <CacheProvider value={muiCache}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CacheProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
