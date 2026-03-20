import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Layout } from "@/components/layout/layout"
import { ErrorBoundary } from "@/components/error-boundary"
import { ScrollToTop } from "@/components/scroll-to-top"
import { CookieConsent } from "@/components/cookie-consent"
import { RequireAuth } from "@/components/auth/require-auth"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"
import { usePageTransitions } from "@/hooks/use-page-transitions"
import { usePerformanceOptimization } from "@/hooks/use-performance-optimization"
import { HomePage } from "@/pages/home"
import { AboutPage } from "@/pages/about"
import { PortfolioPage } from "@/pages/portfolio"
import { PricingPage } from "@/pages/pricing"
import { ContactPage } from "@/pages/contact"
import { LoginPage } from "@/pages/login"
import { AdminLoginPage } from "@/pages/admin/login"
import { AcceptInvitePage } from "@/pages/accept-invite"
import { DivinePage } from "@/pages/divine"
import { RuethisPage } from "@/pages/ruethis"
import { XmetPage } from "@/pages/xmet"
import { CarminaPage } from "@/pages/carmina"
import { BisericaPage } from "@/pages/biserica"
import { SelectrikPage } from "@/pages/selectrik"
import { AloraBrightPage } from "@/pages/alora-bright"
import { AlphaPixelsPage } from "@/pages/alpha-pixels"
import { CeasPlanningPage } from "@/pages/ceas-planning"
import { GarmediPage } from "@/pages/garmedi"
import { IhopPage } from "@/pages/ihop"
import { ImbromaniaPage } from "@/pages/imbromania"
import { LiceulBaptistPage } from "@/pages/liceul-baptist"
import { LucasAmeliePage } from "@/pages/lucas-amelie"
import { TermotalPage } from "@/pages/termotal"
import { TermsPage } from "@/pages/terms"
import { PrivacyPage } from "@/pages/privacy"
import { DashboardOverviewPage } from "@/pages/dashboard/overview"
import { DashboardMySitePage } from "@/pages/dashboard/my-site"
import { DashboardContractsPage } from "@/pages/dashboard/contracts"
import { DashboardContractSignPage } from "@/pages/dashboard/contract-sign"
import { DashboardPackagesPage } from "@/pages/dashboard/packages"
import { DashboardSupportPage } from "@/pages/dashboard/support"
import { DashboardProgressPage } from "@/pages/dashboard/progress"
import { AdminOverviewPage } from "@/pages/admin/overview"
import { AdminClientsPage } from "@/pages/admin/clients"
import { AdminClientDetailPage } from "@/pages/admin/client-detail"
import { AdminPackagesManagePage } from "@/pages/admin/packages-manage"
import { AdminContractsManagePage } from "@/pages/admin/contracts-manage"
import { AdminContractTemplatesPage } from "@/pages/admin/contract-templates"
import { AdminSitesManagePage } from "@/pages/admin/sites-manage"
import { AdminFeedbackPage } from "@/pages/admin/feedback"
import { AdminActivityPage } from "@/pages/admin/activity"

function AppContent() {
  useSmoothScroll()
  usePageTransitions()
  usePerformanceOptimization()

  return (
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
