'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { ChevronLeft, EllipsisVertical, LayoutDashboard, Settings, Timer, Users } from 'lucide-react';
import Head from 'next/head';
import React, { useState } from 'react';

import { Button } from '../ui/button';

// Define tab type
type Tab = {
  id: string;
  label: string;
  Icon: React.ReactNode;
};

// Define tabs outside the component
const tabs: Tab[] = [
  { id: 'TimeTracking', label: 'Time Tracking', Icon: <Timer /> },
  { id: 'Dashboard', label: 'Dashboard', Icon: <LayoutDashboard /> },
  { id: 'Setting', label: 'Setting', Icon: <Settings /> },
  { id: 'Participants', label: 'Participants', Icon: <Users /> },
];

export function RaceTab() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <>
      <Head>
        <title>Race</title>
      </Head>
      <div className='flex flex-col'>
        <Header />
        <TabNavigation tabs={tabs.slice(-2)} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </>
  );
}

function Header() {
  return (
    <nav className='flex items-center justify-between p-4 border-b border-gray-300'>
      <div className='flex items-center'>
        <BackButton />
        <h1 className='text-xl font-semibold ml-4'>Race</h1>
      </div>
      <MoreButton />
    </nav>
  );
}

function BackButton() {
  return (
    <button className='text-2xl'>
      <a href='/races'>
        <ChevronLeft />
      </a>
    </button>
  );
}

function MoreButton() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className='p-2'>
          <EllipsisVertical className='h-6 w-6' />
        </button>
      </PopoverTrigger>
      <PopoverContent className='border border-gray-300 bg-white rounded-md -translate-x-2'>
        <div className='p-4'>
          {tabs.slice(-2).map((tab) => (
            <Button
              variant='secondary'
              key={tab.id}
              className='flex items-center w-full text-left p-2 hover:bg-gray-100'
            >
              {tab.Icon}
              <p className='m-2'>{tab.label}</p>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

type TabNavigationProps = {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (id: string) => void;
};

function TabNavigation({ tabs, activeTab, setActiveTab }: TabNavigationProps) {
  return (
    <div className='border-b border-gray-300 overflow-x-auto scrollbar-hide w-screen'>
      <div className='grid grid-cols-2'>
        {tabs.map((tab) => (
          <TabButton key={tab.id} tab={tab} isActive={activeTab === tab.id} onClick={() => setActiveTab(tab.id)} />
        ))}
      </div>
    </div>
  );
}

type TabButtonProps = {
  tab: Tab;
  isActive: boolean;
  onClick: () => void;
};

function TabButton({ tab, isActive, onClick }: TabButtonProps) {
  return (
    <button
      className={`flex-shrink-0 text-center py-3 ${
        isActive ? 'text-blue-800 border-b-2 border-blue-600 bg-blue-200' : 'text-gray-500'
      }`}
      onClick={onClick}
    >
      <div className='place-items-center grid grid-col-2 gap-1'>
        {tab.Icon}
        {tab.label}
      </div>
    </button>
  );
}
