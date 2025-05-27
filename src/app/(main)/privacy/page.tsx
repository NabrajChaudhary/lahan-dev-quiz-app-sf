export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg p-8 md:p-12">
          <h1 className="text-3xl text-center font-bold text-gray-900 mb-10">
            Privacy Policy
          </h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 mb-6">
              Lahan Dev Quiz App (&quot;we,&quot; &ldquo;us,&quot; or
              &quot;our&quot;) values your privacy. This Privacy Policy explains
              how we collect, use, store, and protect your information when you
              use our website. By using the App, you consent to the practices
              described in this policy.
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                1. Information We Collect
              </h2>
              <p className="text-gray-700 mb-4">
                We may collect the following types of information:
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Personal Information:
                  </h3>
                  <p className="text-gray-700">
                    If you create an account, we may collect your name, email
                    address, or username (e.g., via third-party authentication
                    like Google or GitHub).
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Quiz Data:
                  </h3>
                  <p className="text-gray-700">
                    We may collect your quiz responses, scores, and progress to
                    provide personalized feedback and leaderboards.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Usage Data:
                  </h3>
                  <p className="text-gray-700">
                    We collect non-personal information such as IP addresses,
                    browser type, device information, and pages visited, often
                    via analytics tools.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Cookies:
                  </h3>
                  <p className="text-gray-700">
                    We use cookies to enhance your experience, such as
                    remembering your preferences or tracking session data. You
                    can manage cookie settings in your browser.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-gray-700 mb-4">We use your information to:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  Provide and improve the App&apos;s functionality, such as
                  displaying quiz results or leaderboards.
                </li>
                <li>
                  Personalize your experience, like saving your quiz progress.
                </li>
                <li>
                  Analyze usage trends to enhance the App&apos;s performance and
                  content.
                </li>
                <li>
                  Communicate with you, such as responding to inquiries or
                  sending updates (if you opt in).
                </li>
                <li>Comply with legal obligations.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                3. How We Share Your Information
              </h2>
              <p className="text-gray-700 mb-4">
                We do not sell your personal information. We may share data
                with:
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Service Providers:
                  </h3>
                  <p className="text-gray-700">
                    Third parties like Vercel (hosting) or analytics providers,
                    who process data on our behalf under strict confidentiality
                    agreements.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Legal Requirements:
                  </h3>
                  <p className="text-gray-700">
                    If required by law, we may disclose your information to
                    authorities or in response to legal processes.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                4. Data Storage and Security
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Storage:
                  </h3>
                  <p className="text-gray-700">
                    Your data is stored on secure servers hosted by Vercel in
                    the United States. Quiz data may be stored locally in your
                    browser for offline functionality.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Security:
                  </h3>
                  <p className="text-gray-700">
                    We implement reasonable security measures, such as
                    encryption and access controls, to protect your data.
                    However, no system is completely secure, and we cannot
                    guarantee absolute security.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Retention:
                  </h3>
                  <p className="text-gray-700">
                    We retain personal information only as long as necessary to
                    fulfill the purposes outlined in this policy or as required
                    by law.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                5. Your Rights
              </h2>
              <p className="text-gray-700 mb-4">
                Depending on your location (e.g., EU under GDPR or California
                under CCPA), you may have rights to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
                <li>Access, correct, or delete your personal information.</li>
                <li>Opt out of cookies or targeted analytics.</li>
                <li>Request data portability.</li>
              </ul>
              <p className="text-gray-700">
                To exercise these rights, contact us at{" "}
                <a
                  href="mailto:support@lahan-dev-quiz-app.com"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  support@lahan-dev-quiz-app.com
                </a>
                .
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                6. Third-Party Services
              </h2>
              <p className="text-gray-700">
                The App uses third-party services (e.g., Vercel, Google
                Analytics, or authentication providers). These services may
                collect data as described in their privacy policies, which we
                encourage you to review.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                7. Children&apos;s Privacy
              </h2>
              <p className="text-gray-700">
                The App is not intended for children under 13. We do not
                knowingly collect personal information from children under 13.
                If we learn such data has been collected, we will delete it
                promptly.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                8. International Users
              </h2>
              <p className="text-gray-700">
                The App is hosted in the United States. If you access it from
                outside the U.S., your data may be transferred to and processed
                in the U.S., where data protection laws may differ.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                9. Changes to This Policy
              </h2>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. We will
                notify you of significant changes by posting the updated policy
                on the App or via email (if provided).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                10. Contact Us
              </h2>
              <p className="text-gray-700">
                For questions or concerns about this Privacy Policy, contact us
                at{" "}
                <a
                  href="mailto:support@lahan-dev-quiz-app.com"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  support@lahan-dev-quiz-app.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
