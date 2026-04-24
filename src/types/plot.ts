import type React from 'react';

// ─── Plot sizing ─────────────────────────────────────────────────────────────
export type PlotSize = '100sqyd' | '150sqyd' | '200sqyd' | '240sqyd';

// ─── Progress status ─────────────────────────────────────────────────────────
export type ProgressStatus = 'complete' | 'in-progress' | 'upcoming';

// ─── Approval status ─────────────────────────────────────────────────────────
export type ApprovalStatus = 'approved' | 'pending';

// ─── Amenity categories ──────────────────────────────────────────────────────
export type AmenityCategory = 'infrastructure' | 'green' | 'clubhouse' | 'security';

// ─── Commute categories ──────────────────────────────────────────────────────
export type CommuteCategory = 'school' | 'hospital' | 'shopping' | 'emergency';

// ─── Gallery asset types ─────────────────────────────────────────────────────
export type GalleryAssetType = 'image' | 'drone' | 'interior';

export interface PricingTier {
  size: PlotSize;
  label: string;
  dimensions: string;
  pricePerSqYd: number;
  totalPrice: number;
  available: boolean;
}

export interface ProjectApproval {
  label: string;
  date?: string;
  status: ApprovalStatus;
}

export interface ProjectProgressItem {
  phase: string;
  completion: number;
  status: ProgressStatus;
  approvals: ProjectApproval[];
}

export interface AmenityItem {
  id: string;
  label: string;
  icon?: string;
  category: AmenityCategory;
}

export interface CommutePoint {
  id: string;
  label: string;
  distanceKm: number;
  category: CommuteCategory;
}

export interface GalleryAsset {
  id: string;
  src: string;
  type: GalleryAssetType;
  alt: string;
}

export interface HighlightItem {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
  unit?: string;
}

export interface PropertyDetails {
  id: string;
  name: string;
  location: string;
  city: string;
  reraApproved: boolean;
  heroImage: string;
  startingPrice: number;

  stats: StatItem[];
  highlights: HighlightItem[];
  amenities: AmenityItem[];
  pricingTiers: PricingTier[];
  progress: ProjectProgressItem[];
  gallery: GalleryAsset[];
  commutePoints: CommutePoint[];
}
