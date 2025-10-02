import React from "react";
import { MdWifiTethering } from "react-icons/md";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white mt-16">
      <div className="w-[80%] mx-auto py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo + About */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <MdWifiTethering className="text-3xl" />
            <span className="text-2xl font-bold">Cryptoplace</span>
          </div>
          <p className="text-gray-200 text-sm leading-relaxed">
            Cryptoplace is your gateway to the world’s largest cryptocurrency
            marketplace. Track prices, explore coins, and stay ahead in the
            crypto world 🚀
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-200">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Features</li>
            <li className="hover:text-white cursor-pointer">Pricing</li>
            <li className="hover:text-white cursor-pointer">Blog</li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-5 text-2xl">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/30 py-4 text-center text-gray-200 text-sm">
        © {new Date().getFullYear()} Cryptoplace. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
