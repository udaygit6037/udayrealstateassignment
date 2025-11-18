import Subscriber from '../models/Subscriber.js';

// Subscribe (public)
export const subscribe = async (req, res) => {
    try {
        const { email } = req.body;
        console.log('📧 Subscribe request received:', { email });
        
        if (!email) {
            console.error('❌ Email is missing in request');
            return res.status(400).json({ error: 'Email is required' });
        }
        
        const normalizedEmail = email.toLowerCase().trim();
        console.log('🔍 Checking for existing subscriber:', normalizedEmail);
        
        const existing = await Subscriber.findOne({ email: normalizedEmail });
        if (existing) {
            console.log('⚠️  Email already exists:', normalizedEmail);
            return res.status(400).json({ error: 'Email already subscribed' });
        }
        
        console.log('💾 Creating new subscriber:', normalizedEmail);
        const subscriber = new Subscriber({ email: normalizedEmail });
        await subscriber.save();
        
        console.log('✅ Subscriber saved successfully:', subscriber._id);
        return res.json({ message: 'Subscribed successfully', subscriber });
    } catch (err) {
        console.error('❌ Error in subscribe controller:', err);
        console.error('Error details:', {
            message: err.message,
            name: err.name,
            code: err.code,
            stack: err.stack
        });
        return res.status(500).json({ error: 'Server error: ' + err.message });
    }
};

// Get all subscribers (admin only)
export const getSubscribers = async (req, res) => {
    try {
        const subscribers = await Subscriber.find().sort({ createdAt: -1 });
        return res.json({ subscribers });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

// Delete subscriber (admin only)
export const deleteSubscriber = async (req, res) => {
    try {
        const { id } = req.params;
        const subscriber = await Subscriber.findByIdAndDelete(id);
        if (!subscriber) {
            return res.status(404).json({ error: 'Subscriber not found' });
        }
        return res.json({ message: 'Subscriber deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

