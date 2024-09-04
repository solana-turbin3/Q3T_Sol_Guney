// Footer.tsx

import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="social-icons">
        <a
          href="https://discord.gg/M7XQuDB59y"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/discord.png"
            alt="Discord"
            className="hover:scale-110"
          />
        </a>
        <a
          href="https://twitter.com/PicassolCanvas"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/twitter.png"
            alt="Twitter"
            className="hover:scale-110"
          />
        </a>
        <a
          href="https://t.me/picassolportal"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/telegram.png"
            alt="Telegram"
            className="hover:scale-110"
          />
        </a>
      </div>
      <div className="links">
        <a href="/privacy-policy" className="hover:text-white">
          Privacy Policy
        </a>
        <a href="/terms-of-use" className="hover:text-white">
          Terms of Use
        </a>
      </div>
      <div className="copyright">
        &copy; 2024 Picassol.art
      </div>
    </footer>
  );
}

export default Footer;
