import AccessLog from '../../../../screens/accessLog/AccessLog';
import Dashboard from '../../../../screens/dashboard/Dashboard';
import ListFacilities from '../../../../screens/superUserFacilities/ListFacilities';
import ListSensors from '../../../../screens/superUserSensors/ListSensors';
import ListUsers from '../../../../screens/superUserUsers/ListUsers';
import ListZones from '../../../../screens/superUserZones/ListZones';
import PageContainer from '../../../PageContainer';
import { AdminStackNavigator } from './AdminStackNavigator';
import { ApprovalsNavigator } from './ApprovalsNavigator';
import { RequestNavigator } from './RequestNavigator';

const ROLES = {
  SUPERVISOR: 'SUPERVISOR',
  REQUESTER: 'REQUESTER',
  SUPERUSER: 'SUPERUSER',
  ADMIN: 'ADMIN',
  IDENTITY: 'IDENTITY',
};

const { SUPERVISOR, REQUESTER, SUPERUSER, ADMIN, IDENTITY } = ROLES;

export const ItemsMenu = [
  {
    obj: 'Dashboard',
    title: 'Home',
    order: 1,
    component: Dashboard,
    icon: 'arrowUp',
    requirement: IDENTITY,
  },
  {
    obj: 'Requests',
    title: 'Requests',
    order: 3,
    component: PageContainer(RequestNavigator, {
      title: 'Requests',
      hasScrollView: false,
      withCircleHeader: false,
      haveMenu: true,
      leftHeader: true,
      margin: 0,
    }),
    icon: 'ic_home',
    requirement: REQUESTER,
  },
  {
    obj: 'Logs',
    title: 'Logs',
    order: 1,
    component: AccessLog,
    icon: 'ic_home',
    requirement: IDENTITY,
  },
  {
    obj: 'Approvals',
    title: 'Approvals',
    order: 3,
    component: PageContainer(ApprovalsNavigator, {
      title: 'Approvals Review',
      hasScrollView: false,
      withCircleHeader: false,
      haveMenu: true,
      leftHeader: true,
      margin: 0,
    }),
    icon: 'ic_home',
    requirement: SUPERVISOR,
  },
  {
    obj: 'Facilities',
    title: 'Facilities',
    order: 4,
    component: ListFacilities,
    icon: 'ic_home',
    requirement: SUPERUSER,
  },
  {
    obj: 'Zones',
    title: 'Zones',
    order: 4,
    icon: 'ic_home',
    component: ListZones,
    requirement: SUPERUSER,
  },
  {
    obj: 'Users',
    title: 'User',
    order: 4,
    icon: 'ic_home',
    component: ListUsers,
    requirement: SUPERUSER,
  },
  {
    obj: 'Sensors',
    title: 'Sensors',
    order: 4,
    icon: 'ic_home',
    component: ListSensors,
    requirement: SUPERUSER,
  },
  {
    obj: 'FacilityOwn',
    title: 'Admin',
    order: 5,
    icon: 'ic_home',
    component: AdminStackNavigator,
    requirement: ADMIN,
  },
];
