"use client";

import { useState } from "react";
import { Twitter, Instagram, Facebook, Youtube } from "lucide-react";

type FAQCategory = "Orders" | "Payments" | "Partnership";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: Record<FAQCategory, FAQItem[]> = {
  Orders: [
    {
      question: "How do I place an order?",
      answer:
        "Browse restaurants on the app or website, add items to your cart, and proceed to checkout to place your order.",
    },
    {
      question: "Can I cancel or modify my order?",
      answer:
        "Orders can be modified or canceled within 2 minutes of placing them. After that, cancellations depend on the restaurant's policy.",
    },
  ],
  Payments: [
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept credit/debit cards, UPI, net banking, and popular wallets like Paytm and PhonePe.",
    },
    {
      question: "I was charged but didn’t receive my order. What should I do?",
      answer:
        "Please contact our support team immediately. We’ll verify the transaction and process a refund or re-delivery if eligible.",
    },
  ],
  Partnership: [
    {
      question: "How can I partner my restaurant with SaveRush?",
      answer:
        "You can fill out the partner registration form on our website. Our team will reach out to you within 2–3 business days.",
    },
    {
      question: "Is there a fee to become a SaveRush partner?",
      answer:
        "We do not charge any upfront fees. A small commission is deducted per order to support platform operations.",
    },
  ],
};

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<FAQCategory>("Orders");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [result, setResult] = useState("");
  const [resultType, setResultType] = useState<
    "success" | "error" | "info" | ""
  >("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  setResult("Sending...");
  setResultType("info");

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.success) {
      setResult("Message Sent Successfully!");
      setResultType("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      
      setResult("Something went wrong!");
      setResultType("error");
    }
  } catch (error) {
    console.log(error)
    setResult("Network Error");
    setResultType("error");
  }

  setTimeout(() => {
    setResult("");
    setResultType("");
  }, 4000);
};


  return (
    <div>
      {/* Hero Banner */}
      <div className="w-full mt-5">
        <div
          className="w-[95%] sm:w-[90%] md:w-[85%] m-auto relative bg-cover bg-center h-[250px] flex items-center justify-center text-white rounded-xl overflow-hidden"
          style={{ backgroundImage: "url('/images/contact_banner.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/48 z-0 rounded-xl" />

          <div className="text-center relative z-10 px-4 sm:px-6 md:px-8 lg:px-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-wrap">
              Contact saveRush
            </h1>
            <p className="mt-2 text-base sm:text-lg md:text-xl text-gray-100">
              We’re here to help you with orders, accounts, or anything else.
            </p>
          </div>
        </div>
      </div>

      <div className="w-[95%] sm:w-[90%] md:w-[85%] mx-auto  py-10 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left - Contact Form */}
        <div>
          <h2 className="text-3xl font-bold text-[#2e00b2]  mb-4">
            Get in Touch
          </h2>
          <p className="mb-6 text-gray-700">
            Have questions about your order? Need help with delivery, payments,
            or becoming a partner? Send us a message — our team is here to help
            you quickly and efficiently.
          </p>

          <form className="space-y-4 text-black" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border  border-gray-300 p-2 rounded w-full"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded w-full"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Subject <span className="text-red-500">*</span>
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full text-gray-700"
                required
              >
                <option value="" disabled>
                  Please select a topic
                </option>
                <option value="order">Order Help</option>
                <option value="delivery">Delivery Issue</option>
                <option value="payment">Payment or Refund</option>
                <option value="partnership">Partner With Us</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="border border-gray-300 p-2 rounded w-full"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#9BF00B] to-[#8AE00A]  hover:from-[#8AE00A] hover:to-[#7BD009] text-white font-semibold py-3 px-4 rounded "
              >
                Send Message
              </button>
            </div>
          </form>
          {result && (
            <p
              className={`text-center mt-4 font-medium ${
                resultType === "success"
                  ? "text-green-600"
                  : resultType === "error"
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
            >
              {result}
            </p>
          )}
        </div>

        {/* Right - Contact Information */}
        <div>
          <div>
  <h2 className="text-3xl font-bold text-[#2e00b2] underline-offset-4 mb-4">
    Contact Information
  </h2>
  <p className="mb-6 text-gray-700">
    Our team is available to assist you with any questions or concerns. Here's how you can reach us.
  </p>

  <div className="bg-white shadow rounded-lg p-6 space-y-6">
    {/* Main Office */}
    <div className="flex items-start gap-4">
      <div className="bg-green-100 rounded-full p-2">
        <svg
          className="h-6 w-6 text-red-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 2a6 6 0 00-6 6c0 4.125 6 10 6 10s6-5.875 6-10a6 6 0 00-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div>
        <h3 className="font-semibold text-lg text-slate-600">
          Main Office
        </h3>
        <p className="text-gray-700 text-sm">
          E/504, Veena Beena Apartments
          <br />
          Sewri, Mumbai 400015
        </p>
      </div>
    </div>

    {/* Email Us */}
    <div className="flex items-start gap-4">
      <div className="bg-green-100 rounded-full p-2">
        <svg
          className="h-6 w-6 text-indigo-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M2 4a2 2 0 012-2h16a2 2 0 012 2v1l-10 6L2 5V4zm0 3.236l9.445 5.667a1 1 0 001.11 0L22 7.236V20a2 2 0 01-2 2H4a2 2 0 01-2-2V7.236z" />
        </svg>
      </div>
      <div>
        <h3 className="font-semibold text-lg text-slate-600">
          Email Us
        </h3>
        <p className="text-gray-700 text-sm">
          query.saverush@gmail.com
        </p>
      </div>
    </div>

    {/* Call Us */}
    <div className="flex items-start gap-4">
      <div className="bg-green-100 rounded-full p-2">
        <svg
          className="h-6 w-6 text-green-700"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M2 3.5A1.5 1.5 0 013.5 2h3A1.5 1.5 0 018 3.5V6A1.5 1.5 0 016.5 7.5H5.87A14.95 14.95 0 0012 18.13V16.5A1.5 1.5 0 0113.5 15h2.5A1.5 1.5 0 0117.5 16.5v3A1.5 1.5 0 0116 21H15.5C7.44 21 2 15.56 2 7.5V3.5z" />
        </svg>
      </div>
      <div>
        <h3 className="font-semibold text-lg text-slate-600">
          Call Us
        </h3>
        <p className="text-gray-700 text-sm">
          +91 8104642696
          <br />
          +91 8928779836
        </p>
      </div>
    </div>

    {/* Hours */}
    <div className="flex items-start gap-4">
      <div className="bg-green-100 rounded-full p-2">
        <svg
          className="h-6 w-6 text-yellow-600"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 1a1 1 0 01.993.883L13 2v1.055a9.001 9.001 0 018 8.945 1 1 0 01-2 0 7 7 0 10-7 7 1 1 0 010 2 9 9 0 010-18zm1 9V6a1 1 0 00-2 0v5a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L13 10z" />
        </svg>
      </div>
      <div>
        <h3 className="font-semibold text-lg text-slate-600">
          Hours
        </h3>
        <p className="text-gray-700 text-sm">
          Monday to Friday: 2 PM – 10 PM
          <br />
          Saturday – Sunday: 10 AM – 10 PM
        </p>
      </div>
    </div>
  </div>
</div>

          <div className="text-center mt-6 w-fit px-0.5">
            <h2 className="text-xl font-semibold text-blue-800 mb-3 text-start tracking-wide">
              Follow Us
            </h2>
            <div className="flex justify-center gap-3 sm:gap-5 mt-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="rounded-full bg-gradient-to-r from-blue-500 to-blue-700 p-2 sm:p-3 hover:scale-105 transition">
                  <Facebook className="text-white w-4 h-4   md:w-5 md:h-5" />
                </div>
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="rounded-full bg-gradient-to-r from-blue-500 to-blue-700 p-2 sm:p-3 hover:scale-105 transition">
                  <Twitter className="text-white  w-4 h-4   md:w-5 md:h-5" />
                </div>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="rounded-full bg-gradient-to-r from-blue-500 to-blue-700 p-2 sm:p-3 hover:scale-105 transition">
                  <Instagram className="text-white  w-4 h-4   md:w-5 md:h-5" />
                </div>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="rounded-full bg-gradient-to-r from-blue-500 to-blue-700 p-2 sm:p-3 hover:scale-105 transition">
                  <Youtube className="text-white w-4 h-4   md:w-5 md:h-5" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

  
    </div>
  );
}
