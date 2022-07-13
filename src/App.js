import './App.css';
import Helmet from 'react-helmet'

import FormFactory from "./FormFactory";

function App() {
  return (
  <html lang="en">
  <Helmet>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email acknowledgement receipt</title>
    <script
      src="https://cdn.ethers.io/lib/ethers-5.2.umd.min.js"
      type="application/javascript"
    />

    <script src="../receipt-storage/index.js" type="application/javascript" />
  </Helmet>
  <body>
  <FormFactory />
  </body>
  </html>

);
}

export default App;
