import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="px-6 md:px-20 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-semibold mb-4">Industries</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <a href="/industries/healthcare-life-sciences" className="block hover:text-primary">Healthcare & Life Sciences</a>
              <a href="/industries/financial-services" className="block hover:text-primary">Financial Services</a>
              <a href="/industries" className="block hover:text-primary">View All Industries →</a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <a href="/services/digital-transformation" className="block hover:text-primary">Digital Transformation</a>
              <a href="/digital" className="block hover:text-primary">Digital & AI</a>
              <a href="/services" className="block hover:text-primary">View All Services →</a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <a href="/about" className="block hover:text-primary">About Us</a>
              <a href="/careers" className="block hover:text-primary">Careers</a>
              <a href="/offices" className="block hover:text-primary">Offices</a>
              <a href="/media" className="block hover:text-primary">Media Center</a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Stay Connected</h4>
            <p className="text-sm text-gray-600 mb-4">Get the latest insights delivered to your inbox</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="flex items-center gap-2 mb-8">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <span className="text-sm font-semibold tracking-wider">JAS.COM</span>
        </div>

        <div className="flex gap-4 mb-8">
          <a href="#" className="text-gray-600 hover:text-primary">in</a>
          <a href="#" className="text-gray-600 hover:text-primary">𝕏</a>
          <a href="#" className="text-gray-600 hover:text-primary">f</a>
          <a href="#" className="text-gray-600 hover:text-primary">📷</a>
          <a href="#" className="text-gray-600 hover:text-primary">▶</a>
        </div>

        <div className="flex flex-wrap gap-6 text-xs text-gray-600 mb-8">
          <a href="/contact" className="hover:text-primary">Contact us</a>
          <a href="/about" className="hover:text-primary">Sustainability</a>
          <a href="/about" className="hover:text-primary">Accessibility</a>
          <a href="/about" className="hover:text-primary">Terms of use</a>
          <a href="/about" className="hover:text-primary">Privacy</a>
          <a href="/admin" className="hover:text-primary">Admin</a>
        </div>

        <p className="text-xs text-gray-500">© 2025 JAS.COM Consulting, Inc.</p>
      </div>
    </footer>
  );
}
