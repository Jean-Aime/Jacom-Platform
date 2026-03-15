import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MegaMenuHeader />
      
      <section className="pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Terms of Service</h1>
            <p className="text-gray-600 text-lg">Last updated: March 15, 2026</p>
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
            <div className="space-y-10">
              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">1. Acceptance of Terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  By accessing and using JACOM's services, you accept and agree to be bound by the terms and 
                  provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">2. Use License</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Permission is granted to temporarily access the materials (information or software) on JACOM's 
                  platform for personal, non-commercial transitory viewing only. This is the grant of a license, 
                  not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to decompile or reverse engineer any software contained on the platform</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                  <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">3. Services Description</h2>
                <p className="text-gray-600 leading-relaxed">
                  JACOM provides strategic consulting, technical solutions, training programs, and financial advisory 
                  services. We reserve the right to modify, suspend, or discontinue any aspect of our services at any 
                  time without prior notice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">4. User Accounts</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  When you create an account with us, you must provide accurate, complete, and current information. 
                  Failure to do so constitutes a breach of the Terms, which may result in immediate termination of 
                  your account.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  You are responsible for safeguarding the password and for all activities that occur under your account. 
                  You agree to notify us immediately of any unauthorized use of your account.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">5. Intellectual Property</h2>
                <p className="text-gray-600 leading-relaxed">
                  The service and its original content, features, and functionality are and will remain the exclusive 
                  property of JACOM and its licensors. The service is protected by copyright, trademark, and other laws 
                  of both Rwanda and foreign countries. Our trademarks may not be used in connection with any product 
                  or service without the prior written consent of JACOM.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">6. Payment Terms</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  For paid services:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Payment is due upon receipt of invoice unless otherwise agreed in writing</li>
                  <li>All fees are non-refundable unless explicitly stated otherwise</li>
                  <li>We reserve the right to change our fees at any time with 30 days notice</li>
                  <li>Failure to pay may result in suspension or termination of services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">7. Confidentiality</h2>
                <p className="text-gray-600 leading-relaxed">
                  Both parties agree to maintain the confidentiality of any proprietary information received during 
                  the course of our business relationship. This obligation shall survive the termination of services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">8. Limitation of Liability</h2>
                <p className="text-gray-600 leading-relaxed">
                  In no event shall JACOM, nor its directors, employees, partners, agents, suppliers, or affiliates, 
                  be liable for any indirect, incidental, special, consequential, or punitive damages, including without 
                  limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your 
                  access to or use of or inability to access or use the service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">9. Disclaimer</h2>
                <p className="text-gray-600 leading-relaxed">
                  Your use of the service is at your sole risk. The service is provided on an "AS IS" and "AS AVAILABLE" 
                  basis. The service is provided without warranties of any kind, whether express or implied, including, 
                  but not limited to, implied warranties of merchantability, fitness for a particular purpose, 
                  non-infringement, or course of performance.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">10. Governing Law</h2>
                <p className="text-gray-600 leading-relaxed">
                  These Terms shall be governed and construed in accordance with the laws of Rwanda, without regard 
                  to its conflict of law provisions. Any disputes arising from these terms shall be resolved in the 
                  courts of Kigali, Rwanda.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">11. Changes to Terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  We reserve the right to modify or replace these Terms at any time at our sole discretion. If a 
                  revision is material, we will provide at least 30 days notice prior to any new terms taking effect. 
                  What constitutes a material change will be determined at our sole discretion.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">12. Contact Information</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  If you have any questions about these Terms, please contact us:
                </p>
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <div className="space-y-2">
                    <p className="text-gray-900 font-semibold">JACOM International</p>
                    <p className="text-gray-600">Email: jacomeorg@gmail.com</p>
                    <p className="text-gray-600">Phone: +250 792 895 343</p>
                    <p className="text-gray-600">Address: Kigali City, Rwanda</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
