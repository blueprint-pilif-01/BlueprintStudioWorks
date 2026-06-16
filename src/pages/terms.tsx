import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const termsContent = {
  ro: (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">1. Introducere</h2>
        <p className="text-muted leading-relaxed mb-4">
          Bine ați venit la Blueprint Studio Works. Acești Termeni și Condiții reglementează utilizarea serviciilor noastre de dezvoltare web și relația contractuală dintre Blueprint Studio Works (denumit în continuare „Prestatorul”, „noi” sau „al nostru”) și client (denumit în continuare „Clientul”, „dumneavoastră” sau „al dumneavoastră”).
        </p>
        <p className="text-muted leading-relaxed">
          Prin accesarea și folosirea serviciilor noastre, confirmați că sunteți de acord cu acești termeni. Dacă nu sunteți de acord cu oricare dintre ei, vă rugăm să nu utilizați serviciile Blueprint Studio Works.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">2. Definiții</h2>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li><strong>Servicii:</strong> Serviciile de dezvoltare web, design și consultanță oferite de Blueprint Studio Works.</li>
          <li><strong>Proiect:</strong> Lucrările specifice agreate între Prestator și Client, definite în Contractul de Servicii.</li>
          <li><strong>Livrabil:</strong> Rezultatul final al proiectului, conform specificațiilor acceptate.</li>
          <li><strong>Pachet:</strong> Oferta predefinită de servicii (Site Simplu, Site Complex, Site Complex + Backend, E-commerce).</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">3. Pachete și Servicii</h2>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">3.1 Site Simplu (400 EUR)</h3>
        <p className="text-muted leading-relaxed mb-2">Include:</p>
        <ul className="list-disc list-inside space-y-1 text-muted leading-relaxed ml-4">
          <li>1-5 pagini (Home, About, Contact, Services)</li>
          <li>Design modern și responsive (desktop + mobil)</li>
          <li>Formular de contact funcțional</li>
          <li>Optimizare SEO de bază</li>
          <li>1 lună de hosting gratuit</li>
        </ul>

        <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">3.2 Site Complex (750 EUR)</h3>
        <p className="text-muted leading-relaxed mb-2">Include tot din Site Simplu, plus:</p>
        <ul className="list-disc list-inside space-y-1 text-muted leading-relaxed ml-4">
          <li>5-15 pagini dinamice</li>
          <li>Blog/Noutăți cu panou de administrare</li>
          <li>Galerii foto/video animate</li>
          <li>Formulare avansate</li>
          <li>Optimizări SEO avansate</li>
          <li>Integrare Google Analytics</li>
        </ul>

        <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">3.3 Site Complex + Backend (1200 EUR)</h3>
        <p className="text-muted leading-relaxed mb-2">Include tot din Site Complex, plus:</p>
        <ul className="list-disc list-inside space-y-1 text-muted leading-relaxed ml-4">
          <li>Backend custom (Node.js/Express)</li>
          <li>Bază de date (PostgreSQL sau MongoDB)</li>
          <li>API-uri REST pentru integrări</li>
          <li>Autentificare și management utilizatori</li>
          <li>Dashboard pentru administrarea conținutului</li>
          <li>Securitate avansată și backup automat</li>
        </ul>

        <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">3.4 E-commerce (1600 EUR)</h3>
        <p className="text-muted leading-relaxed mb-2">Include tot din Site Complex + Backend, plus:</p>
        <ul className="list-disc list-inside space-y-1 text-muted leading-relaxed ml-4">
          <li>Magazin online complet</li>
          <li>Coș de cumpărături și checkout securizat</li>
          <li>Integrare plăți (Stripe, PayPal)</li>
          <li>Gestionare stocuri și facturi</li>
          <li>Integrare livrare</li>
          <li>Conturi clienți și notificări automate</li>
        </ul>

        <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">3.5 Servicii Suplimentare</h3>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li><strong>Hosting:</strong> 30 EUR/lună, hosting profesional.</li>
          <li><strong>Suport Premium:</strong> 100 EUR/lună, modificări nelimitate și asistență prioritară (prima lună gratuită, minim 3 luni).</li>
          <li><strong>Hosting + Suport Premium:</strong> 120 EUR/lună, pachet complet.</li>
          <li><strong>O zi de modificări:</strong> 40 EUR, zi prestabilită pentru actualizări majore.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">4. Comenzi și Plăți</h2>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">4.1 Solicitare ofertă</h3>
        <p className="text-muted leading-relaxed mb-4">
          Ne puteți contacta prin formularul de pe site, la blueprintstudioworks@gmail.com sau la +40 749 084 150.
        </p>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">4.2 Contract și acord</h3>
        <p className="text-muted leading-relaxed mb-4">
          După discuțiile inițiale livrăm un Contract de Servicii cu specificațiile, termenele și costurile agreate. Proiectul începe doar după semnarea contractului și plata avansului.
        </p>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">4.3 Structură de plată</h3>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li>Avans: 50% la semnarea contractului</li>
          <li>Plată finală: 50% la livrare, înainte de lansare</li>
          <li>Servicii recurente: facturate lunar în avans</li>
        </ul>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">4.4 Metode de plată</h3>
        <p className="text-muted leading-relaxed mb-4">Acceptăm transfer bancar, card și metode agreate mutual. Toate sumele sunt în EUR și includ TVA, acolo unde este cazul.</p>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">4.5 Întârzieri</h3>
        <p className="text-muted leading-relaxed">
          Pentru întârzieri peste 14 zile putem suspenda lucrul; peste 30 de zile se poate aplica penalitate de 0,1%/zi din suma restantă.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">5. Proces de Dezvoltare</h2>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">5.1 Timeline</h3>
        <p className="text-muted leading-relaxed mb-4">Termenele sunt estimative și depind de complexitate și de rapiditatea feedback-ului.</p>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">5.2 Feedback & revizii</h3>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li>Site Simplu: 2 runde</li>
          <li>Site Complex: 3 runde</li>
          <li>Site Complex + Backend: 4 runde</li>
          <li>E-commerce: 5 runde</li>
        </ul>
        <p className="text-muted leading-relaxed mt-2">Extra reviziile costă 40 EUR/zi sau sunt incluse în abonamentul de Suport Premium.</p>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">5.3 Modificări majore</h3>
        <p className="text-muted leading-relaxed mb-4">
          Modificările în afara scopului inițial sunt estimate separat. O „zi de modificări” acoperă aproximativ 6-8 ore de lucru. Modificările foarte complexe pot necesita costuri suplimentare, comunicate din timp.
        </p>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">5.4 Conținut</h3>
        <p className="text-muted leading-relaxed">
          Clientul furnizează toate materialele (texte, imagini, logo-uri) și garantează dreptul de utilizare. Nu răspundem pentru încălcări de copyright provenite din conținutul livrat de client.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">6. Proprietate Intelectuală</h2>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">6.1 Drepturile Clientului</h3>
        <p className="text-muted leading-relaxed mb-4">
          După plata integrală, clientul deține toate drepturile asupra codului și designului create special pentru proiect, inclusiv dreptul de modificare și distribuire.
        </p>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">6.2 Drepturile Prestatorului</h3>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li>Include proiectul în portofoliu</li>
          <li>Folosește capturi și descrieri pentru marketing</li>
          <li>Reutilizează componente generice dezvoltate</li>
          <li>Poate afișa „Powered by Blueprint Studio Works” (opțional)</li>
        </ul>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">6.3 Biblioteci terțe</h3>
        <p className="text-muted leading-relaxed">Folosim biblioteci open-source conform licențelor acestora; ele nu sunt proprietatea noastră.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">7. Garanții și Suport</h2>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">7.1 Perioadă de garanție</h3>
        <p className="text-muted leading-relaxed mb-4">30 de zile de la lansare pentru remedierea erorilor apărute în folosire normală.</p>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">7.2 Excluderi</h3>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li>Modificări făcute de client sau terți</li>
          <li>Probleme de hosting sau infrastructură</li>
          <li>Incompatibilități cu plugin-uri instalate ulterior</li>
          <li>Schimbări de cerințe după livrare</li>
          <li>Actualizări de browser/OS</li>
        </ul>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">7.3 Suport post-lansare</h3>
        <p className="text-muted leading-relaxed">
          După garanție oferim Suport Premium (100 EUR/lună), servicii ad-hoc (40 EUR/zi) sau contracte personalizate.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">8. Hosting și Domeniu</h2>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">8.1 Hosting</h3>
        <p className="text-muted leading-relaxed mb-4">30 EUR/lună, include spațiu, SSL, backup-uri săptămânale, monitorizare și suport tehnic de bază.</p>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">8.2 Domeniu</h3>
        <p className="text-muted leading-relaxed mb-4">Costul domeniului nu este inclus. Clientul îl poate achiziționa direct sau ne poate împuternici să-l cumpărăm (cost + 10 EUR taxă administrativă).</p>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">8.3 Migrare</h3>
        <p className="text-muted leading-relaxed">Oferim migrare la alt furnizor (inclus în Suport Premium sau 50-150 EUR, în funcție de complexitate).</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">9. Confidențialitate și Protecția Datelor</h2>
        <p className="text-muted leading-relaxed">
          Respectăm GDPR și Politica noastră de Confidențialitate. Datele sunt procesate doar în scopurile necesare prestării serviciilor.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">10. Limitarea răspunderii</h2>
        <p className="text-muted leading-relaxed mb-4">
          În limita maximă permisă de lege, nu răspundem pentru pierderi indirecte, pierderi de profit, date sau pentru daune ce depășesc suma achitată pentru serviciul în cauză. Nu răspundem pentru situații de forță majoră, atacuri cibernetice sau defecțiuni ale infrastructurii.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">11. Rezilierea contractului</h2>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">11.1 Reziliere de către Client</h3>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li>Avansul nu se rambursează</li>
          <li>Clientul plătește munca efectuată până la data notificării</li>
          <li>Predăm tot codul și materialele realizate până în acel moment</li>
        </ul>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">11.2 Reziliere de către Prestator</h3>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li>Neplata facturilor peste 30 de zile</li>
          <li>Comportament abuziv sau lipsă de colaborare</li>
          <li>Solicitări care încalcă legea sau etica profesională</li>
        </ul>
        <p className="text-muted leading-relaxed">
          În aceste cazuri, Clientul primește o rambursare proporțională pentru serviciile neefectuate, după deducerea costurilor suportate.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">12. Modificarea termenilor</h2>
        <p className="text-muted leading-relaxed">
          Putem actualiza periodic acești termeni, iar versiunea curentă va fi publicată pe site cu data „Ultima actualizare”. Pentru proiectele în derulare se aplică termenii contractului semnat.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">13. Legea aplicabilă și jurisdicție</h2>
        <p className="text-muted leading-relaxed">
          Termenii sunt guvernați de legea română. Litigiile se soluționează pe cale amiabilă sau de instanțele competente din Timișoara.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">14. Contact</h2>
        <p className="text-muted leading-relaxed mb-4">
          Pentru întrebări legate de acești termeni, ne puteți contacta la:
        </p>
        <ul className="list-none space-y-2 text-muted leading-relaxed">
          <li><strong>Email:</strong> blueprintstudioworks@gmail.com</li>
          <li><strong>Telefon:</strong> +40 749 084 150</li>
          <li><strong>Locație:</strong> Timișoara, România</li>
        </ul>
      </section>
    </>
  ),
  en: (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
        <p className="text-muted leading-relaxed mb-4">
          Welcome to Blueprint Studio Works. These Terms and Conditions govern the use of our web development services and the contractual relationship between Blueprint Studio Works (the “Provider,” “we,” or “our”) and the client (the “Client,” “you,” or “your”).
        </p>
        <p className="text-muted leading-relaxed">
          By accessing and using our services, you agree to these terms. If you do not agree with any of them, please refrain from using our services.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">2. Definitions</h2>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li><strong>Services:</strong> The web development, design, and consulting services provided by Blueprint Studio Works.</li>
          <li><strong>Project:</strong> The specific work agreed upon between the Provider and the Client, defined in the Service Contract.</li>
          <li><strong>Deliverable:</strong> The final result of the project as specified in the agreement.</li>
          <li><strong>Package:</strong> The predefined service offers (Simple Site, Complex Site, Complex Site + Backend, E-commerce).</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">3. Packages and Services</h2>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">3.1 Simple Site (400 EUR)</h3>
        <p className="text-muted leading-relaxed mb-2">Includes:</p>
        <ul className="list-disc list-inside space-y-1 text-muted leading-relaxed ml-4">
          <li>1-5 pages (Home, About, Contact, Services)</li>
          <li>Modern, responsive design (desktop + mobile)</li>
          <li>Functional contact form</li>
          <li>Basic SEO optimization</li>
          <li>1 month free hosting</li>
        </ul>

        <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">3.2 Complex Site (750 EUR)</h3>
        <p className="text-muted leading-relaxed mb-2">Includes all features from the Simple Site, plus:</p>
        <ul className="list-disc list-inside space-y-1 text-muted leading-relaxed ml-4">
          <li>5-15 dynamic pages</li>
          <li>Blog/News section with admin panel</li>
          <li>Animated photo/video galleries</li>
          <li>Advanced forms</li>
          <li>Advanced SEO optimization</li>
          <li>Google Analytics integration</li>
        </ul>

        <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">3.3 Complex Site + Backend (1200 EUR)</h3>
        <p className="text-muted leading-relaxed mb-2">Includes all features from the Complex Site, plus:</p>
        <ul className="list-disc list-inside space-y-1 text-muted leading-relaxed ml-4">
          <li>Custom backend using Node.js/Express</li>
          <li>Database (PostgreSQL or MongoDB)</li>
          <li>REST APIs for integrations</li>
          <li>Authentication and user management</li>
          <li>Admin dashboard for content management</li>
          <li>Advanced security and automatic backups</li>
        </ul>

        <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">3.4 E-commerce (1600 EUR)</h3>
        <p className="text-muted leading-relaxed mb-2">Includes all features from the Complex Site + Backend, plus:</p>
        <ul className="list-disc list-inside space-y-1 text-muted leading-relaxed ml-4">
          <li>Fully functional online store</li>
          <li>Shopping cart and secure checkout</li>
          <li>Payment integration (Stripe, PayPal)</li>
          <li>Inventory and invoice management</li>
          <li>Shipping integration</li>
          <li>Customer accounts and email notifications</li>
        </ul>

        <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">3.5 Additional Services</h3>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li><strong>Hosting:</strong> 30 EUR/month, Professional hosting for your website</li>
          <li><strong>Premium Support:</strong> 100 EUR/month, Unlimited edits and priority assistance (first month free, minimum 3-month commitment)</li>
          <li><strong>Hosting + Premium Support:</strong> 120 EUR/month, Complete package</li>
          <li><strong>One day of changes:</strong> 40 EUR, Pre-scheduled day for major updates</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">4. Orders and Payments</h2>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">4.1 Requesting an Offer</h3>
        <p className="text-muted leading-relaxed mb-4">
          Clients can request a quote via the contact form, by email at blueprintstudioworks@gmail.com, or by phone at +40 749 084 150.
        </p>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">4.2 Contract and Agreement</h3>
        <p className="text-muted leading-relaxed mb-4">
          After initial discussions we provide a detailed Service Contract outlining specifications, timeline, and costs. The project starts only after the contract is signed and the deposit is received.
        </p>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">4.3 Payment Structure</h3>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li>Deposit: 50% of the total value, due at signing</li>
          <li>Final payment: 50% upon delivery, before the official launch</li>
          <li>Recurring services: invoiced monthly in advance</li>
        </ul>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">4.4 Payment Methods</h3>
        <p className="text-muted leading-relaxed mb-4">We accept bank transfer, credit/debit card, or other agreed methods. Prices are in EUR and include VAT where applicable.</p>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">4.5 Late Payments</h3>
        <p className="text-muted leading-relaxed">
          If payments are delayed more than 14 days, we may suspend the work. For delays over 30 days, a 0.1%/day penalty may apply.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">5. Development Process</h2>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">5.1 Timeline</h3>
        <p className="text-muted leading-relaxed mb-4">Timelines are indicative and depend on project complexity and how quickly we receive feedback.</p>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">5.2 Feedback and Revisions</h3>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li>Simple Site: 2 rounds</li>
          <li>Complex Site: 3 rounds</li>
          <li>Complex Site + Backend: 4 rounds</li>
          <li>E-commerce: 5 rounds</li>
        </ul>
        <p className="text-muted leading-relaxed mt-2">Additional revisions cost 40 EUR/day or are included in the Premium Support plan.</p>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">5.3 Major Changes</h3>
        <p className="text-muted leading-relaxed mb-4">
          Major changes outside the initial scope are estimated separately. A “day of changes” covers about 6-8 hours of work. Extremely complex requests may incur extra fees, communicated beforehand.
        </p>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">5.4 Content</h3>
        <p className="text-muted leading-relaxed">
          The client provides all materials (copy, images, logos) and guarantees usage rights. We are not responsible for copyright infringements arising from client-supplied assets.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">6. Intellectual Property</h2>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">6.1 Client Rights</h3>
        <p className="text-muted leading-relaxed mb-4">
          Upon full payment, the client owns the source code and design created for the project, including the right to modify, distribute, and use them for any lawful purpose.
        </p>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">6.2 Provider Rights</h3>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li>Showcase the project in our portfolio</li>
          <li>Use screenshots and descriptions for marketing</li>
          <li>Reuse generic components or frameworks</li>
          <li>Display a “Powered by Blueprint Studio Works” footer mention (removable on request)</li>
        </ul>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">6.3 Third-Party Libraries</h3>
        <p className="text-muted leading-relaxed">Open-source libraries are used under their respective licenses; they remain the property of their owners.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">7. Warranty and Support</h2>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">7.1 Warranty Period</h3>
        <p className="text-muted leading-relaxed mb-4">30 days from launch to fix bugs that appear during normal usage.</p>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">7.2 Warranty Exclusions</h3>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li>Changes made by the client or third parties</li>
          <li>Hosting or infrastructure issues</li>
          <li>Conflicts with plugins added later</li>
          <li>Scope changes after delivery</li>
          <li>Browser/OS updates</li>
        </ul>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">7.3 Post-Launch Support</h3>
        <p className="text-muted leading-relaxed">
          After the warranty, support is available via Premium Support (100 EUR/month), ad-hoc services (40 EUR/day), or custom maintenance agreements.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">8. Hosting and Domain</h2>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">8.1 Hosting Services</h3>
        <p className="text-muted leading-relaxed mb-4">30 EUR/month, includes storage, SSL, weekly backups, uptime monitoring, and basic technical support.</p>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">8.2 Domain</h3>
        <p className="text-muted leading-relaxed mb-4">Domain costs are not included. Clients may purchase the domain themselves or request that we handle it (cost + 10 EUR administrative fee).</p>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">8.3 Migration</h3>
        <p className="text-muted leading-relaxed">We can help migrate the website to another provider. This is included in Premium Support or billed separately (50-150 EUR depending on complexity).
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">9. Confidentiality and Data Protection</h2>
        <p className="text-muted leading-relaxed">
          We protect client information in accordance with our Privacy Policy and comply with GDPR and applicable Romanian law.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">10. Limitation of Liability</h2>
        <p className="text-muted leading-relaxed mb-4">
          To the extent permitted by law, Blueprint Studio Works is not liable for indirect, incidental, or consequential damages, loss of profits, revenue, or data, or damages exceeding the total amount paid for the service. We are not liable for factors beyond our control (force majeure, cyberattacks, infrastructure failures).
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">11. Contract Termination</h2>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">11.1 Termination by Client</h3>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li>The deposit is non-refundable</li>
          <li>The client pays for all work completed up to termination</li>
          <li>We deliver all code and materials produced to date</li>
        </ul>
        <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">11.2 Termination by Provider</h3>
        <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed ml-4">
          <li>Invoices remain unpaid for more than 30 days</li>
          <li>Abusive behavior or refusal to cooperate</li>
          <li>Requests that violate law or professional ethics</li>
        </ul>
        <p className="text-muted leading-relaxed">
          In such cases, the client receives a proportional refund for services not rendered, after deducting incurred costs.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">12. Changes to the Terms</h2>
        <p className="text-muted leading-relaxed">
          We may update these Terms periodically. Updates will be published here with a new “Last Updated” date. For ongoing projects, the version signed in the Service Contract prevails.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">13. Governing Law and Jurisdiction</h2>
        <p className="text-muted leading-relaxed">
          These terms are governed by Romanian law. Disputes are resolved amicably or by the competent courts in Timișoara, Romania.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">14. Contact</h2>
        <p className="text-muted leading-relaxed mb-4">
          For any questions regarding these Terms and Conditions, contact us at:
        </p>
        <ul className="list-none space-y-2 text-muted leading-relaxed">
          <li><strong>Email:</strong> blueprintstudioworks@gmail.com</li>
          <li><strong>Phone:</strong> +40 749 084 150</li>
          <li><strong>Location:</strong> Timișoara, Romania</li>
        </ul>
      </section>
    </>
  ),
}

export function TermsPage() {
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
            {translate({ ro: "Termeni și Condiții", en: "Terms & Conditions" })}
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
              {language === "ro" ? termsContent.ro : termsContent.en}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
