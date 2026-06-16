import { lazy, Suspense } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Layout } from "@/components/layout/layout"
import { ErrorBoundary } from "@/components/error-boundary"
import { ScrollToTop } from "@/components/scroll-to-top"
import { CookieConsent } from "@/components/cookie-consent"
import { RequireAuth } from "@/components/auth/require-auth"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"
import { usePageTransitions } from "@/hooks/use-page-transitions"
import { usePerformanceOptimization } from "@/hooks/use-performance-optimization"
import { HomePage } from "@/pages/home"

// Public pages — split per route so the first paint ships only the home page
const AboutPage = lazy(() => import("@/pages/about").then(m => ({ default: m.AboutPage })))
const PortfolioPage = lazy(() => import("@/pages/portfolio").then(m => ({ default: m.PortfolioPage })))
const PricingPage = lazy(() => import("@/pages/pricing").then(m => ({ default: m.PricingPage })))
const ContactPage = lazy(() => import("@/pages/contact").then(m => ({ default: m.ContactPage })))
const TermsPage = lazy(() => import("@/pages/terms").then(m => ({ default: m.TermsPage })))
const PrivacyPage = lazy(() => import("@/pages/privacy").then(m => ({ default: m.PrivacyPage })))

// Case studies
const DivinePage = lazy(() => import("@/pages/divine").then(m => ({ default: m.DivinePage })))
const RuethisPage = lazy(() => import("@/pages/ruethis").then(m => ({ default: m.RuethisPage })))
const XmetPage = lazy(() => import("@/pages/xmet").then(m => ({ default: m.XmetPage })))
const CarminaPage = lazy(() => import("@/pages/carmina").then(m => ({ default: m.CarminaPage })))
const BisericaPage = lazy(() => import("@/pages/biserica").then(m => ({ default: m.BisericaPage })))
const SelectrikPage = lazy(() => import("@/pages/selectrik").then(m => ({ default: m.SelectrikPage })))
const AloraBrightPage = lazy(() => import("@/pages/alora-bright").then(m => ({ default: m.AloraBrightPage })))
const AlphaPixelsPage = lazy(() => import("@/pages/alpha-pixels").then(m => ({ default: m.AlphaPixelsPage })))
const CeasPlanningPage = lazy(() => import("@/pages/ceas-planning").then(m => ({ default: m.CeasPlanningPage })))
const GarmediPage = lazy(() => import("@/pages/garmedi").then(m => ({ default: m.GarmediPage })))
const IhopPage = lazy(() => import("@/pages/ihop").then(m => ({ default: m.IhopPage })))
const ImbromaniaPage = lazy(() => import("@/pages/imbromania").then(m => ({ default: m.ImbromaniaPage })))
const LiceulBaptistPage = lazy(() => import("@/pages/liceul-baptist").then(m => ({ default: m.LiceulBaptistPage })))
const LucasAmeliePage = lazy(() => import("@/pages/lucas-amelie").then(m => ({ default: m.LucasAmeliePage })))
const TermotalPage = lazy(() => import("@/pages/termotal").then(m => ({ default: m.TermotalPage })))
const CalulAlbPage = lazy(() => import("@/pages/calul-alb").then(m => ({ default: m.CalulAlbPage })))

// Auth
const LoginPage = lazy(() => import("@/pages/login").then(m => ({ default: m.LoginPage })))
const AdminLoginPage = lazy(() => import("@/pages/admin/login").then(m => ({ default: m.AdminLoginPage })))
const AcceptInvitePage = lazy(() => import("@/pages/accept-invite").then(m => ({ default: m.AcceptInvitePage })))

