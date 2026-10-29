import React, { useState } from 'react';
import avatarImg from '../assets/avatar.jpg';
import './Contact.css';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name || 'Visitor'}`);
    const body = encodeURIComponent(
      `Hi Victory,\n\n${formData.message}\n\n---\nFrom: ${formData.name}\nEmail: ${formData.email}`
    );
    window.open(`mailto:victoryikuomola@gmail.com?subject=${subject}&body=${body}`, '_blank');
    setSubmitted(true);
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        {/* Avatar circle */}
        <div className="contact-avatar-wrapper">
          <img
            src={avatarImg}
            alt="Victory Ikuomola"
            className="contact-avatar"
            width="56"
            height="56"
          />
        </div>

        {/* Headline */}
        <h1 className="contact-title">Get In Touch</h1>

        {/* Intro text */}
        <p className="contact-desc">
          I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
        </p>
        <p className="contact-desc contact-subdesc">
          You can email me at{' '}
          <a href="mailto:victoryikuomola@gmail.com" className="contact-link">
            victoryikuomola@gmail.com
          </a>
          , or find me on{' '}
          <a
            href="https://github.com/codewithot"
            target="_blank"
            rel="noreferrer"
            className="contact-link"
          >
            GitHub
          </a>{' '}
          and{' '}
          <a
            href="https://linkedin.com/in/victory-ikuomola"
            target="_blank"
            rel="noreferrer"
            className="contact-link"
          >
            LinkedIn
          </a>
          .
        </p>

        {/* Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="contact-name" className="form-label">
              Your Name
            </label>
            <input
              type="text"
              id="contact-name"
              name="name"
              className="form-input"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-email" className="form-label">
              Your Email
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              className="form-input"
              placeholder="email@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-message" className="form-label">
              Your Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              className="form-textarea"
              rows="5"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="contact-submit-btn">
            Send Message
          </button>

          {submitted && (
            <p className="contact-feedback">
              ✓ Opening your email client to send the message. Thank you!
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
