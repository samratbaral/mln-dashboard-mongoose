
##  [< Back](/README.md) to README File
# Getting Started
## Requirements

- **Install node.js and npm**. This server was developed and tested using the node.js v18.12.0 and npm 8.19.2 writing. Follow the directions at [this link](https://nodejs.org/en/download/) to install node.js and [this link](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/) to install npm.

- **Install Python3 and Flask**. This server was developed and tested using the  Python 3.11.0 , Flask 2.2.2, and Werkzeug 2.2.2 writing. Follow the directions at [this link](https://www.python.org/downloads/) to install Python, [this link](https://flask.palletsprojects.com/en/2.0.x/installation/) to install Flask and [this link](https://pypi.org/project/Werkzeug/) to install Werkzeug.

## Installation

1. Clone this repository and install the dependencies:

   ```bash
   git clone https://github.com/samratbaral/mln-dashboard-mongodb
   cd  mln-dashboard
   npm install
   node app.js
   ```

2. **(Disclamier: Approval Need before you go to next step)** Initialize the database by providing your network IP address to `samratbaral.sb [at] gmail [dot] com`. You can inspect the database by running.

   ```bash
   Connected to MongoDB - Default http://localhost:3000/homepage
   ```

3. On new terminal, you should now be able to run the application by running `python3 app.py`.
   ```bash
   Running on http://127.0.0.1:5000
   ```
4. Click on the URL shown in the terminal to get started!
   ```bash
   http://localhost:3000/homepage
   ```

## Getting Help

- Before you start programming or seriously reading the code, I recommend setting aside an hour to read [this guide on express.js](http://expressjs.com/), and [this guide on advanced express.js features](http://expressjs.com/en/advanced/developing-template-engines.html).

- Make sure you can get the server running before you make any changes to the code.

- If you are using VS Code, you can enjoy break-point debugging within your IDE by debugging.

- Also, if you are using vscode, you will notice the following packages are recommended in your developer dependencies:

  ```bash
  "devDependencies": {
  "nodemon": "^2.0.20",
  "prettier": "2.7.1"
  }
  ```

  then,

  ```bash
  npm start

  > gui-mln-dashboard@1.0.0 start
  > nodemon app.js

  [nodemon] 2.0.20
  [nodemon] to restart at any time, enter `rs`
  [nodemon] watching path(s): *.*
  [nodemon] watching extensions: js,mjs,json
  [nodemon] starting `node app.js`
  Connected to MongoDB - Default http://localhost:3000/homepage
  ```

- [Sign up](https://github.com/features/copilot/signup) for [Github CoPilot](https://copilot.github.com/) if you haven't already. My experience is that copilot makes it easy to jump into new languages and frameworks.

- If you are stuck, please contact me at `samratbaral.sb [at] gmail [dot] com`.