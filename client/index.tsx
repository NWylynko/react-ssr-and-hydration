import React from "react";
import { App } from "./app";

import { hydrateRoot } from "react-dom/client";

// @ts-ignore
// here we grab the <html> element to mount too
const container = document.documentElement;

const root = hydrateRoot(container, <App />);
