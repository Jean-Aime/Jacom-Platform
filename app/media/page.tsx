import { prisma } from "@/lib/prisma";
import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";

export default async function MediaPage() {
  const mediaItems = await prisma.mediaItem.findMany({
    orderBy: { publishedAt: 'desc' }
  });
  
  const featuredItems = mediaItems.filter(m => m.featured);
  const regularItems = mediaItems.filter(m => !m.featured);

  return (
    <div className="min-h-screen">
      <MegaMenuHeader />
      
      <section className="bg-gradient-to-br from-primary/10 to-red-50 py-20 pt-32">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-6">Media Center</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Latest news, press releases, and company announcements from JAS.COM Consulting.
          </p>
        </div>
      </section>

      {featuredItems.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8">Featured News</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredItems.slice(0, 2).map((item) => (
                <article key={item.id} className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-all">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="aspect-video object-cover" />
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-red-100"></div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded uppercase">
                        {item.type}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(item.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.excerpt}</p>
                    <div className="text-primary font-medium hover:underline">
                      Read Full Story →
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8">All Media</h2>
          <div className="space-y-6">
            {regularItems.map((item) => (
              <article key={item.id} className="bg-white border rounded-lg p-6 hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded flex-shrink-0" />
                  ) : (
                    <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-red-100 rounded flex-shrink-0"></div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded uppercase">
                        {item.type}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(item.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{item.excerpt}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Media Contacts</h2>
          <p className="text-xl text-gray-600 mb-8">
            For press inquiries and media requests, please contact our communications team.
          </p>
          <div className="bg-gray-50 p-8 rounded-lg max-w-2xl mx-auto">
            <h3 className="font-semibold mb-2">Media Relations</h3>
            <p className="text-gray-600 mb-4">press@jas.com</p>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
