import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const privacyContent = {
  ro: (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">1. Introducere</h2>
        <p className="text-muted leading-relaxed mb-4">
          Blueprint Studio Works („noi”, „nostru” sau „Compania”) respectă confidențialitatea datelor dumneavoastră și se angajează să protejeze informațiile personale pe care ni le furnizați. Această Politică descrie modul în care colectăm, folosim, stocăm și protejăm datele conform GDPR și legislației române aplicabile.
        </p>
        <p className="text-muted leading-relaxed">
          Prin folosirea serviciilor noastre sau a site-ului, acceptați practicile descrise aici.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">2. Operator de date</h2>
        <ul className="list-none space-y-2 text-muted leading-relaxed ml-4">
          <li><strong>Denumire:</strong> Blueprint Studio Works</li>
          <li><strong>Email:</strong> blueprintstudioworks@gmail.com</li>
          <li><strong>Telefon:</strong> +40 749 084 150</li>
          <li><strong>Locație:</strong> Timișoara, România</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">3. Ce date colectăm</h2>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">3.1 Date de identitate</h3>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li>Nume și prenume</li>
          <li>Adresă de email</li>
          <li>Număr de telefon</li>
          <li>Nume companie (dacă este cazul)</li>
          <li>Adresă de facturare</li>
        </ul>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">3.2 Date despre proiect</h3>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li>Numele proiectului/site-ului</li>
          <li>Domeniul preferat</li>
          <li>Pachetul ales</li>
          <li>Descrierea proiectului și cerințe speciale</li>
          <li>Materiale furnizate (texte, imagini, logo-uri)</li>
        </ul>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">3.3 Date tehnice</h3>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li>Adresă IP</li>
          <li>Tip și versiune de browser</li>
          <li>Sistem de operare</li>
          <li>Data și ora accesului</li>
          <li>Paginile vizitate și referrer URL</li>
        </ul>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">3.4 Date de comunicare</h3>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li>Istoric email</li>
          <li>Mesaje trimise prin formulare</li>
          <li>Feedback și recenzii</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">4. Cum colectăm datele</h2>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">4.1 Direct de la dumneavoastră</h3>
        <p className="text-muted leading-relaxed mb-4">Prin formulare, email, telefon, contracte sau întâlniri.</p>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">4.2 Automat</h3>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li>Cookie-uri necesare</li>
          <li>Google Analytics</li>
          <li>Log-uri de server pentru securitate</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">5. Cum folosim datele</h2>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">5.1 Furnizarea serviciilor</h3>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li>Procesarea și gestionarea proiectelor</li>
          <li>Comunicare și livrare</li>
          <li>Facturare și suport tehnic</li>
        </ul>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">5.2 Îmbunătățirea serviciilor</h3>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li>Analiza utilizării site-ului</li>
          <li>Optimizarea experienței</li>
          <li>Dezvoltarea de noi funcționalități</li>
        </ul>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">5.3 Comunicări de marketing (cu consimțământ)</h3>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li>Newslettere și noutăți</li>
          <li>Informații despre servicii</li>
          <li>Promoții</li>
        </ul>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">5.4 Obligații legale</h3>
        <p className="text-muted leading-relaxed">Respectarea cerințelor legale și protejarea drepturilor noastre.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">6. Temeiul legal</h2>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li>Executarea contractului</li>
          <li>Consimțământul (marketing)</li>
          <li>Interes legitim (optimizări și securitate)</li>
          <li>Obligații legale (fiscalitate)</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">7. Partajarea datelor</h2>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">7.1 Fără vânzare de date</h3>
        <p className="text-muted leading-relaxed mb-4">Nu vindem sau închiriem datele personali pentru scopuri comerciale.</p>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">7.2 Furnizori</h3>
        <p className="text-muted leading-relaxed mb-4">Lucrăm cu servicii precum Google Analytics, găzduire și procesatori de plăți. Aceștia folosesc datele doar pentru a ne ajuta să operăm serviciile.</p>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">7.3 Cereri legale</h3>
        <p className="text-muted leading-relaxed">Putem divulga informații pentru a respecta legea sau a preveni fraudele.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">8. Securitatea datelor</h2>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">8.1 Măsuri tehnice</h3>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li>Criptare SSL/TLS</li>
          <li>Servere securizate și firewall</li>
          <li>Backup-uri regulate și monitorizare</li>
        </ul>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">8.2 Măsuri organizaționale</h3>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li>Acces limitat la date</li>
          <li>Politici stricte de confidențialitate</li>
          <li>Proceduri pentru incidente</li>
        </ul>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">8.3 Limitări</h3>
        <p className="text-muted leading-relaxed">Nicio metodă nu este 100% sigură, dar facem tot posibilul să protejăm datele.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">9. Păstrarea datelor</h2>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li>Date de contact: până la ștergerea contului sau retragerea consimțământului</li>
          <li>Date de proiect: durata proiectului + 3 ani</li>
          <li>Date financiare: 10 ani (conform legii fiscale)</li>
          <li>Date de comunicare: 2 ani de la ultima interacțiune</li>
          <li>Date marketing: până la retragerea consimțământului</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">10. Drepturile dumneavoastră</h2>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li>Dreptul de acces și rectificare</li>
          <li>Dreptul la ștergere („dreptul de a fi uitat”)</li>
          <li>Dreptul la restricționare și portabilitate</li>
          <li>Dreptul de a vă opune și de a retrage consimțământul</li>
        </ul>
        <p className="text-muted leading-relaxed mt-2">Ne puteți contacta oricând la blueprintstudioworks@gmail.com sau +40 749 084 150; răspundem în maximum 30 de zile.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">11. Cookie-uri</h2>
        <p className="text-muted leading-relaxed mb-4">Folosim cookie-uri esențiale și Google Analytics pentru statistici anonime. Puteți controla cookie-urile din browser.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">12. Transferuri internaționale</h2>
        <p className="text-muted leading-relaxed">În general procesăm datele în UE. Dacă este necesar un transfer în afara UE, aplicăm clauze standard GDPR sau alte garanții adecvate.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">13. Datele copiilor</h2>
        <p className="text-muted leading-relaxed">Serviciile noastre nu se adresează persoanelor sub 16 ani și nu colectăm intenționat astfel de date.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">14. Actualizări ale politicii</h2>
        <p className="text-muted leading-relaxed">Putem modifica această politică. Data „Ultima actualizare” reflectă cea mai recentă versiune; schimbările majore vor fi comunicate.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">15. Plângeri către autoritate</h2>
        <p className="text-muted leading-relaxed">Aveți dreptul să vă adresați Autorității Naționale de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP), www.dataprotection.ro.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">16. Contact</h2>
        <p className="text-muted leading-relaxed mb-4">Pentru întrebări legate de această politică:</p>
        <ul className="list-none space-y-2 text-muted leading-relaxed">
          <li><strong>Email:</strong> blueprintstudioworks@gmail.com</li>
          <li><strong>Telefon:</strong> +40 749 084 150</li>
          <li><strong>Locație:</strong> Timișoara, România</li>
        </ul>
        <p className="text-muted leading-relaxed mt-2">Răspundem, de regulă, în 2-3 zile lucrătoare.</p>
      </section>
    </>
  ),
  en: (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
        <p className="text-muted leading-relaxed mb-4">
          Blueprint Studio Works (“we,” “our,” or “the Company”) respects your privacy and is committed to protecting the personal data you share with us. This Privacy Policy explains how we collect, use, store, and safeguard your information in line with GDPR and Romanian law.
        </p>
        <p className="text-muted leading-relaxed">
          By using our services or interacting with our website, you accept the practices described in this policy.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">2. Data Controller</h2>
        <ul className="list-none space-y-2 text-muted leading-relaxed ml-4">
          <li><strong>Name:</strong> Blueprint Studio Works</li>
          <li><strong>Email:</strong> blueprintstudioworks@gmail.com</li>
          <li><strong>Phone:</strong> +40 749 084 150</li>
          <li><strong>Location:</strong> Timișoara, Romania</li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">3. What Data We Collect</h2>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">3.1 Identification Data</h3>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li>First and last name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Company name (if applicable)</li>
          <li>Billing address (for contracts)</li>
        </ul>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">3.2 Project Data</h3>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li>Project/website name</li>
          <li>Preferred domain</li>
          <li>Selected package</li>
          <li>Project description, requirements, and materials provided</li>
        </ul>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">3.3 Technical Data</h3>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li>IP address, browser, OS</li>
          <li>Date/time of access, visited pages, referrer URL</li>
        </ul>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">3.4 Communication Data</h3>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li>Email history</li>
          <li>Messages sent via forms</li>
          <li>Feedback and reviews</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">4. How We Collect Data</h2>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">4.1 Provided Directly</h3>
        <p className="text-muted leading-relaxed mb-4">Contact forms, email, phone, contracts, meetings, and consulting sessions.</p>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">4.2 Collected Automatically</h3>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li>Essential cookies</li>
          <li>Google Analytics statistics</li>
          <li>Server logs for security and debugging</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">5. How We Use Data</h2>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">5.1 Service Delivery</h3>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li>Processing and managing projects</li>
          <li>Communicating about services</li>
          <li>Providing deliverables, invoicing, and support</li>
        </ul>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">5.2 Service Improvement</h3>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li>Analyzing site usage</li>
          <li>Improving user experience</li>
          <li>Building new features</li>
        </ul>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">5.3 Marketing (with consent)</h3>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li>Newsletters, updates, promotions</li>
        </ul>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">5.4 Legal Compliance</h3>
        <p className="text-muted leading-relaxed">Meeting legal obligations, responding to requests, protecting rights.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">6. Legal Basis for Processing</h2>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li>Contract performance</li>
          <li>Consent (marketing)</li>
          <li>Legitimate interests (improvements, security)</li>
          <li>Legal obligations (tax, accounting)</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">7. Data Sharing</h2>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">7.1 No Sale of Data</h3>
        <p className="text-muted leading-relaxed mb-4">We never sell or rent personal data.</p>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">7.2 Service Providers</h3>
        <p className="text-muted leading-relaxed mb-4">Trusted partners (Google Analytics, hosting, payment processors) who are contractually bound to protect your data.</p>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">7.3 Legal Requirements</h3>
        <p className="text-muted leading-relaxed">We may disclose data if required by law or to prevent fraud.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">8. Data Security</h2>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">8.1 Technical Measures</h3>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li>SSL/TLS encryption</li>
          <li>Secure servers and firewalls</li>
          <li>Regular backups and monitoring</li>
        </ul>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">8.2 Organizational Measures</h3>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li>Restricted access to personal data</li>
          <li>Confidentiality policies and staff training</li>
          <li>Incident response procedures</li>
        </ul>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">8.3 Limitations</h3>
        <p className="text-muted leading-relaxed">No method of transmission or storage is 100% secure, but we apply best practices.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">9. Storage Period</h2>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li>Contact data: until deletion or withdrawal of consent</li>
          <li>Project data: project duration + 3 years</li>
          <li>Financial data: 10 years under Romanian tax law</li>
          <li>Communication data: 2 years after last interaction</li>
          <li>Marketing data: until consent is withdrawn</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">10. Your Rights</h2>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li>Access, rectification, erasure</li>
          <li>Restriction and portability</li>
          <li>Objection to processing</li>
          <li>Withdrawal of consent</li>
        </ul>
        <p className="text-muted leading-relaxed mt-2">Contact us at blueprintstudioworks@gmail.com or +40 749 084 150; we respond within 30 days.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">11. Cookies</h2>
        <p className="text-muted leading-relaxed mb-4">We use essential cookies, performance cookies (Google Analytics), and functional cookies. You can manage cookies via browser settings.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">12. International Transfers</h2>
        <p className="text-muted leading-relaxed">Data is generally stored in the EU. When transfers outside the EU are necessary, we rely on GDPR safeguards such as Standard Contractual Clauses or adequacy decisions.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">13. Children’s Data</h2>
        <p className="text-muted leading-relaxed">Our services are not intended for individuals under 16. We do not knowingly collect such data and delete it if discovered.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">14. Changes to This Policy</h2>
        <p className="text-muted leading-relaxed">We may update this policy and will always display the latest “Last Updated” date. Significant changes will be communicated.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">15. Complaints</h2>
        <p className="text-muted leading-relaxed">
          You may lodge a complaint with the Romanian National Supervisory Authority for Personal Data Processing (ANSPDCP), www.dataprotection.ro.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">16. Contact</h2>
        <p className="text-muted leading-relaxed mb-4">For privacy requests or questions:</p>
        <ul className="list-none space-y-2 text-muted leading-relaxed">
          <li><strong>Email:</strong> blueprintstudioworks@gmail.com</li>
          <li><strong>Phone:</strong> +40 749 084 150</li>
          <li><strong>Location:</strong> Timișoara, Romania</li>
        </ul>
        <p className="text-muted leading-relaxed mt-2">We typically respond within 2-3 business days.</p>
      </section>
    </>
  ),
}

export function PrivacyPage() {
  const { language, translate } = useLanguage()
  const formattedDate = new Date().toLocaleDateString(language === "ro" ? "ro-RO" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="relative">
      <div className="container-custom py-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {translate({ ro: "Înapoi la pagina principală", en: "Back to the main page" })}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="font-bold text-foreground mb-4" style={{ fontSize: "clamp(2rem, 6vw, 3.75rem)" }}>
            {translate({ ro: "Politica de Confidențialitate", en: "Privacy Policy" })}
          </h1>
          <p className="text-lg text-muted max-w-3xl mx-auto">
            {translate({ ro: "Ultima actualizare:", en: "Last updated:" })} {formattedDate}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <Card className="glass rounded-3xl shadow-2xl">
            <CardContent className="p-8 md:p-12 space-y-8">
              {language === "ro" ? privacyContent.ro : privacyContent.en}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
