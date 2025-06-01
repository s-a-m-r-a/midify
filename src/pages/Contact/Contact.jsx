import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1><Phone size={28} /> Contact Us</h1>
        
        <div className="contact-content">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>Have questions? We'd love to hear from you.</p>
            
            <div className="contact-details">
              <div className="contact-item">
                <Mail size={20} />
                <span>support@midify.com</span>
              </div>
              <div className="contact-item">
                <MapPin size={20} />
                <span>803 Movie St, Midify Cinema Hall</span>
              </div>
            </div>
          </div>

        <form 
        className="contact-form" 
        action="https://api.web3forms.com/submit" 
        method="POST"
        >
            <input type="hidden" name="access_key" value="634bdf51-26d8-4bcd-8a20-d4550cbe510e" />
            <input type="hidden" name="from_name" value="Midify Contact Form" />
            <input type="hidden" name="replyto" value="email" />
            <input type="hidden" name="redirect" value="https://web3forms.com/success" />
            
            <div className="form-group">
                <input 
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                />
            </div>
            <div className="form-group">
                <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Your E-mail"
                value={formData.email}
                onChange={handleChange}
                required
                />
            </div>
            <div className="form-group">
                <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                />
            </div>
            <div className="form-group">
                <textarea
                name="message"
                placeholder="Your Message.."
                value={formData.message}
                onChange={handleChange}
                required
                >
                </textarea>
            </div>
        <button type="submit">
            <Send size={18} />
        Send Message
        </button>
        </form>
        </div>
      </div>
    </div>
  );
}