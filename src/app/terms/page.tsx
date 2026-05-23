'use client';

import LegalPageLayout from '@/components/LegalPageLayout';

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      subtitle="Please read these terms carefully before using our Service"
      lastUpdated="May 23, 2026"
    >
      <section className="legal-section">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using <strong>Your Name in Stars</strong> (the &ldquo;Service&rdquo;), available at{' '}
          <a href="https://stars-n.vercel.app" target="_blank" rel="noopener noreferrer">
            stars-n.vercel.app
          </a>
          , you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these
          Terms, please do not use the Service.
        </p>
      </section>

      <section className="legal-section">
        <h2>2. Description of Service</h2>
        <p>
          Your Name in Stars is a free, interactive web application that generates visual
          representations of names using real star positions from the HYG Stellar Database. The
          Service allows you to:
        </p>
        <ul>
          <li>Enter a name and see it traced by real star positions</li>
          <li>Explore named stars and their astronomical data</li>
          <li>View a daily featured star (Star of the Day)</li>
          <li>Share your star visualization via links, downloads, and QR codes</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>3. Use of the Service</h2>

        <h3>3.1 Permitted Use</h3>
        <p>
          You may use the Service for personal, non-commercial purposes. You are welcome to share
          your star visualizations with others.
        </p>

        <h3>3.2 Prohibited Use</h3>
        <p>You agree not to:</p>
        <ul>
          <li>
            Use the Service for any unlawful purpose or in violation of any applicable laws
          </li>
          <li>
            Attempt to interfere with, compromise, or disrupt the Service or its servers
          </li>
          <li>
            Scrape, crawl, or use automated tools to extract data from the Service without permission
          </li>
          <li>
            Reproduce, duplicate, or redistribute the Service&apos;s source code without authorization
          </li>
          <li>Use the Service to generate offensive, harmful, or inappropriate content</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>4. Intellectual Property</h2>

        <h3>4.1 Our Content</h3>
        <p>
          The design, layout, graphics, user interface, and original code of the Service are owned by
          Your Name in Stars and are protected by intellectual property laws. You may not copy,
          modify, or distribute these materials without our written consent.
        </p>

        <h3>4.2 Star Data</h3>
        <p>
          Star position data is sourced from the{' '}
          <a
            href="https://www.astronexus.com/projects/hyg"
            target="_blank"
            rel="noopener noreferrer"
          >
            HYG Stellar Database
          </a>
          , which is licensed under{' '}
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            CC BY-SA 4.0
          </a>
          . We acknowledge and attribute this data accordingly.
        </p>

        <h3>4.3 Your Content</h3>
        <p>
          When you generate a star visualization, you retain the right to use and share the resulting
          image. We do not claim ownership of the names you enter or the visualizations you create.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Disclaimer of Warranties</h2>
        <p>
          The Service is provided <strong>&ldquo;as is&rdquo;</strong> and <strong>&ldquo;as available&rdquo;</strong>{' '}
          without warranties of any kind, either express or implied, including but not limited to:
        </p>
        <ul>
          <li>Merchantability or fitness for a particular purpose</li>
          <li>Accuracy or completeness of star data or visualizations</li>
          <li>Uninterrupted or error-free operation</li>
          <li>Security of data transmitted to or from the Service</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>6. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, Your Name in Stars shall not be liable for any
          indirect, incidental, special, consequential, or punitive damages, or any loss of data,
          use, or profits, arising out of or related to your use of the Service.
        </p>
      </section>

      <section className="legal-section">
        <h2>7. Advertising</h2>
        <p>
          The Service may display advertisements provided by third-party advertising networks,
          including Google AdSense. These advertisements are subject to the respective advertising
          network&apos;s terms and privacy policies.
        </p>
      </section>

      <section className="legal-section">
        <h2>8. External Links</h2>
        <p>
          The Service may contain links to third-party websites (e.g., Wikipedia, HYG Database). We
          are not responsible for the content, privacy practices, or terms of any external websites.
        </p>
      </section>

      <section className="legal-section">
        <h2>9. Modifications to Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. Changes will be effective
          immediately upon posting to this page. Your continued use of the Service after any changes
          constitutes acceptance of the updated Terms.
        </p>
      </section>

      <section className="legal-section">
        <h2>10. Termination</h2>
        <p>
          We reserve the right to suspend or terminate access to the Service at any time, without
          prior notice, for any reason, including violation of these Terms.
        </p>
      </section>

      <section className="legal-section">
        <h2>11. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with applicable laws. Any
          disputes arising from these Terms or the Service shall be resolved in the appropriate
          jurisdiction.
        </p>
      </section>

      <section className="legal-section">
        <h2>12. Contact Us</h2>
        <p>
          If you have any questions about these Terms of Service, please reach out through our{' '}
          <a href="/contact">Contact page</a>.
        </p>
      </section>
    </LegalPageLayout>
  );
}
