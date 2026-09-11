'use client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { trackLeadEvent } from '@/components/analytics/gaEvents';

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

const schema = yup
  .object({
    name: yup.string().required().label("Name"),
    email: yup.string().required().email().label("Email"),
    company: yup.string().required().label("Company"),
    message: yup.string().required().label("Message"),
  })
  .required();


const budget_categorys = [
  { id: "under_10k", title: "Under ₹10k", },
  { id: "10k_25k", title: "₹10k-25k", },
  { id: "25k_50k", title: "₹25k-50k", },
  { id: "50k_1l", title: "₹50k-1L", },
  { id: "above_1l", title: "₹1L+", },
]

type ContactFormProps = {
  selectedCategories?: string[];
};

const ContactForm = ({ selectedCategories = [] }: ContactFormProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isFocused2, setIsFocused2] = useState<boolean>(false);
  const [isFocused3, setIsFocused3] = useState<boolean>(false);
  const [isFocused4, setIsFocused4] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);


  const { register, handleSubmit, reset, formState: { errors }, } = useForm<FormData>({ resolver: yupResolver(schema), });
  const onSubmit = async (data: FormData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const budget = activeCategory !== null ? budget_categorys[activeCategory]?.title : 'Not specified';
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          budget,
          services: selectedCategories,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Unable to send the message right now.');
      }

      toast('Message sent successfully');
      trackLeadEvent("contact_form_submit", {
        contact_method: "form",
        form_location: "contact_page",
        selected_budget: budget,
        selected_services: selectedCategories.join(", "),
      });
      setIsFocused(false);
      setIsFocused2(false);
      setIsFocused3(false);
      setIsFocused4(false);
      reset();
      setActiveCategory(null);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to send the message right now.';
      toast(message);
    } finally {
      setIsSubmitting(false);
    }
  };


  // handle focus and blur events 

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleFocus2 = () => {
    setIsFocused2(true);
  };
  const handleFocus3 = () => {
    setIsFocused3(true);
  };
  const handleFocus4 = () => {
    setIsFocused4(true);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.target.value === '') {
      setIsFocused(false);
    }
  };
  const handleBlur2 = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.target.value === '') {
      setIsFocused2(false);
    }
  };
  const handleBlur3 = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.target.value === '') {
      setIsFocused3(false);
    }
  };
  const handleBlur4 = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.target.value === '') {
      setIsFocused4(false);
    }
  };

  const handleItemClick = (index: number) => {
    setActiveCategory(activeCategory === index ? null : index);
  };




  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="contact-inner__wrapper">
          <div className="postbox__comment-form">
            <h3 className="contact-inner__form-title">Request A Quote</h3>
            <div className="row gx-20">
              <div className="col-xxl-6 col-xl-6 col-lg-6">
                <div className="postbox__comment-input mb-35">
                  <input type="text" autoComplete="name" className="inputText" id="contact-name" aria-invalid={Boolean(errors.name)} aria-describedby="contact-name-error" {...register("name")} onFocus={handleFocus} onBlur={handleBlur} />
                  <label htmlFor="contact-name" className={`floating-label ${isFocused ? 'floating-label-floated' : ''}`}>Your  Name</label>
                  <p className="form_error" id="contact-name-error">{errors.name?.message}</p>
                </div>
              </div>
              <div className="col-xxl-6 col-xl-6 col-lg-6">
                <div className="postbox__comment-input mb-35">
                  <input type="text" className="inputText" id="contact-company" aria-invalid={Boolean(errors.company)} aria-describedby="contact-company-error" {...register("company")} onFocus={handleFocus2} onBlur={handleBlur2} />
                  <label htmlFor="contact-company" className={`floating-label ${isFocused2 ? 'floating-label-floated' : ''}`}>Company</label>
                  <p className="form_error" id="contact-company-error">{errors.company?.message}</p>
                </div>
              </div>
              <div className="col-xxl-12">
                <div className="postbox__comment-input mb-35">
                  <input type="email" autoComplete="email" className="inputText" id="contact-email" aria-invalid={Boolean(errors.email)} aria-describedby="contact-email-error" {...register("email")} onFocus={handleFocus3} onBlur={handleBlur3} />
                  <label htmlFor="contact-email" className={`floating-label ${isFocused3 ? 'floating-label-floated' : ''}`}>Your Email</label>
                  <p className="form_error" id="contact-email-error">{errors.email?.message}</p>
                </div>
              </div>
              <div className="col-xxl-12">
                <div className="postbox__comment-input mb-20">
                  <textarea className="textareaText" id="contact-message" aria-invalid={Boolean(errors.message)} aria-describedby="contact-message-error" {...register("message")} onFocus={handleFocus4} onBlur={handleBlur4}></textarea>
                  <label htmlFor="contact-message" className={`floating-label-2 ${isFocused4 ? 'floating-label-floated' : ''}`}>Tell us what you need</label>
                  <p className="form_error" id="contact-message-error">{errors.message?.message}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="contact-inner__category mb-45">
                <h4 className="contact-inner__category-title">Budget range (optional, INR)</h4>
                <div className="contact-inner__category-wrapper">

                  {budget_categorys.map((item, index) => (
                    <button key={index} type="button"
                      aria-pressed={activeCategory === index}
                      onClick={() => handleItemClick(index)}
                      className={`contact-budget-btn ${activeCategory === index ? 'active' : ''}`}
                    >{item.title}</button>
                  ))}

                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xxl-12">
              <div className="postbox__comment-btn">
                <button type="submit" className="tp-btn-grey-lg" disabled={isSubmitting} aria-busy={isSubmitting}>
                  <span>
                    <i>{isSubmitting ? 'Sending...' : 'Send Enquiry'}</i>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
