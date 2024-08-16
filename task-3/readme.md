# Node.js Joke API

A simple Node.js API that fetches a random joke from the Official Joke API and returns it in JSON format.

## Setup

1. Clone the repository: `git clone https://github.com/username_1/nodejs-joke-api.git`
2. Install dependencies: `npm install`
3. Start the server: `node app.js`

## Run

1. Open a web browser and navigate to `http://localhost:8080/api/data`
2. You should see a random joke in JSON format




### GET /api/data

* Returns a random joke in JSON format
* Example response:
```json
{
  "id": 123,
  "type": "general",
  "setup": "Why don't scientists trust atoms?",
  "punchline": "Because they make up everything."
}