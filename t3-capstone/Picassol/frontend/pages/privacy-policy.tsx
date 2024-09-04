// pages/privacy-policy.tsx

import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div className="privacyPolicy">
      <h1>Privacy Policy</h1>
      <p>Effective Date: 7.08.2024</p>

      <h2>1. Introduction</h2>
      <p>
        Welcome to our Solana web3 application Picassol. This Privacy Policy explains how we collect, use, and protect your information when you use our pixel canvas platform hosted on Vercel with our database on MongoDB Atlas.
      </p>

      <h2>2. Information We Collect</h2>
      <p>
        We value your privacy and strive to collect the minimal amount of information necessary to provide our Service. Specifically, we collect the following information:
      </p>
      <ul>
        <li>Wallet Address: We collect your Solana wallet address when you interact with our platform to assign points for pixel changes.</li>
      </ul>
      <p>We do not collect any other personal information, such as your name, email address, or IP address.</p>

      <h2>3. How We Use Your Information</h2>
      <p>We use your wallet address for the following purposes:</p>
      <ul>
        <li>Assigning Points: To give you points for changing pixel colors on our canvas.</li>
        <li>Transaction Records: To maintain a record of transactions and interactions within the platform.</li>
      </ul>

      <h2>4. Data Storage and Security</h2>
      <p>
        <strong>Storage:</strong> Your wallet address is stored securely in our MongoDB Atlas database.
      </p>
      <p>
        <strong>Security Measures:</strong> We implement industry-standard security measures to protect your information, including encryption and secure data transmission protocols.
      </p>

      <h2>5. Sharing of Information</h2>
      <p>We do not sell, trade, or otherwise transfer your wallet address to outside parties. We may share your information only in the following circumstances:</p>
      <ul>
        <li>Legal Requirements: If required by law or in response to valid requests by public authorities (e.g., a court or a government agency).</li>
        <li>Protection of Rights: If necessary to enforce our Terms of Service, protect the security or integrity of our Service, or protect the rights, property, or safety of our users or others.</li>
      </ul>

      <h2>6. Third-Party Services</h2>
      <p>
        Our Service is hosted on Vercel and uses MongoDB Atlas for database storage. Both Vercel and MongoDB Atlas have their own privacy policies, which you can review on their respective websites.
      </p>

      <h2>7. Your Rights</h2>
      <p>
        Since we collect minimal personal information, your primary right is to ensure the security and control of your wallet address. If you have any concerns about your information or wish to inquire about its use, please contact us at Discord.
      </p>

      <h2>8. Changes to This Privacy Policy</h2>
      <p>
        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
      </p>

      <h2>9. Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us at:</p>
      <p>Discord: <a href="https://discord.gg/ycqxTAwyug">https://discord.gg/ycqxTAwyug</a></p>
      <p>By using our Service, you agree to the collection and use of information in accordance with this Privacy Policy.</p>
    </div>
  );
};

export default PrivacyPolicyPage;