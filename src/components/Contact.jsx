import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import emailjs from '@emailjs/browser';

const validationSchema = Yup.object({
  name: Yup.string().min(2, 'Too short').max(60, 'Too long').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  subject: Yup.string().min(2, 'Too short').max(100, 'Too long').required('Required'),
  message: Yup.string().min(10, 'Please write a bit more').max(1000, 'Too long').required('Required'),
});

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        <h2 className="section-title">Contact Me</h2>
        <p className="section-subtitle">Have a question or want to work together?</p>

        <Formik
          initialValues={{ name: '', email: '', subject: '', message: '' }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm, setSubmitting, setStatus }) => {
            setStatus(undefined);
            try {
              const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
              const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
              const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

              if (!serviceId || !templateId || !publicKey) {
                throw new Error('Email configuration is missing.');
              }

              const templateParams = {
                from_name: values.name,
                reply_to: values.email,
                subject: values.subject,
                message: values.message,
              };

              await emailjs.send(serviceId, templateId, templateParams, { publicKey });
              setStatus({ ok: true, msg: "Thank you! Your message has been sent." });
              resetForm();
            } catch (err) {
              console.error('Email send failed:', err);
              setStatus({ ok: false, msg: "Sorry, something went wrong. Please try again later." });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, status }) => (
            <Form className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <Field id="name" name="name" type="text" placeholder="Your name" />
                  <ErrorMessage name="name" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field id="email" name="email" type="email" placeholder="you@example.com" />
                  <ErrorMessage name="email" component="div" className="error" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <Field id="subject" name="subject" type="text" placeholder="How can I help?" />
                <ErrorMessage name="subject" component="div" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <Field as="textarea" id="message" name="message" placeholder="Write your message..." rows="6" />
                <ErrorMessage name="message" component="div" className="error" />
              </div>

              {status && (
                <div className="form-status" style={{ color: status.ok ? '#2e7d32' : '#c75252', marginTop: '8px' }}>
                  {status.msg}
                </div>
              )}

              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending…' : 'Send Message'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default Contact;


