import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-gray-400">Subscribe to our newsletter for the latest insights, case studies, and exclusive resources</p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Company */}
          <div>
            <h4 className="font-bold mb-4 text-white">Company</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <a href="/about" className="block hover:text-white transition">About Us</a>
              <a href="/about#mission" className="block hover:text-white transition">Mission & Vision</a>
              <a href="/about#team" className="block hover:text-white transition">Our Team</a>
              <a href="/careers" className="block hover:text-white transition">Careers</a>
              <a href="/about#partners" className="block hover:text-white transition">Partners</a>
              <a href="/contact" className="block hover:text-white transition">Contact</a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-bold mb-4 text-white">Solutions</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <a href="/solutions" className="block hover:text-white transition">All Solutions</a>
              <a href="/solutions#consulting" className="block hover:text-white transition">Consulting Services</a>
              <a href="/solutions#iot" className="block hover:text-white transition">IoT Platform</a>
              <a href="/solutions#smart-factory" className="block hover:text-white transition">Smart Factory</a>
              <a href="/solutions#renewable" className="block hover:text-white transition">Renewable Energy</a>
              <a href="/solutions#financial" className="block hover:text-white transition">Financial Advisory</a>
            </div>
          </div>

          {/* Industries */}
          <div>
            <h4 className="font-bold mb-4 text-white">Industries</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <a href="/industries" className="block hover:text-white transition">All Industries</a>
              <a href="/industries/manufacturing" className="block hover:text-white transition">Manufacturing</a>
              <a href="/industries/healthcare" className="block hover:text-white transition">Healthcare</a>
              <a href="/industries/hospitality" className="block hover:text-white transition">Hospitality</a>
              <a href="/industries/it-services" className="block hover:text-white transition">IT Services</a>
              <a href="/industries/financial-services" className="block hover:text-white transition">Financial Services</a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold mb-4 text-white">Resources</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <a href="/insights" className="block hover:text-white transition">Insights & Blog</a>
              <a href="/case-studies" className="block hover:text-white transition">Case Studies</a>
              <a href="/store" className="block hover:text-white transition">Store</a>
              <a href="/community" className="block hover:text-white transition">Community Hub</a>
              <a href="/community#whitepapers" className="block hover:text-white transition">Whitepapers</a>
              <a href="/community#events" className="block hover:text-white transition">Events & Webinars</a>
              <a href="/experts" className="block hover:text-white transition">Expert Network</a>
            </div>
          </div>

          {/* Training & Legal */}
          <div>
            <h4 className="font-bold mb-4 text-white">Training & Legal</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <a href="/training" className="block hover:text-white transition">Training Programs</a>
              <a href="/training#web-dev" className="block hover:text-white transition">Web Development</a>
              <a href="/training#japanese" className="block hover:text-white transition">Japanese Language</a>
              <a href="/offices" className="block hover:text-white transition">Global Offices</a>
              <div className="pt-2 border-t border-gray-800 mt-2">
                <a href="/privacy" className="block hover:text-white transition">Privacy Policy</a>
                <a href="/terms" className="block hover:text-white transition">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <img 
                src="/jascomelogo.png" 
                alt="JAS.COME Logo" 
                className="h-20 sm:h-24 w-auto mb-4"
              />
              <p className="text-xs text-gray-500">© 2026 JAS.COME Co., Ltd. All rights reserved.</p>
              <p className="text-xs text-gray-600">Registered in Japan | Capital: 3 million yen</p>
            </div>

            {/* Social Media */}
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
