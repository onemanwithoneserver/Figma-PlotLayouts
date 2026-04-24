import React from 'react';
import LandscapeOutlinedIcon from '@mui/icons-material/LandscapeOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import ArchitectureOutlinedIcon from '@mui/icons-material/ArchitectureOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import RouteOutlinedIcon from '@mui/icons-material/RouteOutlined';
import AddRoadOutlinedIcon from '@mui/icons-material/AddRoadOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';

export type OverviewItem = {
  id: string;
  label: string;
  value: string;
  icon: React.ReactNode; 
};

export const overviewData: OverviewItem[] = [
  { id: '1', label: 'Inventory Type', value: 'Open Plots', icon: <LandscapeOutlinedIcon fontSize="inherit" /> },
  { id: '2', label: 'Approvals', value: 'HMDA / LPA', icon: <AssignmentTurnedInOutlinedIcon fontSize="inherit" /> },
  { id: '3', label: 'Mandal', value: 'Chevella', icon: <BusinessOutlinedIcon fontSize="inherit" /> },
  { id: '4', label: 'District', value: 'Rangareddy', icon: <MapOutlinedIcon fontSize="inherit" /> },
  { id: '5', label: 'Land Zoning', value: 'Residential', icon: <HomeWorkOutlinedIcon fontSize="inherit" /> },
  { id: '6', label: 'Plot Sizes', value: '100-240 Sq.Yd', icon: <ArchitectureOutlinedIcon fontSize="inherit" /> },
  { id: '7', label: 'Unit Facing', value: 'North & East', icon: <ExploreOutlinedIcon fontSize="inherit" /> },
  { id: '8', label: 'Density', value: 'Low – 312 Plots', icon: <GroupsOutlinedIcon fontSize="inherit" /> },
  { id: '9', label: 'Clubhouse', value: 'Yes – 2,400 Sq.Yd', icon: <CottageOutlinedIcon fontSize="inherit" /> },
  { id: '10', label: 'ORR', value: '4.5 km', icon: <RouteOutlinedIcon fontSize="inherit" /> },
  { id: '11', label: 'RRR', value: '18 km', icon: <RouteOutlinedIcon fontSize="inherit" /> },
  { id: '12', label: 'Highway', value: 'NH-163 – 2 km', icon: <AddRoadOutlinedIcon fontSize="inherit" /> },
  { id: '13', label: 'Roads Width', value: '30 ft / 20 ft', icon: <AddRoadOutlinedIcon fontSize="inherit" /> },
  { id: '14', label: 'Loan Facility', value: 'SBI, HDFC, ICICI', icon: <AccountBalanceOutlinedIcon fontSize="inherit" /> },
];

export const OVERVIEW_INITIAL_COUNT = 6;