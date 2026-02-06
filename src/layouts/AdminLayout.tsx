import type { ChildrenType } from '@/types/component-props'
import { lazy, Suspense } from 'react'
import FallbackLoading from '@/components/FallbackLoading'
import Footer from '@/components/layout/Footer'
import Preloader from '@/components/Preloader'
const VerticalNavigationBar = lazy(() => import('@/components/layout/VerticalNavigationBar'))
const TopNavigationBar = lazy(() => import('@/components/layout/TopNavigationBar'))

const AdminLayout = ({ children }: ChildrenType) => {


  return (
    <>
      <Suspense>
        <TopNavigationBar />
      </Suspense>

      <Suspense fallback={<FallbackLoading />}>
        <VerticalNavigationBar />
      </Suspense>

      <div className="page-wrapper">
        <div className="page-content">
          <div className="container-xxl">
            <Suspense fallback={<Preloader />}>{children}</Suspense>
          </div>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default AdminLayout
