import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', function () {
  if (!this.username) {
    this.username = this.email;
  }
});

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('User', userSchema);
