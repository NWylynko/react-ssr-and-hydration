import React from "react";
import { App } from "./app";

import { hydrateRoot } from "react-dom/client";

// @ts-ignore
// here we grab the root <div> element to mount too
const container = document.getElementById("root");

const root = hydrateRoot(container, <App />);
