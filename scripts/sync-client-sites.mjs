import { access, cp, mkdir, readFile, rm, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import process from "node:process"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, "..")
const clientSitesDir = path.join(rootDir, "public", "client-sites")
const configPath = path.join(rootDir, "config", "site-tracker.json")

const log = (message) => console.log(`[site-tracker] ${message}`)
const warn = (message) => console.warn(`[site-tracker] ${message}`)

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true })
}

async function syncSite(site) {
  if (!site.name || !site.slug) {
    warn(`Configuratia pentru site este incompletă: ${JSON.stringify(site)}`)
    return
  }

  if (!site.sourceDir) {
    warn(`Configuratia pentru ${site.name} nu include "sourceDir"`)
    return
  }

  const sourcePath = path.resolve(rootDir, site.sourceDir)
  const destinationPath = path.join(clientSitesDir, site.slug)
  const baseHref = `/client-sites/${site.slug}/`

  log(`Procesez ${site.name}...`)
  log(`  Sursă: ${sourcePath}`)
  log(`  Destinație: ${destinationPath}`)

  try {
    await access(sourcePath)
  } catch (error) {
    const projectDir = path.dirname(sourcePath)
    warn(`Sursa lipsă pentru ${site.name} la ${sourcePath}`)
    warn(`  Rulează "npm run build" în ${projectDir}`)
    warn(`  Eroare: ${error.message}`)
    return
  }

  try {
    await rm(destinationPath, { recursive: true, force: true })
    await ensureDir(path.dirname(destinationPath))
    await cp(sourcePath, destinationPath, { recursive: true })
    log(`  Copiat cu succes`)
  } catch (error) {
    warn(`Eroare la copierea ${site.name}: ${error.message}`)
    throw error
  }

  const indexPath = path.join(destinationPath, "index.html")

  try {
    let html = await readFile(indexPath, "utf8")

    // Remove any existing base tags and tracker scripts
    html = html
      .replace(/<base[^>]*>\s*/gi, "")
      .replace(/<script[^>]+data-bsw="site-tracker-bootstrap"[^>]*>[\s\S]*?<\/script>\s*/gi, "")

    // Fix absolute asset paths to be relative
    // Replace absolute paths like "/assets/..." with "./assets/..."
    html = html.replace(/(src|href)=(["'])(\/assets\/[^"']+)\2/gi, (match, attr, quote, path) => {
      // Convert /assets/file.js to ./assets/file.js
      return `${attr}=${quote}.${path}${quote}`
    })
    
    // Fix other absolute paths that aren't external URLs (like /favicon.ico, /logo.png, etc.)
    html = html.replace(/(src|href)=(["'])(\/(?!\/|https?:|mailto:|tel:|#)[^"']+)\2/gi, (match, attr, quote, path) => {
      // Skip if it's already a relative path or external URL
      if (path.startsWith('./') || path.startsWith('../') || path.startsWith('http') || path.startsWith('//')) {
        return match
      }
      // Convert absolute path to relative (e.g., /favicon.ico -> ./favicon.ico)
      return `${attr}=${quote}.${path}${quote}`
    })

    const injection = [
      `<base data-bsw="site-tracker-base" href="${baseHref}">`,
      `<script data-bsw="site-tracker-bootstrap">
(function(){
  try {
    var slug = "${site.slug}";
    var siteName = "${site.name}";
    var targetPath = "/";
    var originalPushState = history.pushState;
    var originalReplaceState = history.replaceState;

    function notifyParent() {
      try {
        var payload = {
          source: "bsw-site-tracker",
          slug: slug,
          siteName: siteName,
          path: window.location.pathname + window.location.search + window.location.hash
        };
        if (window.parent && window.parent !== window && typeof window.parent.postMessage === "function") {
          window.parent.postMessage(payload, "*");
        }
      } catch (notifyError) {
        console.warn("[site-tracker] notify error", notifyError);
      }
    }

    function patchHistory() {
      history.pushState = function patchedPushState() {
        var result = originalPushState.apply(history, arguments);
        notifyParent();
        return result;
      };

      history.replaceState = function patchedReplaceState() {
        var result = originalReplaceState.apply(history, arguments);
        notifyParent();
        return result;
      };
    }

    window.addEventListener("popstate", notifyParent);

    if (window.location.pathname !== targetPath) {
      originalReplaceState.call(history, null, "", targetPath);
    }

    patchHistory();

    window.__BSW_SITE_SLUG = slug;
    window.__BSW_SITE_NAME = siteName;

    notifyParent();
  } catch (error) {
    console.warn("[site-tracker] history patch failed", error);
  }
})();
</script>`
    ].join("\n    ")

    // Insert base tag and script at the very beginning of <head> to ensure it's processed first
    html = html.replace(/<head([^>]*)>/i, `<head$1>\n    ${injection}\n`)
    
    // Also fix CSS url() references that use absolute paths
    html = html.replace(/url\((["']?)(\/assets\/[^"')]+)\1\)/gi, (match, quote, path) => {
      return `url(${quote}.${path}${quote})`
    })
    
    html = html.replace(/url\((["']?)(\/(?!\/|https?:|data:)[^"')]+)\1\)/gi, (match, quote, path) => {
      // Skip if it's already relative or external
      if (path.startsWith('./') || path.startsWith('../') || path.startsWith('http') || path.startsWith('//') || path.startsWith('data:')) {
        return match
      }
      return `url(${quote}.${path}${quote})`
    })
    await writeFile(indexPath, html, "utf8")
  } catch (error) {
    warn(`Nu am putut insera metadata pentru ${site.name}: ${error.message}`)
  }

  log(`Am sincronizat ${site.name} → ${destinationPath.replace(rootDir, ".")}`)
}

async function main() {
  try {
    log(`Încep sincronizarea site-urilor client...`)
    log(`  Root dir: ${rootDir}`)
    log(`  Config: ${configPath}`)
    log(`  Destinație: ${clientSitesDir}`)

    const configRaw = await readFile(configPath, "utf8")
    const trackerConfig = JSON.parse(configRaw)
    
    if (!trackerConfig || typeof trackerConfig !== 'object') {
      throw new Error(`Config invalid: ${typeof trackerConfig}`)
    }

    const sites = Array.isArray(trackerConfig?.sites) ? trackerConfig.sites : []
    
    if (sites.length === 0) {
      warn(`Nu s-au găsit site-uri în configurație`)
      return
    }

    log(`Găsite ${sites.length} site-uri de sincronizat`)

    await ensureDir(clientSitesDir)

    for (const site of sites) {
      try {
        await syncSite(site)
      } catch (error) {
        warn(`Eroare la sincronizarea ${site?.name || 'unknown'}: ${error.message}`)
        // Continuă cu următorul site
      }
    }

    log(`Sincronizare completă!`)
  } catch (error) {
    console.error(`[site-tracker] Eroare critică:`, error)
    throw error
  }
}

main().catch((error) => {
  console.error("[site-tracker] Eroare la sincronizarea site-urilor:", error)
  process.exit(1)
})
