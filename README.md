# Employee Directory with Node.js/Express

[![Build Status](https://travis-ci.org/TwilioDevEd/employee-directory-node.svg?branch=master)](https://travis-ci.org/TwilioDevEd/employee-directory-node)

Use Twilio to accept SMS messages and turn them into queries against a database. This example functions as an Employee Directory where a mobile phone user can send a text message with a partial string of a person's name and it will return their picture and contact information (e-mail address and phone number).

## Local Development

This project is build using [Node.js](https://nodejs.org) and depends on [MongoDB](https://www.mongodb.com).

1. First clone this repository and `cd` into it.

   ```bash
   $ git clone git@github.com:TwilioDevEd/employee-directory-node.git
   $ cd employee-directory-node
   ```

1. Make sure the tests succeed.

   ```bash
   $ npm test
   ```

1. Start the server.

   ```bash
   $ npm start
   ```

1. Check it out at [http://localhost:3000](http://localhost:3000).

## Meta

* No warranty expressed or implied. Software is as is. Diggity.
* [MIT License](http://www.opensource.org/licenses/mit-license.html)
* Lovingly crafted by Twilio Developer Education.
