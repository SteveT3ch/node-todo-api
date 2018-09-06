const mongoose = require('mongoose');

const User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 8,
    trim: true
  }
});

module.exports = { User };
