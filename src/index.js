import { renderToString } from 'react-dom/server';
import Home from './client/components/Home';
import express from 'express';
import React from 'react';

const app = express();

app.use(express.static('public'));

app.get('/', (request, response) => {
  const content = renderToString(<Home />);

  const html = `
    <html>
      <head></head>
      <body>
        <div id="root">${content}</div>
        <script src="bundle.js"></script>
      </body>
    </html>
  `;

  response.send(content);
});

app.listen(3000, () => {
  console.log('listening on port 3000');
})