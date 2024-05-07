const Application = require('../models/appModel');
// const User = require('../models/userModel');
const Notification = require('../models/notificationModel'); // Assuming you have a notification model

const getApps = async (req, res) => {
  try {
    const apps = await Application.find({ owner: req.user._id });
    res.json(apps);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications' });
  }
};

const createApp = async (req, res) => {
  const { name, description, releaseDate, version, genre, imageUrl } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required.' });
  }

  try {
    const app = new Application({
      name,
      description,
      owner: req.user._id,
      releaseDate,
      version,
      genre,
      imageUrl,
    });

    await app.save();
    res.status(201).json(app);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Error creating application' });
  }
};


const getApp = async (req, res) => {
  try {
    const app = await Application.findById(req.params.id);
    if (!app || app.owner.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json(app);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching application' });
  }
};

const updateApp = async (req, res) => {
  const { name, description, isVisible } = req.body;

  try {
    const app = await Application.findById(req.params.id);

    if (!app || app.owner.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (name) {
      app.name = name;
    }

    if (description) {
      app.description = description;
    }

    if (isVisible !== undefined) {
      app.isVisible = isVisible;
    }

    await app.save();
    res.json(app);
  } catch (error) {
    res.status(500).json({ message: 'Error updating application' });
  }
};

const deleteApp = async (req, res) => {
  try {
    const app = await Application.findById(req.params.id);

    if (!app || app.owner.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Application not found' });
    }

    await app.remove();
    res.json({ message: 'Application deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting application' });
  }
};


const announceUpdates = async (req, res) => {
  try {
    const app = await Application.findById(req.params.id);

    if (!app || app.owner.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Notify users about the update
    const usersToNotify = await User.find({ /* your criteria here */ });

    const notifications = usersToNotify.map((user) => ({
      user: user._id,
      message: `An update for ${app.name}: [add your announcement details here]`,
    }));

    // Bulk insert notifications
    await Notification.insertMany(notifications);

    res.json({ message: 'Updates announced successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error announcing updates', error });
  }
};

const createComment = async (req, res) => {
  const { applicationId, content, rating } = req.body;

  if (!applicationId || !content || typeof rating !== 'number' || rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Invalid request. Please ensure content and rating are provided and valid.' });
  }

  try {
    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({ message: 'Application not found.' });
    }

    const comment = new Comment({
      application: applicationId,
      user: req.user._id,
      content,
    });

    await comment.save();

    // Update application rating (simple average for demonstration)
    const comments = await Comment.find({ application: applicationId });
    const newRating = comments.reduce((sum, com) => sum + (com.rating || 0), 0) / comments.length;

    application.ratings = newRating;
    await application.save();

    res.status(201).json({ message: 'Comment created and rating updated.', comment });
  } catch (error) {
    res.status(500).json({ message: 'Error creating comment.', error });
  }
};


module.exports = { announceUpdates, deleteApp, updateApp, getApp, createApp, getApps, createComment };

