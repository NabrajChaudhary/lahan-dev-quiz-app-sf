export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg p-8 md:p-12">
          <h1 className="text-3xl text-center font-bold text-gray-900 mb-10">
            Terms of Service
          </h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 mb-6">
              Welcome to the Lahan Dev Quiz App (&quot;the App&quot;). By
              accessing or using the App, you agree to be bound by these Terms
              of Service (&quot;Terms&quot;). If you do not agree, please do not
              use the App.
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700">
                By using the App, you agree to comply with these Terms and any
                applicable laws. We may update these Terms from time to time,
                and your continued use constitutes acceptance of the updated
                Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                2. Use of the App
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Eligibility:
                  </h3>
                  <p className="text-gray-700">
                    You must be at least 13 years old to use the App. If you are
                    under 18, you must have parental consent.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Permitted Use:
                  </h3>
                  <p className="text-gray-700">
                    The App is designed for taking developer-focused quizzes.
                    You may not use the App for any illegal, harmful, or
                    unauthorized purposes, including hacking, data scraping, or
                    distributing malicious content.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    User Content:
                  </h3>
                  <p className="text-gray-700">
                    If you submit quiz questions, answers, or other content, you
                    grant us a non-exclusive, royalty-free license to use,
                    display, and distribute that content within the App.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Prohibited Actions:
                  </h3>
                  <p className="text-gray-700">
                    You may not reverse-engineer, decompile, or attempt to
                    access the App&apos;s source code, interfere with its
                    functionality, or use it to violate any third-party rights.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                3. Intellectual Property
              </h2>
              <p className="text-gray-700">
                All content, including quizzes, text, graphics, and code, is
                owned by Lahan Dev Quiz App or its licensors and is protected by
                copyright and other intellectual property laws. You may not
                copy, modify, or distribute any content without prior written
                permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                4. Account Responsibilities
              </h2>
              <p className="text-gray-700 mb-4">
                If the App requires an account:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  You are responsible for maintaining the confidentiality of
                  your login credentials.
                </li>
                <li>
                  You must notify us immediately of any unauthorized use of your
                  account.
                </li>
                <li>
                  We reserve the right to suspend or terminate accounts for
                  violations of these Terms.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                5. Third-Party Services
              </h2>
              <p className="text-gray-700">
                The App is hosted on Vercel and may integrate third-party
                services (e.g., authentication or analytics providers). These
                services have their own terms and privacy policies, which you
                should review.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                6. Limitation of Liability
              </h2>
              <p className="text-gray-700">
                The App is provided &quot;as is&quot; without warranties of any
                kind. We are not liable for any damages arising from your use of
                the App, including but not limited to data loss, technical
                issues, or inaccurate quiz content. To the fullest extent
                permitted by law, our liability is limited to $100.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                7. Termination
              </h2>
              <p className="text-gray-700">
                We may suspend or terminate your access to the App at our
                discretion, with or without notice, for violations of these
                Terms or for any other reason.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                8. Governing Law
              </h2>
              <p className="text-gray-700">
                These Terms are governed by the laws of the State of California,
                USA, without regard to conflict of law principles. Any disputes
                will be resolved in the courts of San Francisco, California.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                9. Contact Us
              </h2>
              <p className="text-gray-700">
                For questions about these Terms, contact us at{" "}
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
