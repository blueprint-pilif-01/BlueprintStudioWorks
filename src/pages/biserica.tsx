import { motion } from "framer-motion"
import { ArrowLeft, TrendingUp, Users, Calendar, Music, Heart, Video, Phone, Mail, MapPin, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Timeline, type TimelineEntry } from "@/components/ui/timeline"
import { Link } from "react-router-dom"
import { useLanguage } from "@/contexts/language-context"

// Biserica Vertical color scheme
const bisericaColors = {
  bg: '#000000',
  fg: '#ffffff',
  yellow: '#EAFB2A',
  yellowBg: 'rgba(234, 251, 42, 0.1)',
  yellowBorder: 'rgba(234, 251, 42, 0.3)',
  muted: '#b7b7b7'
}

export function BisericaPage() {
  const { translate } = useLanguage()

  const timelineData: TimelineEntry[] = [
  {
    title: translate({ ro: "Overview", en: "Overview" }),
    content: (
      <Card className="glass">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h4 className="text-3xl font-bold mb-6" style={{ color: bisericaColors.yellow }}>
                {translate({ ro: "Proiectul Biserica Vertical", en: "The Biserica Vertical Project" })}
              </h4>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: bisericaColors.muted }}>
                {translate({
                  ro: "Biserica Vertical e cel mai complex proiect din portofoliul meu, un ecosistem digital complet pentru o comunitate vie. Am construit totul de la zero: site public pentru vizitatori, platformă UNITED pentru tineret cu galben neon vibrant, și un planner intern care gestionează muzica, serviciile și voluntarii. 25+ pagini, toate conectate într-un sistem coerent.",
                  en: "Biserica Vertical is the most complex project in my portfolio, a complete digital ecosystem for a living community. I built everything from scratch: public site for visitors, UNITED platform for youth with vibrant neon yellow, and an internal planner that manages music, services, and volunteers. 25+ pages, all connected in a coherent system."
                })}
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-4 rounded-xl" style={{
                  backgroundColor: bisericaColors.yellowBg,
                  borderColor: bisericaColors.yellowBorder,
                  border: `1px solid ${bisericaColors.yellowBorder}`
                }}>
                  <div className="text-4xl font-bold mb-2" style={{ color: bisericaColors.yellow }}>10+</div>
                  <div className="text-sm" style={{ color: bisericaColors.muted }}>
                    {translate({ ro: "Pagini publice", en: "Public pages" })}
                  </div>
                </div>
                <div className="text-center p-4 rounded-xl" style={{
                  backgroundColor: bisericaColors.yellowBg,
                  borderColor: bisericaColors.yellowBorder,
                  border: `1px solid ${bisericaColors.yellowBorder}`
                }}>
                  <div className="text-4xl font-bold mb-2" style={{ color: bisericaColors.yellow }}>15+</div>
                  <div className="text-sm" style={{ color: bisericaColors.muted }}>
                    {translate({ ro: "Pagini planner", en: "Planner pages" })}
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-xl" style={{
                background: `${bisericaColors.yellow}15`,
                border: `1px solid ${bisericaColors.yellow}30`
              }}>
                <h5 className="font-semibold mb-4" style={{ color: bisericaColors.yellow }}>
                  {translate({ ro: "Tehnologii Folosite:", en: "Technologies Used:" })}
                </h5>
                <div className="flex flex-wrap gap-2">
                  {["React 18", "TypeScript", "Vite", "Tailwind CSS", "Node.js", "Express", "SQLite", "React Router"].map((tech) => (
                    <span key={tech} className="text-sm px-3 py-1.5 rounded-full" style={{
                      background: `${bisericaColors.yellow}20`,
                      color: bisericaColors.yellow
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-4">
              <div className="p-5 rounded-2xl border" style={{
                borderColor: bisericaColors.yellowBorder,
                backgroundColor: bisericaColors.yellowBg
              }}>
                <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: bisericaColors.yellow }}>
                  <Video className="h-5 w-5" />
                  {translate({ ro: "Feature-uri Principale", en: "Main Features" })}
                </h5>
                <ul className="text-sm space-y-2" style={{ color: bisericaColors.muted }}>
                  <li className="flex items-start gap-2">
                    <span className="mt-1" style={{ color: bisericaColors.yellow }}>•</span>
                    <span>{translate({ ro: "Hero section cu video background pentru impact maxim", en: "Hero section with video background for maximum impact" })}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1" style={{ color: bisericaColors.yellow }}>•</span>
                    <span>{translate({ ro: "Design modern și responsive pentru toate dispozitivele", en: "Modern and responsive design for all devices" })}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1" style={{ color: bisericaColors.yellow }}>•</span>
                    <span>{translate({ ro: "Navigation intuitivă cu acces rapid la toate secțiunile", en: "Intuitive navigation with quick access to all sections" })}</span>
                  </li>
                </ul>
              </div>
              <div className="p-5 rounded-2xl border" style={{
                borderColor: bisericaColors.yellowBorder,
                backgroundColor: bisericaColors.yellowBg
              }}>
                <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: bisericaColors.yellow }}>
                  <Music className="h-5 w-5" />
                  {translate({ ro: "Optimizări", en: "Optimizations" })}
                </h5>
                <ul className="text-sm space-y-2" style={{ color: bisericaColors.muted }}>
                  <li className="flex items-start gap-2">
                    <span className="mt-1" style={{ color: bisericaColors.yellow }}>•</span>
                    <span>{translate({ ro: "SEO optimizat pentru vizibilitate maximă", en: "SEO optimized for maximum visibility" })}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1" style={{ color: bisericaColors.yellow }}>•</span>
                    <span>{translate({ ro: "Performance optimizat cu lazy loading", en: "Performance optimized with lazy loading" })}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1" style={{ color: bisericaColors.yellow }}>•</span>
                    <span>{translate({ ro: "Accessibility features pentru inclusivitate", en: "Accessibility features for inclusivity" })}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  },
  {
    title: translate({ ro: "Site Public", en: "Public Site" }),
    content: (
      <Card className="glass">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h4 className="text-3xl font-bold mb-6" style={{ color: bisericaColors.fg }}>
                {translate({ ro: "Pagini Publice", en: "Public Pages" })}
              </h4>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: bisericaColors.muted }}>
                {translate({
                  ro: "Site-ul public include homepage cu video hero, pagini despre biserică, program servicii, locație cu hartă interactivă și formular de contact.",
                  en: "The public site includes homepage with video hero, pages about the church, service schedule, location with interactive map and contact form."
                })}
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-4 p-3 rounded-lg" style={{ backgroundColor: bisericaColors.yellowBg }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center mt-1" style={{ backgroundColor: bisericaColors.yellow }}>
                    <span className="text-xs font-bold" style={{ color: bisericaColors.bg }}>1</span>
                  </div>
                  <div>
                    <div className="font-semibold mb-1" style={{ color: bisericaColors.fg }}>
                      {translate({ ro: "Homepage cu video hero", en: "Homepage with video hero" })}
                    </div>
                    <span className="text-sm" style={{ color: bisericaColors.muted }}>
                      {translate({ ro: "Video background cu zoom effect și call-to-action", en: "Video background with zoom effect and call-to-action" })}
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-4 p-3 rounded-lg" style={{ backgroundColor: bisericaColors.yellowBg }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center mt-1" style={{ backgroundColor: bisericaColors.yellow }}>
                    <span className="text-xs font-bold" style={{ color: bisericaColors.bg }}>2</span>
                  </div>
                  <div>
                    <div className="font-semibold mb-1" style={{ color: bisericaColors.fg }}>
                      {translate({ ro: "Pagină Despre", en: "About Page" })}
                    </div>
                    <span className="text-sm" style={{ color: bisericaColors.muted }}>
                      {translate({ ro: "Istoria bisericii și valorile comunității", en: "Church history and community values" })}
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-4 p-3 rounded-lg" style={{ backgroundColor: bisericaColors.yellowBg }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center mt-1" style={{ backgroundColor: bisericaColors.yellow }}>
                    <span className="text-xs font-bold" style={{ color: bisericaColors.bg }}>3</span>
                  </div>
                  <div>
                    <div className="font-semibold mb-1" style={{ color: bisericaColors.fg }}>
                      {translate({ ro: "Program servicii", en: "Service Schedule" })}
                    </div>
                    <span className="text-sm" style={{ color: bisericaColors.muted }}>
                      {translate({ ro: "Schedule săptămânal cu orarele serviciilor", en: "Weekly schedule with service times" })}
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-4 p-3 rounded-lg" style={{ backgroundColor: bisericaColors.yellowBg }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center mt-1" style={{ backgroundColor: bisericaColors.yellow }}>
                    <span className="text-xs font-bold" style={{ color: bisericaColors.bg }}>4</span>
                  </div>
                  <div>
                    <div className="font-semibold mb-1" style={{ color: bisericaColors.fg }}>
                      {translate({ ro: "Locație & Contact", en: "Location & Contact" })}
                    </div>
                    <span className="text-sm" style={{ color: bisericaColors.muted }}>
                      {translate({ ro: "Google Maps integration și formular contact", en: "Google Maps integration and contact form" })}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="p-5 rounded-2xl border" style={{ borderColor: bisericaColors.yellowBorder, backgroundColor: bisericaColors.yellowBg }}>
                <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: bisericaColors.yellow }}>
                  <Video className="h-5 w-5" />
                  {translate({ ro: "Design Public", en: "Public Design" })}
                </h5>
                <ul className="text-sm space-y-2" style={{ color: bisericaColors.muted }}>
                  <li className="flex items-start gap-2">
                    <span className="mt-1" style={{ color: bisericaColors.yellow }}>•</span>
                    <span>{translate({ ro: "Hero cu video background pentru impact vizual", en: "Hero with video background for visual impact" })}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1" style={{ color: bisericaColors.yellow }}>•</span>
                    <span>{translate({ ro: "Design modern minimalist cu accente galbene", en: "Modern minimalist design with yellow accents" })}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1" style={{ color: bisericaColors.yellow }}>•</span>
                    <span>{translate({ ro: "Responsive design pentru toate dispozitivele", en: "Responsive design for all devices" })}</span>
                  </li>
                </ul>
              </div>
              <div className="p-5 rounded-2xl border" style={{ borderColor: bisericaColors.yellowBorder, backgroundColor: bisericaColors.yellowBg }}>
                <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: bisericaColors.yellow }}>
                  <Calendar className="h-5 w-5" />
                  {translate({ ro: "Navigație & UX", en: "Navigation & UX" })}
                </h5>
                <ul className="text-sm space-y-2" style={{ color: bisericaColors.muted }}>
                  <li className="flex items-start gap-2">
                    <span className="mt-1" style={{ color: bisericaColors.yellow }}>•</span>
                    <span>{translate({ ro: "Meniu clar și intuitiv pentru accesibilitate", en: "Clear and intuitive menu for accessibility" })}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1" style={{ color: bisericaColors.yellow }}>•</span>
                    <span>{translate({ ro: "Google Maps integration pentru locație", en: "Google Maps integration for location" })}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1" style={{ color: bisericaColors.yellow }}>•</span>
                    <span>{translate({ ro: "Formular contact cu validare", en: "Contact form with validation" })}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  },
  {
    title: translate({ ro: "Tineret UNITED", en: "Youth UNITED" }),
    content: (
      <Card className="glass">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 space-y-4">
              <div className="p-5 rounded-2xl border" style={{ borderColor: bisericaColors.yellowBorder, backgroundColor: bisericaColors.yellowBg }}>
                <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: bisericaColors.yellow }}>
                  <Video className="h-5 w-5" />
                  {translate({ ro: "Design Vibrant", en: "Vibrant Design" })}
                </h5>
                <ul className="text-sm space-y-2" style={{ color: bisericaColors.muted }}>
                  <li className="flex items-start gap-2">
                    <span className="mt-1" style={{ color: bisericaColors.yellow }}>•</span>
                    <span>{translate({ ro: "Galben neon (#EAFB2A) pentru target youth", en: "Neon yellow (#EAFB2A) for youth target" })}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1" style={{ color: bisericaColors.yellow }}>•</span>
                    <span>{translate({ ro: "Animații moderne și dinamice", en: "Modern and dynamic animations" })}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1" style={{ color: bisericaColors.yellow }}>•</span>
                    <span>{translate({ ro: "Typography bold pentru impact", en: "Bold typography for impact" })}</span>
                  </li>
                </ul>
              </div>
              <div className="p-5 rounded-2xl border" style={{ borderColor: bisericaColors.yellowBorder, backgroundColor: bisericaColors.yellowBg }}>
                <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: bisericaColors.yellow }}>
                  <Calendar className="h-5 w-5" />
                  {translate({ ro: "Features Interactive", en: "Interactive Features" })}
                </h5>
                <ul className="text-sm space-y-2" style={{ color: bisericaColors.muted }}>
                  <li className="flex items-start gap-2">
                    <span className="mt-1" style={{ color: bisericaColors.yellow }}>•</span>
                    <span>{translate({ ro: "Evenimente cu calendar interactiv", en: "Events with interactive calendar" })}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1" style={{ color: bisericaColors.yellow }}>•</span>
                    <span>{translate({ ro: "Sondaje live pentru engagement", en: "Live polls for engagement" })}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1" style={{ color: bisericaColors.yellow }}>•</span>
                    <span>{translate({ ro: "Galerie foto/video cu filtering", en: "Photo/video gallery with filtering" })}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h4 className="text-3xl font-bold mb-6" style={{ color: bisericaColors.fg }}>
                {translate({ ro: "Secțiune Tineret Modern", en: "Modern Youth Section" })}
              </h4>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: bisericaColors.muted }}>
                {translate({
                  ro: "Secțiunea UNITED pentru tineret are un design modern și vibrant cu galben neon (#EAFB2A). Include evenimente, sondaje interactive și o galerie foto/video.",
                  en: "The UNITED section for youth has a modern and vibrant design with neon yellow (#EAFB2A). It includes events, interactive polls and a photo/video gallery."
                })}
              </p>
              <div className="space-y-4">
                <div className="p-4 rounded-xl border" style={{ backgroundColor: bisericaColors.yellowBg, borderColor: bisericaColors.yellowBorder }}>
                  <div className="flex items-center gap-3 mb-2">
                    <Video className="h-6 w-6" style={{ color: bisericaColors.yellow }} />
                    <h5 className="font-semibold text-lg" style={{ color: bisericaColors.fg }}>
                      {translate({ ro: "Hero Modern", en: "Modern Hero" })}
                    </h5>
                  </div>
                  <p className="text-sm" style={{ color: bisericaColors.muted }}>
                    {translate({ ro: "Video background cu mesaj motivațional pentru tineret", en: "Video background with motivational message for youth" })}
                  </p>
                </div>
                <div className="p-4 rounded-xl border" style={{ backgroundColor: bisericaColors.yellowBg, borderColor: bisericaColors.yellowBorder }}>
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="h-6 w-6" style={{ color: bisericaColors.yellow }} />
                    <h5 className="font-semibold text-lg" style={{ color: bisericaColors.fg }}>
                      {translate({ ro: "Evenimente", en: "Events" })}
                    </h5>
                  </div>
                  <p className="text-sm" style={{ color: bisericaColors.muted }}>
                    {translate({ ro: "Calendar cu întâlniri, retreats și activități sociale", en: "Calendar with meetings, retreats and social activities" })}
                  </p>
                </div>
                <div className="p-4 rounded-xl border" style={{ backgroundColor: bisericaColors.yellowBg, borderColor: bisericaColors.yellowBorder }}>
                  <div className="flex items-center gap-3 mb-2">
                    <Heart className="h-6 w-6" style={{ color: bisericaColors.yellow }} />
                    <h5 className="font-semibold text-lg" style={{ color: bisericaColors.fg }}>
                      {translate({ ro: "Sondaje Interactive", en: "Interactive Polls" })}
                    </h5>
                  </div>
                  <p className="text-sm" style={{ color: bisericaColors.muted }}>
                    {translate({ ro: "Polls pentru feedback și engagement cu tinerii", en: "Polls for feedback and engagement with youth" })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  },
  {
    title: translate({ ro: "Planner System", en: "Planner System" }),
    content: (
      <Card className="glass">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h4 className="text-3xl font-bold mb-6" style={{ color: bisericaColors.fg }}>
                {translate({ ro: "Sistem Complex de Planning", en: "Complex Planning System" })}
              </h4>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: bisericaColors.muted }}>
                {translate({
                  ro: "Backend Node.js + Express cu bază de date SQLite pentru managementul serviciilor, cantarilor, muzicii și voluntarilor. Sistem complet de autentificare și roluri.",
                  en: "Node.js + Express backend with SQLite database for managing services, songs, music and volunteers. Complete authentication and role system."
                })}
              </p>
              <div className="space-y-3">
                <div className="p-4 rounded-xl border" style={{ backgroundColor: bisericaColors.yellowBg, borderColor: bisericaColors.yellowBorder }}>
                  <h5 className="font-semibold text-base mb-1" style={{ color: bisericaColors.fg }}>Dashboard</h5>
                  <p className="text-sm" style={{ color: bisericaColors.muted }}>
                    {translate({ ro: "Overview servicii, notificări și statistici", en: "Service overview, notifications and statistics" })}
                  </p>
                </div>
                <div className="p-4 rounded-xl border" style={{ backgroundColor: bisericaColors.yellowBg, borderColor: bisericaColors.yellowBorder }}>
                  <h5 className="font-semibold text-base mb-1" style={{ color: bisericaColors.fg }}>
                    {translate({ ro: "Calendar Servicii", en: "Service Calendar" })}
                  </h5>
                  <p className="text-sm" style={{ color: bisericaColors.muted }}>
                    {translate({ ro: "Vizualizare și creare servicii cu detalii complete", en: "View and create services with complete details" })}
                  </p>
                </div>
                <div className="p-4 rounded-xl border" style={{ backgroundColor: bisericaColors.yellowBg, borderColor: bisericaColors.yellowBorder }}>
                  <h5 className="font-semibold text-base mb-1" style={{ color: bisericaColors.fg }}>
                    {translate({ ro: "Biblioteca Cantari", en: "Song Library" })}
                  </h5>
                  <p className="text-sm" style={{ color: bisericaColors.muted }}>
                    {translate({ ro: "1000+ cantari cu chei transpuse automat", en: "1000+ songs with automatically transposed keys" })}
                  </p>
                </div>
                <div className="p-4 rounded-xl border" style={{ backgroundColor: bisericaColors.yellowBg, borderColor: bisericaColors.yellowBorder }}>
                  <h5 className="font-semibold text-base mb-1" style={{ color: bisericaColors.fg }}>
                    {translate({ ro: "Service Builder", en: "Service Builder" })}
                  </h5>
                  <p className="text-sm" style={{ color: bisericaColors.muted }}>
                    {translate({ ro: "Construire setlist cu drag & drop și preview", en: "Build setlist with drag & drop and preview" })}
                  </p>
                </div>
                <div className="p-4 rounded-xl border" style={{ backgroundColor: bisericaColors.yellowBg, borderColor: bisericaColors.yellowBorder }}>
                  <h5 className="font-semibold text-base mb-1" style={{ color: bisericaColors.fg }}>
                    {translate({ ro: "Voting System", en: "Voting System" })}
                  </h5>
                  <p className="text-sm" style={{ color: bisericaColors.muted }}>
                    {translate({ ro: "Vot colaborativ pentru cantari viitoare", en: "Collaborative voting for future songs" })}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-5 rounded-2xl border" style={{ borderColor: bisericaColors.yellowBorder, backgroundColor: bisericaColors.yellowBg }}>
                <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: bisericaColors.yellow }}>
                  <Calendar className="h-5 w-5" />
                  Dashboard UI
                </h5>
                <ul className="text-sm space-y-2" style={{ color: bisericaColors.muted }}>
                  <li className="flex items-start gap-2">
                    <span className="mt-1" style={{ color: bisericaColors.yellow }}>•</span>
                    <span>{translate({ ro: "Calendar interactiv pentru planificare servicii", en: "Interactive calendar for service planning" })}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1" style={{ color: bisericaColors.yellow }}>•</span>
                    <span>{translate({ ro: "Sidebar pentru navigație rapidă", en: "Sidebar for quick navigation" })}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1" style={{ color: bisericaColors.yellow }}>•</span>
                    <span>{translate({ ro: "Dashboard cards cu statistici și overview", en: "Dashboard cards with statistics and overview" })}</span>
                  </li>
                </ul>
              </div>
              <div className="p-5 rounded-2xl border" style={{ borderColor: bisericaColors.yellowBorder, backgroundColor: bisericaColors.yellowBg }}>
                <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: bisericaColors.yellow }}>
                  <Music className="h-5 w-5" />
                  {translate({ ro: "Library Manager", en: "Library Manager" })}
                </h5>
                <ul className="text-sm space-y-2" style={{ color: bisericaColors.muted }}>
                  <li className="flex items-start gap-2">
                    <span className="mt-1" style={{ color: bisericaColors.yellow }}>•</span>
                    <span>{translate({ ro: "Bibliotecă centralizată de cântări cu search", en: "Centralized song library with search" })}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1" style={{ color: bisericaColors.yellow }}>•</span>
                    <span>{translate({ ro: "Organizare pe categorii și tags", en: "Organization by categories and tags" })}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1" style={{ color: bisericaColors.yellow }}>•</span>
                    <span>{translate({ ro: "Preview rapid și export PDF", en: "Quick preview and PDF export" })}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  },
  {
    title: translate({ ro: "Features Avansate", en: "Advanced Features" }),
    content: (
      <Card className="glass">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 space-y-4">
              <div className="p-5 rounded-2xl border" style={{ borderColor: bisericaColors.yellowBorder, backgroundColor: bisericaColors.yellowBg }}>
                <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: bisericaColors.yellow }}>
                  <Music className="h-5 w-5" />
                  {translate({ ro: "Song Keys Manager", en: "Song Keys Manager" })}
                </h5>
                <ul className="text-sm space-y-2" style={{ color: bisericaColors.muted }}>
                  <li className="flex items-start gap-2">
                    <span className="mt-1" style={{ color: bisericaColors.yellow }}>•</span>
                    <span>{translate({ ro: "Transpunere automată de acorduri în orice tonalitate", en: "Automatic chord transposition to any key" })}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1" style={{ color: bisericaColors.yellow }}>•</span>
                    <span>{translate({ ro: "Library centralizată cu toate cântările bisericii", en: "Centralized library with all church songs" })}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1" style={{ color: bisericaColors.yellow }}>•</span>
                    <span>{translate({ ro: "Editor de chord charts cu preview instant", en: "Chord chart editor with instant preview" })}</span>
                  </li>
                </ul>
              </div>
              <div className="p-5 rounded-2xl border" style={{ borderColor: bisericaColors.yellowBorder, backgroundColor: bisericaColors.yellowBg }}>
                <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: bisericaColors.yellow }}>
                  <Users className="h-5 w-5" />
                  {translate({ ro: "Features Muzicale", en: "Music Features" })}
                </h5>
                <ul className="text-sm space-y-2" style={{ color: bisericaColors.muted }}>
                  <li className="flex items-start gap-2">
                    <span className="mt-1" style={{ color: bisericaColors.yellow }}>•</span>
                    <span>{translate({ ro: "Asignare membri echipei de laudă la servicii", en: "Assign worship team members to services" })}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1" style={{ color: bisericaColors.yellow }}>•</span>
                    <span>{translate({ ro: "Export PDF pentru sheet music", en: "PDF export for sheet music" })}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1" style={{ color: bisericaColors.yellow }}>•</span>
                    <span>{translate({ ro: "Setlist builder pentru servicii live", en: "Setlist builder for live services" })}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h4 className="text-3xl font-bold mb-6" style={{ color: bisericaColors.fg }}>
                {translate({ ro: "Funcționalități Complexe", en: "Complex Functionalities" })}
              </h4>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: bisericaColors.muted }}>
                {translate({
                  ro: "Sistemul include features avansate pentru managementul complet al serviciilor bisericești.",
                  en: "The system includes advanced features for complete church service management."
                })}
              </p>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl border" style={{ backgroundColor: bisericaColors.yellowBg, borderColor: bisericaColors.yellowBorder }}>
                  <h5 className="font-semibold text-lg mb-2" style={{ color: bisericaColors.yellow }}>
                    {translate({ ro: "Song Keys Manager", en: "Song Keys Manager" })}
                  </h5>
                  <p className="text-sm" style={{ color: bisericaColors.muted }}>
                    {translate({
                      ro: "Transpunere automată acorzi în orice cheie. Preview compact și manager complet pentru chei.",
                      en: "Automatic chord transposition to any key. Compact preview and complete key manager."
                    })}
                  </p>
                </div>
                <div className="p-5 rounded-2xl border" style={{ backgroundColor: bisericaColors.yellowBg, borderColor: bisericaColors.yellowBorder }}>
                  <h5 className="font-semibold text-lg mb-2" style={{ color: bisericaColors.yellow }}>
                    {translate({ ro: "Auto-Generate Services", en: "Auto-Generate Services" })}
                  </h5>
                  <p className="text-sm" style={{ color: bisericaColors.muted }}>
                    {translate({
                      ro: "Cron jobs pentru crearea automată a serviciilor viitoare și notificări email.",
                      en: "Cron jobs for automatic creation of future services and email notifications."
                    })}
                  </p>
                </div>
                <div className="p-5 rounded-2xl border" style={{ backgroundColor: bisericaColors.yellowBg, borderColor: bisericaColors.yellowBorder }}>
                  <h5 className="font-semibold text-lg mb-2" style={{ color: bisericaColors.yellow }}>
                    {translate({ ro: "File Upload System", en: "File Upload System" })}
                  </h5>
                  <p className="text-sm" style={{ color: bisericaColors.muted }}>
                    {translate({
                      ro: "Upload PDF-uri și resurse pentru servicii și cantari cu preview integrat.",
                      en: "Upload PDFs and resources for services and songs with integrated preview."
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="p-6 rounded-2xl border" style={{ backgroundColor: bisericaColors.yellowBg, borderColor: bisericaColors.yellowBorder }}>
              <h5 className="font-semibold text-lg mb-4" style={{ color: bisericaColors.yellow }}>
                {translate({ ro: "Backend Features", en: "Backend Features" })}
              </h5>
              <ul className="space-y-2" style={{ color: bisericaColors.muted }}>
                <li className="flex items-center gap-2">
                  <span className="text-lg">✓</span>
                  <span>RESTful API {translate({ ro: "cu Express.js", en: "with Express.js" })}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lg">✓</span>
                  <span>SQLite database {translate({ ro: "cu migrations", en: "with migrations" })}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lg">✓</span>
                  <span>JWT authentication</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lg">✓</span>
                  <span>Role-based access control</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lg">✓</span>
                  <span>Cron jobs {translate({ ro: "pentru automatizare", en: "for automation" })}</span>
                </li>
                </ul>
              </div>
            <div className="p-6 rounded-2xl border" style={{ backgroundColor: bisericaColors.yellowBg, borderColor: bisericaColors.yellowBorder }}>
              <h5 className="font-semibold text-lg mb-4" style={{ color: bisericaColors.yellow }}>
                {translate({ ro: "Frontend Features", en: "Frontend Features" })}
              </h5>
              <ul className="space-y-2" style={{ color: bisericaColors.muted }}>
                <li className="flex items-center gap-2">
                  <span className="text-lg">✓</span>
                  <span>Protected routes {translate({ ro: "cu auth", en: "with auth" })}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lg">✓</span>
                  <span>Real-time notifications</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lg">✓</span>
                  <span>Responsive design</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lg">✓</span>
                  <span>Custom CSS animations</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lg">✓</span>
                  <span>Video zoom effects</span>
                </li>
                </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  },
  {
    title: translate({ ro: "Rezultate", en: "Results" }),
    content: (
      <Card className="glass">
        <CardContent className="p-8">
          <h4 className="text-3xl font-bold text-center mb-8" style={{ color: bisericaColors.fg }}>
            {translate({ ro: "Rezultatul Final", en: "Final Result" })}
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="p-8 rounded-2xl border-2" style={{
              backgroundColor: bisericaColors.yellowBg,
              borderColor: bisericaColors.yellowBorder
            }}>
              <h5 className="text-2xl font-semibold mb-4" style={{ color: bisericaColors.yellow }}>
                {translate({ ro: "Impactul Proiectului", en: "Project Impact" })}
              </h5>
              <p className="text-base leading-relaxed" style={{ color: bisericaColors.muted }}>
              {translate({
                ro: "Am dedicat luni de muncă acestui proiect, negru cu galben vibrant, design modern dar accesibil, features complexe făcute să pară simple. De la transpunerea automată de acorduri muzicale până la calendar-ul de servicii, fiecare feature rezolvă o problemă reală. Am construit nu doar un site, ci un instrument care servește o comunitate întreagă. E cel mai de impact proiect pe care l-am livrat.",
                en: "I dedicated months of work to this project, black with vibrant yellow, modern yet accessible design, complex features made to seem simple. From automatic music chord transposition to the service calendar, each feature solves a real problem. I built not just a website, but a tool that serves an entire community. It's the most impactful project I've delivered."
              })}
            </p>
            </div>
            <div className="space-y-4">
              <div className="p-5 rounded-2xl border" style={{ borderColor: bisericaColors.yellowBorder, backgroundColor: bisericaColors.yellowBg }}>
                <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: bisericaColors.yellow }}>
                  <TrendingUp className="h-5 w-5" />
                  {translate({ ro: "Analytics Dashboard", en: "Analytics Dashboard" })}
                </h5>
                <ul className="text-sm space-y-2" style={{ color: bisericaColors.muted }}>
                  <li className="flex items-start gap-2">
                    <span className="mt-1" style={{ color: bisericaColors.yellow }}>•</span>
                    <span>{translate({ ro: "Dashboard cu statistici de utilizare și engagement", en: "Dashboard with usage and engagement statistics" })}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1" style={{ color: bisericaColors.yellow }}>•</span>
                    <span>{translate({ ro: "Grafice interactive pentru tracked metrics", en: "Interactive charts for tracked metrics" })}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1" style={{ color: bisericaColors.yellow }}>•</span>
                    <span>{translate({ ro: "Reports automate pentru leadership", en: "Automated reports for leadership" })}</span>
                  </li>
                </ul>
            </div>
              <div className="p-5 rounded-2xl border" style={{ borderColor: bisericaColors.yellowBorder, backgroundColor: bisericaColors.yellowBg }}>
                <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: bisericaColors.yellow }}>
                  <Heart className="h-5 w-5" />
                  Design System
                </h5>
                <ul className="text-sm space-y-2" style={{ color: bisericaColors.muted }}>
                  <li className="flex items-start gap-2">
                    <span className="mt-1" style={{ color: bisericaColors.yellow }}>•</span>
                    <span>{translate({ ro: "Negru profund cu galben vibrant pentru contrast", en: "Deep black with vibrant yellow for contrast" })}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1" style={{ color: bisericaColors.yellow }}>•</span>
                    <span>{translate({ ro: "Glass morphism pentru cards moderne", en: "Glass morphism for modern cards" })}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1" style={{ color: bisericaColors.yellow }}>•</span>
                    <span>{translate({ ro: "Typography clar pentru readability", en: "Clear typography for readability" })}</span>
                  </li>
                </ul>
            </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  },
  {
    title: translate({ ro: "Contact", en: "Contact" }),
    content: (
      <Card className="glass">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h4 className="text-3xl font-bold mb-6" style={{ color: bisericaColors.fg }}>
                {translate({ ro: "Contact Biserica Vertical", en: "Contact Biserica Vertical" })}
              </h4>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: bisericaColors.muted }}>
                {translate({
                  ro: "Pentru mai multe informații despre comunitatea noastră și despre cum putem digitaliza și comunitatea ta.",
                  en: "For more information about our community and how we can digitize your community too."
                })}
              </p>
              <div className="space-y-5">
                <div className="flex items-center gap-5 p-4 rounded-xl" style={{ backgroundColor: bisericaColors.yellowBg }}>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{
                    backgroundColor: bisericaColors.yellow
                  }}>
                    <Phone className="h-6 w-6" style={{ color: bisericaColors.bg }} />
                  </div>
                  <div>
                    <div className="font-semibold text-lg mb-1" style={{ color: bisericaColors.fg }}>
                      {translate({ ro: "Telefon", en: "Phone" })}
                    </div>
                    <div className="text-sm" style={{ color: bisericaColors.muted }}>
                      {translate({ ro: "Contact Biserica", en: "Church Contact" })}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-5 p-4 rounded-xl" style={{ backgroundColor: bisericaColors.yellowBg }}>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{
                    backgroundColor: bisericaColors.yellow
                  }}>
                    <Mail className="h-6 w-6" style={{ color: bisericaColors.bg }} />
                  </div>
                  <div>
                    <div className="font-semibold text-lg mb-1" style={{ color: bisericaColors.fg }}>Email</div>
                    <div className="text-sm" style={{ color: bisericaColors.muted }}>contact@bisericavertical.ro</div>
                  </div>
                </div>
                <div className="flex items-center gap-5 p-4 rounded-xl" style={{ backgroundColor: bisericaColors.yellowBg }}>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{
                    backgroundColor: bisericaColors.yellow
                  }}>
                    <MapPin className="h-6 w-6" style={{ color: bisericaColors.bg }} />
                  </div>
                  <div>
                    <div className="font-semibold text-lg mb-1" style={{ color: bisericaColors.fg }}>
                      {translate({ ro: "Locație", en: "Location" })}
                    </div>
                    <div className="text-sm" style={{ color: bisericaColors.muted }}>
                      {translate({ ro: "România", en: "Romania" })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-5 rounded-2xl border" style={{
                borderColor: bisericaColors.yellowBorder,
                backgroundColor: bisericaColors.yellowBg
              }}>
                <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: bisericaColors.yellow }}>
                  <Heart className="h-5 w-5" />
                  {translate({ ro: "Comunitate Activă", en: "Active Community" })}
                </h5>
                <ul className="text-sm space-y-2" style={{ color: bisericaColors.muted }}>
                  <li className="flex items-start gap-2">
                    <span className="mt-1" style={{ color: bisericaColors.yellow }}>•</span>
                    <span>{translate({ ro: "Formular de contact cu validare avansată", en: "Contact form with advanced validation" })}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1" style={{ color: bisericaColors.yellow }}>•</span>
                    <span>{translate({ ro: "Hartă interactivă Google Maps pentru locație", en: "Interactive Google Maps for location" })}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1" style={{ color: bisericaColors.yellow }}>•</span>
                    <span>{translate({ ro: "Program servicii și evenimente accesibil", en: "Accessible service schedule and events" })}</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-8" style={{ borderTop: `2px solid ${bisericaColors.yellowBorder}` }}>
                <div className="text-center">
                  <h2 className="font-bold mb-4" style={{
                    fontSize: "clamp(2rem, 6vw, 3.75rem)",
                    background: `linear-gradient(135deg, ${bisericaColors.yellow}, #B8860B)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    {translate({ ro: "Ești curios cum arată?", en: "Curious how it looks?" })}
                  </h2>
                  <p className="text-muted mb-6 text-lg">
                    {translate({ ro: "Explorează site-ul live și descoperă toate funcționalitățile.", en: "Explore the live website and discover all features." })}
                  </p>
                  <a
                    href="https://biserica-vertical.ro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <Button size="lg" className="px-8 py-6 text-lg font-bold" style={{
                      background: `linear-gradient(135deg, ${bisericaColors.yellow}, #B8860B)`,
                      color: '#000000'
                    }}>
                      <ExternalLink className="h-6 w-6" />
                      {translate({ ro: "Vizită biserica-vertical.ro", en: "Visit biserica-vertical.ro" })}
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
]

  return (
    <div className="relative biserica-page" style={{ minHeight: '100vh', background: '#000000' }}>
      {/* Fixed Background Layer */}
      <div className="fixed inset-0 -z-10" style={{ background: '#000000', minHeight: '100%' }}></div>

      {/* Biserica Vertical Dark Theme Styling */}
      <style>{`
        .biserica-page {
          background: #000000 !important;
          color: #ffffff;
        }
        .biserica-page .glass {
          background: rgba(255, 255, 255, 0.03) !important;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
        }
        .biserica-page .text-muted {
          color: #b7b7b7 !important;
        }
      `}</style>

      <div className="container-custom py-20 pt-32">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link to="/portfolio">
            <Button variant="ghost" size="sm" className="gap-2" style={{
              color: '#EAFB2A',
              backgroundColor: 'rgba(234, 251, 42, 0.1)',
              border: '1px solid rgba(234, 251, 42, 0.2)'
            }}>
              <ArrowLeft className="h-4 w-4" />
              {translate({ ro: "Înapoi la portofoliu", en: "Back to portfolio" })}
            </Button>
          </Link>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6"
            style={{
              color: '#ffffff',
              textShadow: '0 0 20px rgba(234, 251, 42, 0.3)'
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Biserica Vertical
          </motion.h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto" style={{ color: '#b7b7b7' }}>
            {translate({
              ro: "Ecosistem digital complet pentru o comunitate bisericească modernă - site public + tineret UNITED + planner complex",
              en: "Complete digital ecosystem for a modern church community - public site + UNITED youth + complex planner"
            })}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <motion.span
              className="px-4 py-2 rounded-full text-sm font-medium"
              style={{
                backgroundColor: 'rgba(234, 251, 42, 0.15)',
                color: '#EAFB2A',
                border: '1px solid rgba(234, 251, 42, 0.3)'
              }}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(234, 251, 42, 0.25)' }}
            >
              React + Node.js
            </motion.span>
            <motion.span
              className="px-4 py-2 rounded-full text-sm font-medium"
              style={{
                backgroundColor: 'rgba(234, 251, 42, 0.15)',
                color: '#EAFB2A',
                border: '1px solid rgba(234, 251, 42, 0.3)'
              }}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(234, 251, 42, 0.25)' }}
            >
              {translate({ ro: "25+ Pagini", en: "25+ Pages" })}
            </motion.span>
            <motion.span
              className="px-4 py-2 rounded-full text-sm font-medium"
              style={{
                backgroundColor: 'rgba(234, 251, 42, 0.15)',
                color: '#EAFB2A',
                border: '1px solid rgba(234, 251, 42, 0.3)'
              }}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(234, 251, 42, 0.25)' }}
            >
              {translate({ ro: "Backend Complet", en: "Full Backend" })}
            </motion.span>
          </div>
        </motion.div>

        {/* Timeline */}
        <Timeline
          data={timelineData}
          title={translate({ ro: "Journey-ul Biserica Vertical", en: "Biserica Vertical Journey" })}
          subtitle={translate({
            ro: "De la prezență online simplă la ecosistem digital complex pentru comunitate",
            en: "From simple online presence to complex digital ecosystem for community"
          })}
        />

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-12"
        >
          <Card className="glass rounded-3xl p-8 md:p-12 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {translate({ ro: "Ai nevoie de un sistem similar?", en: "Need a similar system?" })}
            </h2>
            <p className="text-muted mb-8">
              {translate({
                ro: "Hai să discutăm despre următorul tău proiect și să creăm o platformă completă pentru comunitatea ta.",
                en: "Let's talk about your next project and create a complete platform for your community."
              })}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" variant="primary">
                  {translate({ ro: "Începe un proiect", en: "Start a project" })}
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button size="lg" variant="glass">
                  {translate({ ro: "Vezi alte proiecte", en: "See other projects" })}
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
