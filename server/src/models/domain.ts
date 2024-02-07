import mongoose from "mongoose";

const domainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
    validate: {
      validator: function (v: string) {
        return /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/.test(v);
      },
    },
  },
  port: {
    type: Number,
    required: true,
    min: 1,
    max: 65535,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Domain = mongoose.model("Domain", domainSchema);

export default Domain;
