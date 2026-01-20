export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="px-6 md:px-20 py-12">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="text-xl mb-4">
              Stay ahead in a rapidly changing world. Subscribe to Templete Insights, our monthly look at the critical issues facing global businesses.
            </h3>
          </div>
          
          <div>
            <div className="flex gap-4 mb-4">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 bg-gray-800 px-4 py-3 text-white rounded"
              />
              <button className="bg-primary px-8 py-3 font-semibold hover:bg-red-700 transition">
                SUBSCRIBE
              </button>
            </div>
            <label className="flex items-start gap-2 text-xs text-gray-400">
              <input type="checkbox" className="mt-1" />
              <span>I have read and accept Templete's Privacy Policy</span>
            </label>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-8">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <span className="text-sm font-semibold tracking-wider">TEMPLETE</span>
        </div>

        <div className="flex gap-4 mb-8">
          <a href="#" className="text-gray-400 hover:text-white">in</a>
          <a href="#" className="text-gray-400 hover:text-white">𝕏</a>
          <a href="#" className="text-gray-400 hover:text-white">f</a>
          <a href="#" className="text-gray-400 hover:text-white">📷</a>
          <a href="#" className="text-gray-400 hover:text-white">▶</a>
        </div>

        <div className="flex flex-wrap gap-6 text-xs text-gray-400 mb-8">
          <a href="#" className="hover:text-white">Contact us</a>
          <a href="#" className="hover:text-white">Sustainability</a>
          <a href="#" className="hover:text-white">Accessibility</a>
          <a href="#" className="hover:text-white">Terms of use</a>
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Modern Slavery Act Statement</a>
          <a href="#" className="hover:text-white">Cookie Policy</a>
          <a href="#" className="hover:text-white">Sitemap</a>
          <a href="#" className="hover:text-white">Log In</a>
        </div>

        <p className="text-xs text-gray-500">© 2025 Templete, Inc.</p>
      </div>
    </footer>
  );
}
