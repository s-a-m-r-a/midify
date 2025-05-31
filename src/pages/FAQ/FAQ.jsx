import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './FAQ.css';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How do I book movie tickets?",
      answer: "You can book tickets by browsing our movie selection, choosing your preferred movie, and clicking the 'Book Now' button. Select your preferred date, time, and seats, then confirm your booking."
    },
    {
      question: "Can I cancel my booking?",
      answer: "Yes, you can cancel your booking through the 'My Bookings' section. Please note that cancellations are subject to our cancellation policy."
    },
    {
      question: "How many seats can I book at once?",
      answer: "You can book up to 5 seats per transaction. For larger group bookings, please contact our customer service."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards, digital wallets, and online banking transfers."
    },
    {
      question: "How do I get my tickets?",
      answer: "Once your booking is confirmed, you'll receive an email with your e-tickets. You can also find your tickets in the 'My Bookings' section."
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <div className="faq-container">
        <h1>FAQ</h1>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              onClick={() => toggleAccordion(index)}
            >
              <div className="faq-question">
                <h3>{faq.question}</h3>
                <ChevronDown 
                  className={`faq-icon ${activeIndex === index ? 'rotate' : ''}`}
                  size={20}
                />
              </div>
              <div className={`faq-answer ${activeIndex === index ? 'show' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}