const mongoose = require('mongoose');
const crypto = require('crypto');

// user schema
const userScheama = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true
    },
    name: {
      type: String,
      trim: true,
      required: true
    },
    hashed_password: {
      type: String,
      required: true
    },
    salt: String,
    resetPasswordLink: {
      data: String,
      default: ''
    },

    billingID: String,
    plan: { type: String, enum: ['none', 'basic_mo', 'pro_mo', 'basic_year', 'pro_year'], default: 'none' },
    hasTrial: { type: Boolean, default: false },
    endDate: { type: Date, default: null }

  }, { timestamps: true }
);

// virtual
userScheama
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

// methods
userScheama.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function(password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },

  makeSalt: function() {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  }
};

module.exports = mongoose.model('User', userScheama);