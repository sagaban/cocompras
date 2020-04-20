const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');

class MessageService {
  constructor() {
    this.messages = [];
  }

  async find() {
    // Just return all our messages
    return this.messages;
  }

  async create(data) {
    // The new message is the data merged with a unique identifier
    // using the messages length since it changes whenever we add one
    const message = {
      id: this.messages.length,
      text: data.text
    };

    // Add new message to the list
    this.messages.push(message);

    return message;
  }
}

const app = express(feathers());

// Parse HTTP JSON bodies
app.use(express.json());
// Parse URL-encoded params
app.use(express.urlencoded({ extended: true }));

// Add REST API support
app.configure(express.rest());

app.use('/messages', new MessageService());

// Register a nicer error handler than the default Express one
app.use(express.errorHandler());

app.service('messages').create({
  text: 'Hello world from the server'
});

export default app;
