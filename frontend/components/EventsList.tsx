"use client";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  description?: string;
  image?: string;
  registerUrl?: string;
}

export default function EventsList() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    apiClient.getEvents()
      .then((data: any) => setEvents(data.filter((e: any) => e.status === 'published').slice(0, 2)))
      .catch(err => console.error(err));
  }, []);

  if (events.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Upcoming Webinars & Virtual Events</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event) => {
            const eventDate = new Date(event.date);
            return (
              <div key={event.id} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                {event.image && (
                  <div className="h-48 overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex gap-6 p-6">
                  <div className="flex-shrink-0 w-20 h-20 bg-blue-600 text-white rounded-lg flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold">{eventDate.getDate()}</div>
                    <div className="text-xs uppercase">{eventDate.toLocaleString('en', { month: 'short' }).toUpperCase()}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{event.time}</p>
                    {event.description && <p className="text-sm text-gray-600 mb-3">{event.description}</p>}
                    <a href={event.registerUrl || '#'} className="text-blue-600 text-sm font-semibold hover:underline">
                      Register Now →
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
