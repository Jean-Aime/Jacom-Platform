"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function HomepageAdmin() {
  const [sections, setSections] = useState<any>({
    hero: {},
    industry: {},
    stories: {},
    video: {},
    insights: {},
    cta: {}
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/content?page=home');
      const data = await res.json();
      const organized: any = { hero: {}, industry: {}, stories: {}, video: {}, insights: {}, cta: {} };
      data.forEach((item: any) => {
        organized[item.section] = organized[item.section] || {};
        organized[item.section][item.key] = item.type === 'json' ? JSON.parse(item.content) : item.content;
        if (item.image) organized[item.section][`${item.key}_image`] = item.image;
        organized[item.section][`${item.key}_id`] = item.id;
      });
      setSections(organized);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching content:', error);
      setLoading(false);
    }
  };

  const handleSave = async (section: string, key: string, value: any, type = 'text') => {
    setSaving(true);
    try {
      const id = sections[section][`${key}_id`];
      const body: any = {
        key,
        page: 'home',
        section,
        type,
        content: type === 'json' ? JSON.stringify(value) : value,
        active: true
      };

      if (id) {
        await fetch(`/api/content?id=${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
      } else {
        await fetch('/api/content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
      }
      await fetchContent();
      alert('Saved successfully!');
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving content');
    }
    setSaving(false);
  };

  const handleImageUpload = async (section: string, key: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default');

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      const imageUrl = data.secure_url;

      const id = sections[section][`${key}_id`];
      await fetch(`/api/content?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageUrl })
      });

      await fetchContent();
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-8 py-4">
        <h1 className="text-2xl font-bold">Homepage Content Manager</h1>
        <p className="text-sm text-gray-600">Edit all homepage sections easily</p>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r min-h-screen p-4">
          <div className="space-y-2">
            {[
              { id: 'hero', label: '🎯 Hero Section', desc: 'Main banner' },
              { id: 'industry', label: '🏭 Industries', desc: 'Industry selector' },
              { id: 'stories', label: '📖 Client Stories', desc: 'Success stories' },
              { id: 'video', label: '🎥 Video Section', desc: 'Video content' },
              { id: 'insights', label: '💡 Insights', desc: 'Latest insights' },
              { id: 'cta', label: '🚀 Call to Action', desc: 'CTA buttons' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full text-left p-3 rounded transition ${
                  activeSection === item.id ? 'bg-blue-50 border-l-4 border-blue-600' : 'hover:bg-gray-50'
                }`}
              >
                <div className="font-semibold text-sm">{item.label}</div>
                <div className="text-xs text-gray-500">{item.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* HERO SECTION */}
          {activeSection === 'hero' && (
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              <h2 className="text-xl font-bold mb-4">🎯 Hero Section</h2>
              
              <div>
                <label className="block text-sm font-semibold mb-2">Main Title</label>
                <input
                  type="text"
                  defaultValue={sections.hero.home_hero_title}
                  onBlur={(e) => handleSave('hero', 'home_hero_title', e.target.value)}
                  className="w-full border rounded px-4 py-2"
                  placeholder="Global Healthcare Private Equity Report 2026"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Background Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleImageUpload('hero', 'home_hero_bg', e.target.files[0])}
                  className="w-full border rounded px-4 py-2"
                />
                {sections.hero.home_hero_bg_image && (
                  <div className="mt-2 relative w-full h-40">
                    <Image src={sections.hero.home_hero_bg_image} alt="Hero bg" fill className="object-cover rounded" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Tab Labels (comma separated)</label>
                <input
                  type="text"
                  defaultValue={sections.hero.home_hero_tabs?.join(', ')}
                  onBlur={(e) => handleSave('hero', 'home_hero_tabs', e.target.value.split(',').map((s: string) => s.trim()), 'json')}
                  className="w-full border rounded px-4 py-2"
                  placeholder="Paper & Packaging, Healthcare, M&A Healthcare"
                />
              </div>
            </div>
          )}

          {/* INDUSTRY SECTION */}
          {activeSection === 'industry' && (
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              <h2 className="text-xl font-bold mb-4">🏭 Industry Section</h2>
              
              <div>
                <label className="block text-sm font-semibold mb-2">Section Title</label>
                <input
                  type="text"
                  defaultValue={sections.industry.industry_title}
                  onBlur={(e) => handleSave('industry', 'industry_title', e.target.value)}
                  className="w-full border rounded px-4 py-2"
                  placeholder="We champion the bold to achieve the extraordinary."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Subtitle</label>
                <input
                  type="text"
                  defaultValue={sections.industry.industry_subtitle}
                  onBlur={(e) => handleSave('industry', 'industry_subtitle', e.target.value)}
                  className="w-full border rounded px-4 py-2"
                  placeholder="Around two questions we help our clients win"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Section Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleImageUpload('industry', 'industry_image', e.target.files[0])}
                  className="w-full border rounded px-4 py-2"
                />
                {sections.industry.industry_image_image && (
                  <div className="mt-2 relative w-full h-40">
                    <Image src={sections.industry.industry_image_image} alt="Industry" fill className="object-cover rounded" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Industry Tags (comma separated)</label>
                <textarea
                  defaultValue={sections.industry.industry_tags?.join(', ')}
                  onBlur={(e) => handleSave('industry', 'industry_tags', e.target.value.split(',').map((s: string) => s.trim()), 'json')}
                  className="w-full border rounded px-4 py-2 h-24"
                  placeholder="Retail, Private Equity, Technology"
                />
              </div>
            </div>
          )}

          {/* STORIES SECTION */}
          {activeSection === 'stories' && (
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              <h2 className="text-xl font-bold mb-4">📖 Client Stories Section</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Section Title</label>
                  <input
                    type="text"
                    defaultValue={sections.stories.stories_title}
                    onBlur={(e) => handleSave('stories', 'stories_title', e.target.value)}
                    className="w-full border rounded px-4 py-2"
                    placeholder="Bold steps forward."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Subtitle</label>
                  <input
                    type="text"
                    defaultValue={sections.stories.stories_subtitle}
                    onBlur={(e) => handleSave('stories', 'stories_subtitle', e.target.value)}
                    className="w-full border rounded px-4 py-2"
                    placeholder="Featured client success story"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Story Title</label>
                <input
                  type="text"
                  defaultValue={sections.stories.story_title}
                  onBlur={(e) => handleSave('stories', 'story_title', e.target.value)}
                  className="w-full border rounded px-4 py-2"
                  placeholder="Banca Investis Transforms Customer Dialogue"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Stat 1 Value</label>
                  <input
                    type="text"
                    defaultValue={sections.stories.story_stat1_value}
                    onBlur={(e) => handleSave('stories', 'story_stat1_value', e.target.value)}
                    className="w-full border rounded px-4 py-2"
                    placeholder="500+"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Stat 1 Text</label>
                  <input
                    type="text"
                    defaultValue={sections.stories.story_stat1_text}
                    onBlur={(e) => handleSave('stories', 'story_stat1_text', e.target.value)}
                    className="w-full border rounded px-4 py-2"
                    placeholder="internal employees using the tool"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Stat 2 Value</label>
                  <input
                    type="text"
                    defaultValue={sections.stories.story_stat2_value}
                    onBlur={(e) => handleSave('stories', 'story_stat2_value', e.target.value)}
                    className="w-full border rounded px-4 py-2"
                    placeholder="7"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Stat 2 Text</label>
                  <input
                    type="text"
                    defaultValue={sections.stories.story_stat2_text}
                    onBlur={(e) => handleSave('stories', 'story_stat2_text', e.target.value)}
                    className="w-full border rounded px-4 py-2"
                    placeholder="months from ideation to launch"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Story Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleImageUpload('stories', 'story_image', e.target.files[0])}
                  className="w-full border rounded px-4 py-2"
                />
                {sections.stories.story_image_image && (
                  <div className="mt-2 relative w-full h-40">
                    <Image src={sections.stories.story_image_image} alt="Story" fill className="object-cover rounded" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Button Text</label>
                <input
                  type="text"
                  defaultValue={sections.stories.stories_button}
                  onBlur={(e) => handleSave('stories', 'stories_button', e.target.value)}
                  className="w-full border rounded px-4 py-2"
                  placeholder="SEE ALL CLIENT RESULTS"
                />
              </div>
            </div>
          )}

          {/* VIDEO SECTION */}
          {activeSection === 'video' && (
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              <h2 className="text-xl font-bold mb-4">🎥 Video Section</h2>
              
              <div>
                <label className="block text-sm font-semibold mb-2">Bubble Text</label>
                <input
                  type="text"
                  defaultValue={sections.video.video_bubble_text}
                  onBlur={(e) => handleSave('video', 'video_bubble_text', e.target.value)}
                  className="w-full border rounded px-4 py-2"
                  placeholder="What 'no regret' actions should CEOs take"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Person Name</label>
                <input
                  type="text"
                  defaultValue={sections.video.video_person_name}
                  onBlur={(e) => handleSave('video', 'video_person_name', e.target.value)}
                  className="w-full border rounded px-4 py-2"
                  placeholder="Chuck Whitten, Global Head of Bain Digital"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Video Title</label>
                <input
                  type="text"
                  defaultValue={sections.video.video_title}
                  onBlur={(e) => handleSave('video', 'video_title', e.target.value)}
                  className="w-full border rounded px-4 py-2"
                  placeholder="How executives can win with AI"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Link Text</label>
                <input
                  type="text"
                  defaultValue={sections.video.video_link_text}
                  onBlur={(e) => handleSave('video', 'video_link_text', e.target.value)}
                  className="w-full border rounded px-4 py-2"
                  placeholder="HEAR HOW WE'RE HELPING TOP COMPANIES"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Video Thumbnail</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleImageUpload('video', 'video_image', e.target.files[0])}
                  className="w-full border rounded px-4 py-2"
                />
                {sections.video.video_image_image && (
                  <div className="mt-2 relative w-full h-40">
                    <Image src={sections.video.video_image_image} alt="Video" fill className="object-cover rounded" />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* INSIGHTS SECTION */}
          {activeSection === 'insights' && (
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              <h2 className="text-xl font-bold mb-4">💡 Insights Section</h2>
              
              <div>
                <label className="block text-sm font-semibold mb-2">Section Title</label>
                <input
                  type="text"
                  defaultValue={sections.insights.insights_title}
                  onBlur={(e) => handleSave('insights', 'insights_title', e.target.value)}
                  className="w-full border rounded px-4 py-2"
                  placeholder="Our Latest Insights"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Button Text</label>
                <input
                  type="text"
                  defaultValue={sections.insights.insights_button}
                  onBlur={(e) => handleSave('insights', 'insights_button', e.target.value)}
                  className="w-full border rounded px-4 py-2"
                  placeholder="SEE ALL INSIGHTS"
                />
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-600 mb-4">Note: Insight cards are managed from the Insights section in the admin panel</p>
              </div>
            </div>
          )}

          {/* CTA SECTION */}
          {activeSection === 'cta' && (
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              <h2 className="text-xl font-bold mb-4">🚀 Call to Action Section</h2>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="border-r pr-6">
                  <h3 className="font-semibold mb-4">Left CTA</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Title</label>
                      <input
                        type="text"
                        defaultValue={sections.cta.cta_title1}
                        onBlur={(e) => handleSave('cta', 'cta_title1', e.target.value)}
                        className="w-full border rounded px-4 py-2"
                        placeholder="What can we help you achieve?"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Button Text</label>
                      <input
                        type="text"
                        defaultValue={sections.cta.cta_button1}
                        onBlur={(e) => handleSave('cta', 'cta_button1', e.target.value)}
                        className="w-full border rounded px-4 py-2"
                        placeholder="LET'S GET STARTED"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Right CTA</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Title</label>
                      <input
                        type="text"
                        defaultValue={sections.cta.cta_title2}
                        onBlur={(e) => handleSave('cta', 'cta_title2', e.target.value)}
                        className="w-full border rounded px-4 py-2"
                        placeholder="Where will your career take you?"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Button Text</label>
                      <input
                        type="text"
                        defaultValue={sections.cta.cta_button2}
                        onBlur={(e) => handleSave('cta', 'cta_button2', e.target.value)}
                        className="w-full border rounded px-4 py-2"
                        placeholder="COME WORK HERE"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preview Button */}
          <div className="mt-6 flex justify-between items-center">
            <a href="/" target="_blank" className="text-blue-600 hover:underline">
              👁️ Preview Homepage
            </a>
            <div className="text-sm text-gray-500">
              Changes are saved automatically when you leave each field
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
