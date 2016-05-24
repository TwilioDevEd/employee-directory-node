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

1. Validate your code.

   ```bash
   $ npm run jshint
   ```

1. Start the server.

   ```bash
   $ npm start
   ```

1. Check it out at [http://localhost:3000](http://localhost:3000).

### Expose the Application to the Wider Internet
1. Expose your application to the wider internet using [ngrok](http://ngrok.com). You can click
  [here](#expose-the-application-to-the-wider-internet) for more details. This step
  is important because the application won't work as expected if you run it through
  localhost.

  ```bash
  $ ngrok http 3000
  ```

  Once ngrok is running, open up your browser and go to your ngrok URL. It will
  look something like this: `http://9a159ccf.ngrok.io`

1. Configure Twilio to call your webhooks

  You will also need to configure Twilio to call your application when calls are received
  on your _Twilio Number_. The **SMS & MMS Request URL** should look something like this:

  ```
  http://<sub-domain>.ngrok.io/directory/search
  ```

### How To Demo
1. Text your twilio number the name "Thor"
1. Should get the following response:

   ```
   We found multiple people, reply with:
   1 for Thor
   2 for Frog Thor
   3 for Thor Girl
   Or start over
   ```
1. Reply with 1
1. Should get the following response:

   ```
   Iron Man
   +14155559999
   thor@asgard.example.com
   [the image goes here]

  ![Configure SMS](http://howtodocs.s3.amazonaws.com/twilio-number-config-all-med.gif)

## Meta

* No warranty expressed or implied. Software is as is. Diggity.
* [MIT License](http://www.opensource.org/licenses/mit-license.html)
* Lovingly crafted by Twilio Developer Education.
