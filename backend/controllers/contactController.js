import { Contact } from '../models/Contact.js';

// @desc    Submit a contact inquiry message
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const newContact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      data: newContact,
      message: 'Thank you! Your message has been sent successfully. Ayusman will get back to you soon.',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all messages (inbox)
// @route   GET /api/contact
// @access  Private (Admin)
export const getContacts = async (req, res, next) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    const unreadCount = await Contact.countDocuments({ isRead: false });
    res.json({
      success: true,
      count: messages.length,
      unreadCount,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark message as read/unread or replied
// @route   PATCH /api/contact/:id
// @access  Private (Admin)
export const updateContactStatus = async (req, res, next) => {
  try {
    const message = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.json({ success: true, data: message });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete message
// @route   DELETE /api/contact/:id
// @access  Private (Admin)
export const deleteContact = async (req, res, next) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    next(error);
  }
};
