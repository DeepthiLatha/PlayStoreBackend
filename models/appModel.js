const mongoose = require('mongoose');

const appSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  isVisible: { type: Boolean, default: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  downloadCount: { type: Number, default: 0 },
  releaseDate: { type: String }, // Year or a more detailed date
  version: { type: String },
  genre: { type: String },
  ratings: { type: Number, default: 0 },
  imageUrl: { type: String }, // URL to the app's image
});
  
const commentSchema = new mongoose.Schema({
    application: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
  });

module.exports = mongoose.model('Comment', commentSchema);

module.exports = mongoose.model('Application', appSchema);
