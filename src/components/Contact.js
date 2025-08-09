import { useRef } from "react";
import emailjs from "@emailjs/browser";
import toast from 'react-hot-toast';

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_vb57cbw",
        "template_a8rsade",
        form.current,
        "ZKTrfqc6JXpe3-BsW"
      )
      .then(
        (result) => {
          toast.success("Message sent Successfully");
          form.current.reset();
        },
        (error) => {
          toast.error("Failed to send message. Please try again.");
          console.error(error);
        }
      );
  };

  return (
    <div className="p-4 bg-[#F9FAF9] flex flex-col items-center min-h-screen">
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl lg:text-4xl font-bold text-center text-orange-600 mt-6 mb-3">
          Contact Us
        </h1>
        <p className="text-center text-gray-500 mb-6 max-w-md mx-auto px-2">
          Have questions, feedback, or just want to say hi? I'd love to hear from you.
        </p>
      </div>

      {/* Form */}
      <form ref={form} onSubmit={sendEmail} className="w-full max-w-xl bg-white rounded-lg p-8 shadow-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 text-sm font-medium">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Your name"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Your email"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block mb-1 text-sm font-medium">Message</label>
          <textarea
            id="message"
            name="message"
            className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows="4"
            placeholder="Your message"
            required
          ></textarea>
        </div>
        <div className="text-center">
          <button value="send" type="submit" className="cursor-pointer bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded transition duration-200 font-semibold">
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;