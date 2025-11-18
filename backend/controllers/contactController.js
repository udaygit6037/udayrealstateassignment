import Contact from '../models/Contact.js';

// Submit contact form (public)
export const submitContact = async (req, res) => {
    try {
        const { fullName, email, mobile, city, message } = req.body;
        console.log('📝 Contact form submission received:', { fullName, email, mobile, city });
        
        if (!fullName || !email || !mobile || !city) {
            console.error('❌ Missing required fields');
            return res.status(400).json({ error: 'Full name, email, mobile, and city are required' });
        }

        const contact = new Contact({
            fullName: fullName.trim(),
            email: email.toLowerCase().trim(),
            mobile: mobile.trim(),
            city: city.trim(),
            message: message ? message.trim() : ''
        });
        
        console.log('💾 Saving contact to database...');
        await contact.save();
        console.log('✅ Contact saved successfully:', contact._id);
        
        return res.status(201).json({ 
            message: 'Contact form submitted successfully',
            contact 
        });
    } catch (err) {
        console.error('❌ Error in submitContact controller:', err);
        console.error('Error details:', {
            message: err.message,
            name: err.name,
            code: err.code,
            stack: err.stack
        });
        return res.status(500).json({ error: 'Server error: ' + err.message });
    }
};

// Get all contacts (admin only)
export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        return res.json({ contacts });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

// Get single contact (admin only)
export const getContact = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findById(id);
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        return res.json({ contact });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

// Delete contact (admin only)
export const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findByIdAndDelete(id);
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        return res.json({ message: 'Contact deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

