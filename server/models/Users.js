const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema  = new Schema (
  {
    userName: {type: String, required: true, unique: true, trim: true},
    firstName: String,
    lastName: String,
    email: {type: String, required: true, unique: true, match: [/.+@.+\..+/, 'Must use a valid email address']},
    password: {type: String, required: true, minlength: 3},
    posts: [{
      type: Schema.Types.ObjectId,
      ref: 'Post'
      }
    ],
    following: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  }, 
  {
    toJSON: {
      virtuals: true,
    }
  }
);

userSchema.pre('save', async function(next) {
  // skip if the password has not been modified
  if (!this.isModified('password')) {
    return next();
  }
  // hash password if changed or new
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.virtual('friendCount').get(function() {
  return this.following.length;
});

userSchema.methods.isCorrectPassword = async function(password) {
  
  return bcrypt.compare(password, this.password);
}

const User = model('User', userSchema);

module.exports  = User;