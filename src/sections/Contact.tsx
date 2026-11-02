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
  FiCopy,
  FiMessageSquare
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
    <section id="contact" className="py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 mb-4 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
            <FiMessageSquare className="text-emerald-400" size={13} />
            <span className="text-xs uppercase tracking-[0.3em] text-emerald-400 font-medium">
              Get In Touch
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-3">
            Let&apos;s Build Something{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Exceptional
            </span>
          </h2>
          
          <p className="text-zinc-400 text-sm max-w-md mx-auto font-light">
            {contact.description}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left side - Contact Info */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-5"
          >
            {/* Email Card */}
            <div className="group relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-zinc-950/60 backdrop-blur-xl p-6 md:p-7 hover:border-emerald-500/40 transition-all duration-300 shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 bg-emerald-500/30 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <FiMail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-emerald-400 font-medium">Direct Inbox</span>
                    <p className="text-[11px] text-zinc-500 font-light">Fast response time guaranteed</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between flex-wrap gap-3 pt-3 border-t border-white/5">
                  <code className="text-sm md:text-base text-zinc-200 font-mono bg-white/[0.03] px-3.5 py-2 rounded-xl border border-white/10 select-all">
                    {email}
                  </code>
                  
                  <button
                    onClick={copyEmail}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium bg-white/[0.05] border border-white/10 text-zinc-300 hover:text-white hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all duration-200 active:scale-95"
                  >
                    {copied ? (
                      <>
                        <FiCheck className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <FiCopy className="w-4 h-4" />
                        <span>Copy Email</span>
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
                  className="flex items-center justify-between p-4 rounded-2xl border border-white/[0.08] bg-zinc-950/60 backdrop-blur-xl hover:border-emerald-500/40 hover:bg-emerald-500/[0.03] transition-all duration-300 group shadow-md"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03] border border-white/5 text-zinc-400 group-hover:text-emerald-400 group-hover:border-emerald-500/20 group-hover:scale-105 transition-all">
                      <social.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">{social.name}</p>
                      <p className="text-xs text-zinc-500 font-mono font-light">{social.username}</p>
                    </div>
                  </div>
                  <FiSend className="w-4 h-4 text-zinc-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-300" />
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
            className="rounded-[28px] border border-white/[0.08] bg-zinc-950/60 backdrop-blur-xl p-6 md:p-8 shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all duration-200 text-sm"
                  placeholder="e.g. Alex Morgan"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all duration-200 text-sm"
                  placeholder="alex@company.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all duration-200 text-sm resize-none"
                  placeholder="Tell me about your project, vision, or role..."
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === "sending"}
                className="w-full group relative overflow-hidden rounded-full p-px transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] active:scale-[0.99] disabled:opacity-60"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-full" />
                <div className="relative px-6 py-3.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 text-black font-bold text-sm flex items-center justify-center gap-2 group-hover:from-emerald-300 group-hover:to-teal-300 transition-colors">
                  {formStatus === "sending" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      <span>Sending message...</span>
                    </>
                  ) : formStatus === "success" ? (
                    <>
                      <FiCheck className="w-4 h-4 text-black" />
                      <span>Message Sent Successfully!</span>
                    </>
                  ) : formStatus === "error" ? (
                    <>
                      <span>Failed to send. Try emailing directly.</span>
                    </>
                  ) : (
                    <>
                      <FiSend className="w-4 h-4 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      <span>Send Message</span>
                    </>
                  )}
                </div>
              </button>

              <p className="text-center text-xs text-zinc-500 font-light pt-1">
                Typically respond within 24 hours.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}