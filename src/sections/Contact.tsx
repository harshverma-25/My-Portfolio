"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { 
  FiMail, 
  FiGithub, 
  FiLinkedin, 
  FiTwitter, 
  FiSend, 
  FiCheck,
  FiCopy
} from "react-icons/fi";
import { contact } from "../data/contact";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const email = contact.email;

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("sending");
    
    const formData = new FormData(e.currentTarget);
    
    // Add Web3Forms access key
    formData.append("access_key", contact.web3FormsKey);
    formData.append("from_name", "Portfolio Contact Form");
    formData.append("subject", `New Message from ${formData.get("name")}`);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setFormStatus("success");
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setFormStatus("idle"), 3000);
      } else {
        console.error("Web3Forms Error:", data);
        setFormStatus("error");
        setTimeout(() => setFormStatus("idle"), 3000);
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 3000);
    }
  };

  const socialLinks = [
    { name: "GitHub", icon: FiGithub, url: contact.socials.github.url, username: contact.socials.github.username },
    { name: "LinkedIn", icon: FiLinkedin, url: contact.socials.linkedin.url, username: contact.socials.linkedin.username },
    { name: "Twitter", icon: FiTwitter, url: contact.socials.twitter.url, username: contact.socials.twitter.username },
  ];

  return (
    <section id="contact" className="py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-black via-zinc-950 to-black">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent mb-3">
            Get In Touch
          </h2>
          
          <p className="text-gray-500 max-w-md mx-auto">
            Have a project in mind? Let's collaborate.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left side - Contact Info */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Email Card */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6 hover:border-purple-500/30 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <FiMail className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="text-xs font-mono text-purple-400">Email Me</span>
                </div>
                
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <code className="text-sm md:text-base text-gray-300 bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                    {email}
                  </code>
                  
                  <button
                    onClick={copyEmail}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-purple-500/30 transition-all duration-200"
                  >
                    {copied ? (
                      <>
                        <FiCheck className="w-4 h-4 text-green-400" />
                        <span className="text-green-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <FiCopy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-purple-500/30 hover:bg-white/5 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <social.icon className="w-5 h-5 text-gray-500 group-hover:text-purple-400 transition-colors" />
                    <div>
                      <p className="text-sm font-medium text-white">{social.name}</p>
                      <p className="text-xs text-gray-600">{social.username}</p>
                    </div>
                  </div>
                  <FiSend className="w-4 h-4 text-gray-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-300" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right side - Contact Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-gray-500 mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-200"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-medium text-gray-500 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-200"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-medium text-gray-500 mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-200 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === "sending"}
                className="w-full relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium text-sm flex items-center justify-center gap-2 group-hover:scale-[1.02] transition-transform duration-300">
                  {formStatus === "sending" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : formStatus === "success" ? (
                    <>
                      <FiCheck className="w-4 h-4" />
                      <span>Sent!</span>
                    </>
                  ) : formStatus === "error" ? (
                    <>
                      <span>Failed to send</span>
                    </>
                  ) : (
                    <>
                      <FiSend className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </div>
              </button>

              <p className="text-center text-xs text-gray-600">
                I'll get back to you within 24-48 hours
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}