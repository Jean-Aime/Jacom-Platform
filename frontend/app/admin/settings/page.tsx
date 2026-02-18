"use client";

export default function SettingsPage() {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto w-full bg-white min-h-screen">
      <div className="flex justify-between items-end border-b border-gray-200  pb-6">
        <div>
          <h2 className="text-3xl font-black tracking-tight ">System Settings</h2>
          <p className="text-gray-500">Manage global configurations and staff permissions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white  rounded-xl border border-gray-200  p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <h3 className="font-bold ">Active Personnel</h3>
          </div>
          <div className="space-y-4">
            {['Abebe Bikila', 'Yuki Tanaka', 'John Smith'].map((name, i) => (
              <div key={i} className="flex items-center justify-between p-3 border border-gray-100  rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200  flex items-center justify-center font-bold text-xs">{name[0]}</div>
                  <p className="text-sm font-semibold ">{name}</p>
                </div>
                <button className="text-xs font-bold text-blue-600">Manage</button>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white  rounded-xl border border-gray-200  p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="font-bold ">Localization</h3>
          </div>
          <div className="space-y-3">
            {['English', 'Japanese', 'Amharic', 'Nepali'].map((lang, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm font-medium ">{lang}</span>
                <label className="relative inline-block w-10 h-5">
                  <input type="checkbox" defaultChecked={i < 2} className="sr-only peer"/>
                  <div className="w-full h-full bg-gray-200  rounded-full peer-checked:bg-blue-600 transition-colors"></div>
                  <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                </label>
              </div>
            ))}
          </div>
        </section>

        <section className="lg:col-span-2 bg-white  rounded-xl border border-gray-200  p-6 shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <h3 className="font-bold ">API Integration Status</h3>
          </div>
          <div className="bg-gray-50  p-5 rounded-xl border border-dashed border-gray-200  flex flex-col justify-center text-center">
            <div className="mb-2">
              <svg className="w-16 h-16 mx-auto text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>
            </div>
            <h4 className="text-sm font-bold ">Active Backend Connection</h4>
            <p className="text-xs text-gray-500 mt-1">PHP REST API running on localhost. Sync frequency: Real-time.</p>
            <div className="mt-4 flex justify-center items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-bold text-green-600 uppercase tracking-widest">Connected</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
