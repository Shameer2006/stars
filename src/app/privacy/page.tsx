'use client';

import LegalPageLayout from '@/components/LegalPageLayout';

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      subtitle="Your privacy matters to us — here&apos;s how we handle your data"
      lastUpdated="May 23, 2026"
    >
      <section className="legal-section">
        <h2>1. Introduction</h2>
        <p>
          Welcome to <strong>Your Name in Stars</strong> (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). This Privacy Policy
          explains how we collect, use, and protect your information when you visit our website at{' '}
          <a href="https://stars-n.vercel.app" target="_blank" rel="noopener noreferrer">
            stars-n.vercel.app
          </a>{' '}
          (the &ldquo;Service&rdquo;).
        </p>
        <p>
          By using our Service, you agree to the collection and use of information in accordance with
          this policy.
        </p>
      </section>

      <section className="legal-section">
        <h2>2. Information We Collect</h2>

        <h3>2.1 Information You Provide</h3>
        <p>
          When you use our star name generator, you type a name into our tool. This name is{' '}
          <strong>processed entirely in your browser</strong> and is not stored on our servers. We do
          not collect or store the names you enter.
        </p>

        <h3>2.2 Automatically Collected Information</h3>
        <p>When you visit our website, we may automatically collect certain information, including:</p>
        <ul>
          <li>Browser type and version</li>
          <li>Operating system</li>
          <li>Referring URLs</li>
          <li>Pages visited and time spent</li>
          <li>IP address (anonymized where possible)</li>
          <li>Device type and screen resolution</li>
        </ul>

        <h3>2.3 Cookies &amp; Tracking Technologies</h3>
        <p>
          We may use cookies and similar tracking technologies to enhance your experience. Third-party
          services such as Google AdSense and Google Analytics may set their own cookies for
          advertising and analytics purposes.
        </p>
      </section>

      <section className="legal-section">
        <h2>3. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide and maintain the Service</li>
          <li>Analyze usage patterns to improve user experience</li>
          <li>Display relevant advertisements through Google AdSense</li>
          <li>Monitor and prevent technical issues</li>
          <li>Comply with legal obligations</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>4. Third-Party Services</h2>

        <h3>4.1 Google AdSense</h3>
        <p>
          We use Google AdSense to display advertisements. Google may use cookies and web beacons to
          serve ads based on your prior visits to our website and other websites. You can opt out of
          personalized advertising by visiting{' '}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
            Google Ads Settings
          </a>
          .
        </p>

        <h3>4.2 Google Analytics</h3>
        <p>
          We may use Google Analytics to track and analyze website traffic. Google Analytics collects
          information anonymously and reports website trends without identifying individual visitors.
          You can opt out by installing the{' '}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Analytics Opt-out Browser Add-on
          </a>
          .
        </p>

        <h3>4.3 Vercel</h3>
        <p>
          Our website is hosted on Vercel. Vercel may collect certain usage data as described in their{' '}
          <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
          .
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Data Sharing</h2>
        <p>
          We do <strong>not</strong> sell, trade, or otherwise transfer your personal information to
          outside parties, except as described in this policy (i.e., through third-party analytics and
          advertising services).
        </p>
      </section>

      <section className="legal-section">
        <h2>6. Data Retention</h2>
        <p>
          Since we do not store user-submitted names, there is no personal data to retain. Analytics
          data is retained according to the respective third-party service&apos;s data retention policies.
        </p>
      </section>

      <section className="legal-section">
        <h2>7. Your Rights</h2>
        <p>Depending on your location, you may have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Request correction or deletion of your personal data</li>
          <li>Object to or restrict processing of your personal data</li>
          <li>Data portability</li>
          <li>Withdraw consent at any time</li>
        </ul>
        <p>
          To exercise any of these rights, please contact us at the email address provided below.
        </p>
      </section>

      <section className="legal-section">
        <h2>8. Children&apos;s Privacy</h2>
        <p>
          Our Service is suitable for users of all ages. We do not knowingly collect personal
          information from children under 13. If you believe a child has provided us with personal
          information, please contact us and we will delete it promptly.
        </p>
      </section>

      <section className="legal-section">
        <h2>9. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by
          posting the new Privacy Policy on this page and updating the &ldquo;Last updated&rdquo; date.
        </p>
      </section>

      <section className="legal-section">
        <h2>10. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please reach out through our{' '}
          <a href="/contact">Contact page</a>.
        </p>
      </section>
    </LegalPageLayout>
  );
}
