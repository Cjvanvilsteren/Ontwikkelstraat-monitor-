# Environment Control Tower (Prototype)

Een zeer eenvoudig intern prototype met drie onderdelen: een overzicht van
softwareomgevingen, een releasekalender en een issue-overzicht. Bewust
geschreven als bare-minimum prototype, niet als volwaardige applicatie.

> **Let op — dit is een prototype met uitsluitend fictieve, synthetische data.**
> Alle wijzigingen blijven lokaal in de browser (localStorage). Er zijn geen
> externe API-koppelingen, authenticatie, analytics of tracking.

## Installatie en gebruik

Vereist: Node.js 20+ en npm.

```bash
npm install
npm run dev
```

Open daarna de URL die Vite toont (standaard `http://localhost:5173`).

Overige scripts:

```bash
npm run build   # Typecheck + productie-build naar dist/
npm run preview # Preview van de productie-build
npm run lint    # Oxlint
npm run test    # Vitest testsuite
```

## Wat zit erin

- **Omgevingen** — alleen-lezen tabellen, gegroepeerd per fase (Dev, Test,
  Acceptatie, Productie) zodat je in één oogopslag ziet welke omgevingen bij
  welke fase horen. Per omgeving: systeem, status, verantwoordelijke,
  kritikaliteit, versie, én de status van eventuele **leveranciersonderdelen**
  die voor die omgeving gebruikt worden (bijv. een payment API), rechtstreeks
  in dezelfde rij. Geen formulieren, geen filters — puur een overzicht.
- **Releasekalender** — alleen-lezen maandkalender. Klikken op een release
  toont titel, type, systeem, datum/tijd, status, risico en getroffen
  omgevingen in een dialoog. Hoog risico is herkenbaar aan een apart icoon,
  niet alleen aan kleur.
- **Issues** — het enige onderdeel met echte CRUD: issues toevoegen, bewerken
  en verwijderen (met bevestiging). Elk issue is gekoppeld aan een omgeving.

Er is bewust géén dashboard en géén instellingenpagina meer. Dark mode volgt
automatisch de systeemvoorkeur van de browser/OS; er is geen toggle nodig.

## Architectuur

- **React 19 + TypeScript + Vite**, **React Router** voor de drie routes
  (`/`, `/releases`, `/issues`).
- **Zustand** (`src/store/useAppStore.ts`) beheert alléén de `issues`-lijst en
  persisteert die naar `localStorage` (sleutel
  `environment-control-tower-issues`). Omgevingen, releases en systemen zijn
  statische, niet-muteerbare mockdata (`src/data/*.ts`) — er is geen CRUD op
  omgevingen/releases in deze versie.
- **Tailwind CSS v4 + eigen shadcn/ui-stijl componenten** (`src/components/ui`)
  op basis van Radix UI (dialog, select, label, slot) — alleen wat echt nodig
  is, de rest (tabs, tooltip, dropdown-menu, popover, avatar, switch,
  scroll-area, tanstack table) is verwijderd.
- **Een kleine, eigen kalendercomponent** (`src/components/releases`,
  `src/lib/calendar.ts`) met alleen een maandweergave.
- **date-fns** (Nederlandse locale) voor datumweergave.

### Projectstructuur

```
src/
  components/
    common/       Sidebar, TopNavigation, PageHeader, StatusBadge, RiskBadge,
                   CriticalityBadge, EmptyState, ConfirmDialog
    environments/  EnvironmentTable (alleen-lezen, incl. leveranciersonderdelen per rij)
    releases/      ReleaseCalendar, ReleaseChip
    issues/        IssueTable, IssueForm
    ui/            Minimale shadcn-stijl primitieven
  data/            Statische mockdata (systemen, omgevingen, releases, issues,
                   leveranciersonderdelen)
  layouts/         AppShell (sidebar + topnav + routing-outlet)
  lib/             utils, lookups, calendar, status-config
  pages/           EnvironmentsPage, ReleaseCalendarPage, IssuesPage
  routes/          router.tsx
  store/           useAppStore.ts (Zustand + persist, alleen issues)
  types/           environment.ts, release.ts, reference.ts, issue.ts, component.ts
  utils/           format.ts, dates.ts
```

## Datamodel

**Environment**: `id, name, stage, status, systemId, responsible, criticality,
version` (statisch, alleen-lezen).

**Release**: `id, title, type, systemId, environmentIds, startAt, status, risk`
(statisch, alleen-lezen).

**Issue** (het enige bewerkbare object): `id, title, environmentId, status,
severity, reportedAt, description`.

**SupplierComponent**: `id, name, supplierName, environmentId, status` — een
door een leverancier geleverd onderdeel (bijv. een payment API of SSO-koppeling)
dat een specifieke omgeving gebruikt, met een eigen status.

- `status` (environment / supplier component): Healthy · Degraded · Maintenance · Incident
- `status` (release): Planned · In Progress · Completed · Delayed · Cancelled
- `status` (issue): Open · In Progress · Resolved
- `criticality` / `severity` / `risk`: Low · Medium · High

Mockdata: 4 systemen (iOS App, Android App, Web, Klantenservice Tool) × 4 fasen
= 16 omgevingen, 8 releases, 7 issues, 8 leveranciersonderdelen.

## Lokale dataopslag

Alleen de issues-lijst wordt gepersisteerd naar `localStorage`. Omgevingen en
releases zijn vaste mockdata en veranderen niet tijdens gebruik. Er worden
geen netwerkverzoeken gedaan.

## Tests

```bash
npm run test
```

Dekt status-mapping (`src/lib/status-config.test.ts`) en de issues-store
inclusief toevoegen, bewerken, verwijderen en localStorage-persistentie
(`src/store/useAppStore.test.ts`).

## Logische vervolgstappen

Mocht dit prototype doorgroeien naar een echte applicatie:

1. CRUD toevoegen voor omgevingen en releases (nu bewust alleen-lezen).
2. Een backend/API met een echte database in plaats van localStorage.
3. Authenticatie en rollen per team.
4. Koppeling tussen issues en releases (bijv. "dit issue is opgelost door
   release X").
5. Een dashboard met KPI's, zodra duidelijk is welke cijfers er echt toe doen.

## Privacyverklaring

Dit prototype gebruikt uitsluitend lokale, fictieve en synthetische mockdata.
Er komen geen namen, gegevens of logo's van bestaande organisaties in voor. De
applicatie maakt geen externe API-verbindingen, verzendt geen gegevens naar
externe diensten en bevat geen analytics of tracking. Alleen de issues die je
zelf toevoegt/wijzigt blijven lokaal opgeslagen in de browser (`localStorage`).
