const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

const choreSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    completed: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const behaviorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
    completed: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const rewardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
    completed: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const familySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    chore: [choreSchema],
    behavior: [behaviorSchema],
    reward: [rewardSchema],
  },
  {
    timestamps: true,
  }
);

const Family = mongoose.model("Family", familySchema);

module.exports = Family;
