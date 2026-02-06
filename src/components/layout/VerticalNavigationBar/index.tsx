import { Suspense } from 'react';

import FallbackLoading from '@/components/FallbackLoading';
import LogoBox from '@/components/LogoBox';

import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient';
import { getMenuItems } from '@/helpers/menu';
import AppMenu from './components/AppMenu';
import { useAuthContext } from '@/context/useAuthContext';

const VerticalNavigationBar = () => {
  const { user } = useAuthContext();
  const role = user?.role;
  let menuItems = getMenuItems();

  if (role === 'STORE') {
    menuItems = menuItems.filter((item) => item.key === 'Rx Orders');
  } else if (role === 'ADMIN') {
    menuItems = menuItems.filter((item) => item.key !== 'Rx Orders' && item.key !== 'Delivery');
  } else if (role === 'DELIVERY') {
    menuItems = menuItems.filter((item) => item.key === 'Delivery');
  }

  return (
    <div className="startbar d-print-none">
      <div className="brand">
        <LogoBox />
      </div>
      <div className="startbar-menu">
        <SimplebarReactClient className="startbar-collapse" id="startbarCollapse">
          <div className="d-flex align-items-start flex-column w-100">
            <Suspense fallback={<FallbackLoading />}>
              <AppMenu menuItems={menuItems} />
            </Suspense>
          </div>
        </SimplebarReactClient>
      </div>
    </div>
  );
};

export default VerticalNavigationBar;