// Dashboards — never part of the public bundle
const DashboardLayout = lazy(() => import("@/components/dashboard/dashboard-layout").then(m => ({ default: m.DashboardLayout })))
const DashboardOverviewPage = lazy(() => import("@/pages/dashboard/overview").then(m => ({ default: m.DashboardOverviewPage })))
const DashboardMySitePage = lazy(() => import("@/pages/dashboard/my-site").then(m => ({ default: m.DashboardMySitePage })))
const DashboardContractsPage = lazy(() => import("@/pages/dashboard/contracts").then(m => ({ default: m.DashboardContractsPage })))
const DashboardContractSignPage = lazy(() => import("@/pages/dashboard/contract-sign").then(m => ({ default: m.DashboardContractSignPage })))
const DashboardPackagesPage = lazy(() => import("@/pages/dashboard/packages").then(m => ({ default: m.DashboardPackagesPage })))
const DashboardSupportPage = lazy(() => import("@/pages/dashboard/support").then(m => ({ default: m.DashboardSupportPage })))
const DashboardProgressPage = lazy(() => import("@/pages/dashboard/progress").then(m => ({ default: m.DashboardProgressPage })))
const AdminOverviewPage = lazy(() => import("@/pages/admin/overview").then(m => ({ default: m.AdminOverviewPage })))
const AdminClientsPage = lazy(() => import("@/pages/admin/clients").then(m => ({ default: m.AdminClientsPage })))
const AdminClientDetailPage = lazy(() => import("@/pages/admin/client-detail").then(m => ({ default: m.AdminClientDetailPage })))
const AdminPackagesManagePage = lazy(() => import("@/pages/admin/packages-manage").then(m => ({ default: m.AdminPackagesManagePage })))
const AdminContractsManagePage = lazy(() => import("@/pages/admin/contracts-manage").then(m => ({ default: m.AdminContractsManagePage })))
const AdminContractTemplatesPage = lazy(() => import("@/pages/admin/contract-templates").then(m => ({ default: m.AdminContractTemplatesPage })))
const AdminSitesManagePage = lazy(() => import("@/pages/admin/sites-manage").then(m => ({ default: m.AdminSitesManagePage })))
const AdminFeedbackPage = lazy(() => import("@/pages/admin/feedback").then(m => ({ default: m.AdminFeedbackPage })))
const AdminActivityPage = lazy(() => import("@/pages/admin/activity").then(m => ({ default: m.AdminActivityPage })))

function RouteFallback() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center" aria-busy="true">
      <div className="h-8 w-8 rounded-full border-2 border-primary-500/30 border-t-primary-500 animate-spin" />
    </div>
  )
}

function AppContent() {
  useSmoothScroll()
  usePageTransitions()
  usePerformanceOptimization()

  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        {/* Public site */}
        <Route element={<Layout backgroundVariant="hero" />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route element={<Layout backgroundVariant="edge" />}>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/divine" element={<DivinePage />} />
          <Route path="/ruethis" element={<RuethisPage />} />
          <Route path="/xmet" element={<XmetPage />} />
          <Route path="/carmina" element={<CarminaPage />} />
          <Route path="/biserica" element={<BisericaPage />} />
          <Route path="/selectrik" element={<SelectrikPage />} />
          <Route path="/alora-bright" element={<AloraBrightPage />} />
          <Route path="/alpha-pixels" element={<AlphaPixelsPage />} />
          <Route path="/ceas-planning" element={<CeasPlanningPage />} />
          <Route path="/garmedi" element={<GarmediPage />} />
          <Route path="/ihop" element={<IhopPage />} />
          <Route path="/imbromania" element={<ImbromaniaPage />} />
          <Route path="/liceul-baptist" element={<LiceulBaptistPage />} />
          <Route path="/lucas-amelie" element={<LucasAmeliePage />} />
          <Route path="/termotal" element={<TermotalPage />} />
          <Route path="/calul-alb" element={<CalulAlbPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Route>

        {/* Auth pages - no layout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/accept-invite" element={<AcceptInvitePage />} />

        {/* Client dashboard */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth role="client">
              <DashboardLayout role="client" />
            </RequireAuth>
          }
        >
          <Route index element={<DashboardOverviewPage />} />
          <Route path="my-site" element={<DashboardMySitePage />} />
          <Route path="progress" element={<DashboardProgressPage />} />
          <Route path="contracts" element={<DashboardContractsPage />} />
          <Route path="contracts/:id/sign" element={<DashboardContractSignPage />} />
          <Route path="packages" element={<DashboardPackagesPage />} />
          <Route path="support" element={<DashboardSupportPage />} />
        </Route>

        {/* Admin dashboard */}
        <Route
          path="/admin"
          element={
            <RequireAuth role="admin">
              <DashboardLayout role="admin" />
            </RequireAuth>
          }
        >
          <Route index element={<AdminOverviewPage />} />
          <Route path="clients" element={<AdminClientsPage />} />
          <Route path="clients/:id" element={<AdminClientDetailPage />} />
          <Route path="packages" element={<AdminPackagesManagePage />} />
          <Route path="contracts" element={<AdminContractsManagePage />} />
          <Route path="contracts/templates" element={<AdminContractTemplatesPage />} />
          <Route path="sites" element={<AdminSitesManagePage />} />
          <Route path="feedback" element={<AdminFeedbackPage />} />
          <Route path="activity" element={<AdminActivityPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <CookieConsent />
        <AppContent />
      </Router>
    </ErrorBoundary>
  )
}

export default App
