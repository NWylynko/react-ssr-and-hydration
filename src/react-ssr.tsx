import React from "react";
import { App } from "../client/app";

import { renderToPipeableStream } from "react-dom/server";
import type { RenderToPipeableStreamOptions } from "react-dom/server";
import type { RouteHandlerMethod } from "fastify/types/route";
import { ServerStyleSheet } from "styled-components";

export const SSRHandler: RouteHandlerMethod = (req, res) => {
  let didError = false;

  const options: RenderToPipeableStreamOptions = {
    onShellReady() {
      // The content above all Suspense boundaries is ready.
      // If something errored before we started streaming, we set the error code appropriately.
      res.statusCode = didError ? 500 : 200;
      res.header("Content-type", "text/html");

      // this gets out html code with the style tags
      const styleTags = sheet.getStyleTags(); // or sheet.getStyleElement();

      // write the initial head
      res.raw.write(`
<html>
  <head>
    <script src="./static/main.js" type="module"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Dongle:wght@700&display=swap" rel="stylesheet">
    ${styleTags}
  </head>
  <body>
    <div id="root">
      `);

      // write in our react
      stream.pipe(res.raw);

      // write out the rest of the html
      res.raw.write(`
    </div>
  </body>
</html>
      `);

      // this prevents leaks with styled components
      sheet.seal();
    },
    onShellError(err) {
      // Something errored before we could complete the shell so we emit an alternative shell.
      didError = true;
      console.error(err);
      res.statusCode = 500;
      res.send("<!doctype html><span>An Error occurring while rendering :(</span>");
    },
    onError(err) {
      didError = true;
      console.error(err);
    },
  };

  const sheet = new ServerStyleSheet();

  // here is where we kick off the render from the top component, <App />
  // for a more complete solution we would want to pass props along like url and cookies
  // we could have a context that would hold that stuff
  // then the dev can use some custom hooks to obtain that data to conditionally render stuff
  const stream = renderToPipeableStream(sheet.collectStyles(<App />), options);
};
