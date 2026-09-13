
"use client";
import { useState } from 'react';
import { TopNav } from '@/components/TopNav';
import { HomeTab } from '@/components/Tabs/HomeTab';
import { LiveAppTab } from '@/components/Tabs/LiveAppTab';
import { AboutTab } from '@/components/Tabs/AboutTab';

type Tab = 'home' | 'live' | 'about';

export default function AppShell() {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  return (
    <div className="min-h-screen flex flex-col">
      <TopNav activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-8 sm:py-12">
        {activeTab === 'home' && <HomeTab onNavigate={setActiveTab} />}
        {activeTab === 'live' && <LiveAppTab />}
        {activeTab === 'about' && <AboutTab />}
      </main>
    </div>
  );
}
