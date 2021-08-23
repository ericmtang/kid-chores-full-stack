const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const choreSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    completed: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const choreSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    completed: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const behaviorSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    points: {
        type: Number,
        required: true,
    },
    completed: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const behaviorQueueSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    points: {
        type: Number,
        required: true,
    },
    completed: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const rewardSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    points: {
        type: Number,
        required: true,
    },
    completed: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const rewardQueueSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    points: {
        type: Number,
        required: true,
    },
    completed: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const familySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        chore: [choreSchema],
        behavior: [behaviorSchema],
        reward: [rewardSchema],
    }],
}, {
    timestamps: true
});

const Campsite = mongoose.model('Campsite', campsiteSchema);

module.exports = Campsite;