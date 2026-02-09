import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="px-6 md:px-20 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-semibold mb-4">Industries</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <a href="/industries/healthcare-life-sciences" className="block hover:text-white">Healthcare & Life Sciences</a>
              <a href="/industries/financial-services" className="block hover:text-white">Financial Services</a>
              <a href="/industries" className="block hover:text-white">View All Industries →</a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <a href="/services/digital-transformation" className="block hover:text-white">Digital Transformation</a>
              <a href="/digital" className="block hover:text-white">Digital & AI</a>
              <a href="/services" className="block hover:text-white">View All Services →</a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <a href="/about" className="block hover:text-white">About Us</a>
              <a href="/careers" className="block hover:text-white">Careers</a>
              <a href="/offices" className="block hover:text-white">Offices</a>
              <a href="/media" className="block hover:text-white">Media Center</a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Stay Connected</h4>
            <p className="text-sm text-gray-400 mb-4">Get the latest insights delivered to your inbox</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="flex items-center gap-2 mb-8">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <span className="text-sm font-semibold tracking-wider">JAS.COM</span>
        </div>

        <div className="flex gap-4 mb-8">
          <a href="#" className="text-gray-400 hover:text-white">in</a>
          <a href="#" className="text-gray-400 hover:text-white">𝕏</a>
          <a href="#" className="text-gray-400 hover:text-white">f</a>
          <a href="#" className="text-gray-400 hover:text-white">📷</a>
          <a href="#" className="text-gray-400 hover:text-white">▶</a>
        </div>

        <div className="flex flex-wrap gap-6 text-xs text-gray-400 mb-8">
          <a href="/contact" className="hover:text-white">Contact us</a>
          <a href="/about" className="hover:text-white">Sustainability</a>
          <a href="/about" className="hover:text-white">Accessibility</a>
          <a href="/about" className="hover:text-white">Terms of use</a>
          <a href="/about" className="hover:text-white">Privacy</a>
          <a href="/admin" className="hover:text-white">Admin</a>
        </div>

        <p className="text-xs text-gray-500">© 2025 JAS.COM Consulting, Inc.</p>
      </div>
    </footer>
  );
}
