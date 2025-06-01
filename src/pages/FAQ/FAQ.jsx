import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import faq from '../../assets/faq.png'
import './FAQ.css';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How do I book movie tickets?",
      answer: "You can select your preferred date, time, and seats, then confirm your booking."
    },
    {
      question: "Can I cancel my booking?",
      answer: "According to our cancellation policy,  you have the right to cancel your booking only within 24 hours."
    },
    {
      question: "How much is a ticket?",
      answer: "Opening special: All tickets are $10. Also, you can book up to 5 seats per session."
    },
    {
      question: "What payment methods do you accept?",
      answer: "At the moment, we accept all major credit/debit cards and cash."
    },
    {
      question: "How do I pay for my tickets?",
      answer: "Online payment is currently under maintenance. You can pay at the cinema hall by payment methods provided above after your booking is confirmed."
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <div className="faq-container">
        <h1><img src={faq} alt="FAQ"/> FAQ</h1>
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