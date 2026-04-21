import React from 'react';

export interface PlaceItem {
  id: string;
  name: string;
  distance: string;
  time: string;
  color: string;
  icon: string;
}

export interface TabData {
  title: string;
  color: string;
  footer: string;
  items: PlaceItem[];
}

export interface TabInfo {
  id: string;
  label: string;
  color: string;
}

export const Icons = {
  Hospital: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8M8 12h8"/></svg>,
  Building: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path></svg>,
  School: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>,
  Tree: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 11l7-7 7 7M5 15l7-7 7 7"/></svg>,
  MapPin: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3" fill="white"></circle></svg>,
  ChevronRight: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>,
  ShoppingBag: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 01-8 0"></path></svg>,
};

export const INITIAL_TABS: TabInfo[] = [
  { id: 'education', label: 'Education', color: '#322822' },
  { id: 'emergency', label: 'Emergency', color: '#322822' },
  { id: 'shopping',  label: 'Shopping',  color: '#322822' },
  { id: 'nearby',    label: 'Nearby',    color: '#322822' },
];

export const INITIAL_DATA: Record<string, TabData> = {
  education: {
    title: 'Distances via fastest driving routes.',
    color: '#322822',
    footer: '',
    items: [
      { id: 'e1',  name: 'Ryan International School',   distance: '1.8 km',  time: '5 min',  color: '#E76F26', icon: 'school' },
      { id: 'e2',  name: 'Delhi Public School',         distance: '3.1 km',  time: '9 min',  color: '#E76F26', icon: 'school' },
      { id: 'e3',  name: 'Oakridge International',      distance: '4.5 km',  time: '13 min', color: '#E76F26', icon: 'school' },
      { id: 'e4',  name: 'Chirec Public School',        distance: '5.2 km',  time: '15 min', color: '#E76F26', icon: 'school' },
      { id: 'e5',  name: 'Global Indian International', distance: '6.8 km',  time: '20 min', color: '#E76F26', icon: 'school' },
      { id: 'e6',  name: 'Silver Oaks International',   distance: '7.4 km',  time: '22 min', color: '#E76F26', icon: 'school' },
      { id: 'e7',  name: 'Meridian School',             distance: '4.1 km',  time: '12 min', color: '#E76F26', icon: 'school' },
      { id: 'e8',  name: 'The Gaudium School',          distance: '10.5 km', time: '31 min', color: '#E76F26', icon: 'school' },
      { id: 'e9',  name: 'Pebble Creek Life School',    distance: '2.9 km',  time: '9 min',  color: '#E76F26', icon: 'school' },
      { id: 'e10', name: 'Foster Billabong High',       distance: '5.7 km',  time: '17 min', color: '#E76F26', icon: 'school' },
    ]
  },
  emergency: {
    title: 'Emergency locations are auto-detected.',
    color: '#322822',
    footer: '',
    items: [
      { id: 'em1',  name: 'Apollo Hospital',           distance: '2.3 km',  time: '7 min',  color: '#E76F26', icon: 'hospital' },
      { id: 'em2',  name: 'Continental Hospital',      distance: '4.1 km',  time: '12 min', color: '#E76F26', icon: 'hospital' },
      { id: 'em3',  name: 'Care Hospitals',            distance: '5.8 km',  time: '17 min', color: '#E76F26', icon: 'hospital' },
      { id: 'em4',  name: 'Rainbow Children Hospital', distance: '3.5 km',  time: '10 min', color: '#E76F26', icon: 'hospital' },
      { id: 'em5',  name: 'KIMS Hospitals',            distance: '6.2 km',  time: '19 min', color: '#E76F26', icon: 'hospital' },
      { id: 'em6',  name: 'Sunshine Hospitals',        distance: '8.4 km',  time: '25 min', color: '#E76F26', icon: 'hospital' },
      { id: 'em7',  name: 'Yashoda Hospitals',         distance: '9.1 km',  time: '27 min', color: '#E76F26', icon: 'hospital' },
      { id: 'em8',  name: 'Medicover Hospitals',       distance: '5.5 km',  time: '16 min', color: '#E76F26', icon: 'hospital' },
      { id: 'em9',  name: 'Star Hospitals',            distance: '7.9 km',  time: '23 min', color: '#E76F26', icon: 'hospital' },
      { id: 'em10', name: 'Aster Prime Hospital',      distance: '11.2 km', time: '33 min', color: '#E76F26', icon: 'hospital' },
    ]
  },
  shopping: {
    title: 'Retail centers and grocery hubs.',
    color: '#322822',
    footer: '',
    items: [
      { id: 's1',  name: 'Inorbit Mall',           distance: '6.2 km', time: '19 min', color: '#E76F26', icon: 'building' },
      { id: 's2',  name: 'IKEA Hyderabad',          distance: '5.9 km', time: '18 min', color: '#E76F26', icon: 'building' },
      { id: 's3',  name: 'Sarath City Capital Mall',distance: '7.4 km', time: '22 min', color: '#E76F26', icon: 'building' },
      { id: 's4',  name: 'Forum Sujana Mall',       distance: '9.1 km', time: '27 min', color: '#E76F26', icon: 'building' },
      { id: 's5',  name: 'Reliance Digital',        distance: '2.4 km', time: '7 min',  color: '#E76F26', icon: 'building' },
      { id: 's6',  name: 'Ratnadeep Supermarket',   distance: '1.2 km', time: '4 min',  color: '#E76F26', icon: 'building' },
      { id: 's7',  name: 'Vijetha Supermarket',     distance: '0.8 km', time: '3 min',  color: '#E76F26', icon: 'building' },
      { id: 's8',  name: 'Lidl Premium Retails',    distance: '3.3 km', time: '10 min', color: '#E76F26', icon: 'building' },
      { id: 's9',  name: 'Spar Hypermarket',        distance: '4.7 km', time: '14 min', color: '#E76F26', icon: 'building' },
      { id: 's10', name: 'Spencers Plaza',          distance: '6.1 km', time: '18 min', color: '#E76F26', icon: 'building' },
    ]
  },
  nearby: {
    title: 'Green spaces and recreational areas.',
    color: '#322822',
    footer: '',
    items: [
      { id: 'l1',  name: 'Botanical Garden',         distance: '4.8 km',  time: '14 min', color: '#E76F26', icon: 'tree' },
      { id: 'l2',  name: 'KBR National Park',        distance: '10.2 km', time: '30 min', color: '#E76F26', icon: 'tree' },
      { id: 'l3',  name: 'Durgam Cheruvu Lake Front', distance: '5.5 km', time: '16 min', color: '#E76F26', icon: 'tree' },
      { id: 'l4',  name: 'Golconda Fort',            distance: '14.1 km', time: '41 min', color: '#E76F26', icon: 'building' },
      { id: 'l5',  name: 'Gachibowli Stadium',       distance: '3.9 km',  time: '12 min', color: '#E76F26', icon: 'building' },
      { id: 'l6',  name: 'Pala Pitta Cycling Park',  distance: '2.7 km',  time: '8 min',  color: '#E76F26', icon: 'tree' },
      { id: 'l7',  name: 'Ocean Park Hyderabad',     distance: '11.2 km', time: '33 min', color: '#E76F26', icon: 'building' },
      { id: 'l8',  name: 'Gandipet Lake View',       distance: '12.8 km', time: '37 min', color: '#E76F26', icon: 'tree' },
      { id: 'l9',  name: 'Hussain Sagar Lake',       distance: '15.6 km', time: '45 min', color: '#E76F26', icon: 'tree' },
      { id: 'l10', name: 'Lumbini Park',             distance: '16.2 km', time: '47 min', color: '#E76F26', icon: 'tree' },
    ]
  }
};
