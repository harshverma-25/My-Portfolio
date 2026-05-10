"use client";

import { motion, Variants } from "framer-motion";
import { contact } from "../data/contact";
import { MdOutlineMailOutline } from "react-icons/md";
import { HiArrowUpRight } from "react-icons/hi2";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const links = [
  {
    id: "contact-email",
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
    icon: MdOutlineMailOutline,
  },
  {
    id: "contact-github",
    label: "GitHub",
    value: "harshverma-25",
    href: contact.github,
    icon: FaGithub,
  },
  {
    id: "contact-linkedin",
    label: "LinkedIn",
    value: "harshverma-25",
    href: contact.linkedin,
    icon: FaLinkedin,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-20 border-t border-white/[0.06]">
      <div className="section-container">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="section-heading mb-2">Get in touch</h2>
          <p className="section-subtext">
            I&apos;m currently open to new opportunities. Whether you have a
            question or just want to say hi — my inbox is open.
          </p>
        </motion.div>

        <div className="flex flex-col gap-2">
          {links.map(({ id, label, value, href, icon: Icon }, i) => (
            <motion.a
              key={id}
              id={id}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 } as object}
              className="group card card-hover flex items-center justify-between px-5 py-4"
            >
              <div className="flex items-center gap-3">
                <Icon size={15} className="text-zinc-500" />
                <span className="text-sm text-zinc-400">
                  <span className="text-zinc-600 mr-2">{label}</span>
                  {value}
                </span>
              </div>
              <HiArrowUpRight
                size={14}
                className="text-zinc-600 group-hover:text-zinc-300 transition-colors duration-200"
              />
            </motion.a>
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.3 } as object}
          className="mt-8"
        >
          <span className="inline-flex items-center gap-2 text-xs text-zinc-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Currently seeking new opportunities
          </span>
        </motion.div>
      </div>
    </section>
  );
}