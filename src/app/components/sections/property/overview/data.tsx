import skyscrapperIcon from '../images/popup-images/skyscrapper.png';
import propertyIcon from '../images/popup-images/property.png';
import approvalsIcon from '../images/popup-images/Approvals.png';
import unitFacingIcon from '../images/popup-images/UnitFacing.png';
import blueprint1Icon from '../images/popup-images/blueprint1.png';
import locationIcon from '../images/popup-images/location.png';
import overpopulationIcon from '../images/popup-images/overpopulation.png';
import clubhouseIcon from '../images/popup-images/ClubhouseArea.png';
import orr1Icon from '../images/popup-images/orr1.png';
import rrr1Icon from '../images/popup-images/rrr1.png';
import highway1Icon from '../images/popup-images/highway1.png';
import stackIcon from '../images/popup-images/stack.png';
import roadsWidthIcon from '../images/popup-images/Roads_Width.png';
import loan1Icon from '../images/popup-images/loan1.png';

export interface OverviewItem {
  id: string;
  icon: string;
  label: string;
  value: string;
}

export const overviewData: OverviewItem[] = [
  { id: 'ov-01', icon: propertyIcon,       label: 'Inventory Type', value: 'Open Plots' },
  { id: 'ov-02', icon: approvalsIcon,      label: 'Approvals',      value: 'HMDA / LPA' },
  { id: 'ov-03', icon: locationIcon,       label: 'Mandal',         value: 'Chevella' },
  { id: 'ov-04', icon: locationIcon,       label: 'District',       value: 'Rangareddy' },
  { id: 'ov-05', icon: stackIcon,          label: 'Land Zoning',    value: 'Residential' },
  { id: 'ov-06', icon: blueprint1Icon,     label: 'Plot Sizes',     value: '100–240 Sq.Yd' },
  { id: 'ov-07', icon: unitFacingIcon,     label: 'Unit Facing',    value: 'North & East' },
  { id: 'ov-08', icon: overpopulationIcon, label: 'Density',        value: 'Low – 312 Plots' },
  { id: 'ov-09', icon: clubhouseIcon,      label: 'Clubhouse',      value: 'Yes – 2,400 Sq.Ft' },
  { id: 'ov-10', icon: orr1Icon,           label: 'ORR',            value: '4.5 km' },
  { id: 'ov-11', icon: rrr1Icon,           label: 'RRR',            value: '18 km' },
  { id: 'ov-12', icon: highway1Icon,       label: 'Highway',        value: 'NH-163 – 2 km' },
  { id: 'ov-13', icon: roadsWidthIcon,     label: 'Roads Width',    value: '30 ft / 20 ft' },
  { id: 'ov-14', icon: loan1Icon,          label: 'Loan Facility',  value: 'SBI, HDFC, Axis' },
  { id: 'ov-15', icon: skyscrapperIcon,    label: 'Project Type',   value: 'Residential Plots' },
];

/** Number of items to show before "See all details" */
export const OVERVIEW_INITIAL_COUNT = 6;
