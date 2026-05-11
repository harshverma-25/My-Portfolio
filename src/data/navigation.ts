import { HiHome, HiCode, HiClipboardList, HiMail } from "react-icons/hi";
import { FaGithub, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { contact } from "./contact";

export const navLinks = [
  { name: "Home", href: "#home", icon: HiHome },
  { name: "Projects", href: "#projects", icon: HiCode },
  { name: "Skills", href: "#skills", icon: HiClipboardList },
  { name: "Contact", href: "#contact", icon: HiMail },
];

export const socialLinks = [
  { name: "GitHub", href: contact.socials.github.url, icon: FaGithub },
  { name: "X", href: contact.socials.twitter.url, icon: FaXTwitter },
  { name: "LinkedIn", href: contact.socials.linkedin.url, icon: FaLinkedinIn },
];
