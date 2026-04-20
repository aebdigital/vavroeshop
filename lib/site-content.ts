export type NavItem = {
  href: string;
  label: string;
};

export type PartnerLogo =
  | {
      kind: "image";
      alt: string;
      src: string;
    }
  | {
      kind: "text";
      label: string;
    };

export type GalleryImage = {
  alt: string;
  src: string;
};

export type ServiceSection = {
  body: string[];
  id: string;
  images?: GalleryImage[];
  title: string;
};

export type ServicePageData = {
  description: string;
  heroImage: string;
  kind: "service";
  navHref: string;
  sections: ServiceSection[];
  slug: string;
  title: string;
};

export type GroupedServiceSubpageData = {
  body: string[];
  description: string;
  images?: GalleryImage[];
  slug: string;
  title: string;
};

export type GroupedServicePageData = {
  description: string;
  heroImage: string;
  navHref: string;
  overview: string[];
  slug: string;
  subservices: GroupedServiceSubpageData[];
  title: string;
};

export type LegalPageData = {
  blocks: string[];
  description: string;
  intro?: string;
  kind: "legal";
  slug: string;
  title: string;
};

export type SitePageData = ServicePageData | LegalPageData;

export type HomeServiceCard = {
  href: string;
  image: string;
  title: string;
};

export type HomePageData = {
  about: {
    intro: string[];
    leftImage: string;
    rightImage: string;
    rightText: string[];
    stats: Array<{
      label: string;
      value: string;
    }>;
    title: string;
  };
  description: string;
  heroButton: NavItem;
  heroImages: string[];
  heroSubtitle: string;
  heroTitle: string;
  partners: PartnerLogo[];
  services: HomeServiceCard[];
  title: string;
};

export type SocialLink = {
  href: string;
  icon: "facebook" | "instagram" | "map" | "tiktok" | "whatsapp";
  label: string;
};

const upload = (path: string) => `/assets/uploads/${path}`;

const gallery = (title: string, paths: string[]): GalleryImage[] =>
  paths.map((path, index) => ({
    alt: `${title} ${index + 1}`,
    src: upload(path),
  }));

export const siteBrand = {
  alt: "Vavrostav",
  logo: upload("2025/05/0d14c38b-9028-49c2-af84-09a9ef8e4d90.png"),
  name: "Vavrostav",
};

export const mainNav: NavItem[] = [
  { href: "/", label: "Domov" },
  { href: "/kurenarske-prace", label: "Kurenárske práce" },
  { href: "/klimatizacie", label: "Klimatizácie" },
  { href: "/vodoinstalaterske-prace", label: "Vodoinštalatérske práce" },
  { href: "/odpady-a-kanalizacie", label: "Odpady a kanalizácie" },
  { href: "/kontakt", label: "Kontakt" },
];

export const footerLinkGroups = [
  {
    links: mainNav,
    title: "Navigácia",
  },
  {
    links: [
      { href: "/cookies", label: "Cookies" },
      { href: "/ochrana-osobnych-udajov", label: "Ochrana osobných údajov" },
    ],
    title: "Legal",
  },
];

export const contactDetails = {
  address: ["Hlavná 355/109", "972 11 Lazany"],
  company: "VAVROSTAV s.r.o.",
  email: "info@vavrostav.sk",
  ico: "51096421",
  icDph: "SK2120584708",
  dic: "2120584708",
  mapHref:
    "https://www.google.com/maps/place//data=!4m2!3m1!1s0x4714dde582459037:0x5060c67a26a96324?sa=X&ved=1t:8290&ictx=111",
  mapEmbedSrc:
    "https://www.google.com/maps?q=VAVROSTAV%20s.r.o.%2C%20Hlavn%C3%A1%20355%2F109%2C%20972%2011%20Lazany&z=16&output=embed",
  phone: "+421 917 163 249",
  phoneHref: "tel:+421917163249",
};

export const socialLinks: SocialLink[] = [
  { href: "https://www.facebook.com/VavroStav", icon: "facebook", label: "Facebook" },
  {
    href: "https://www.instagram.com/vavrostavsro?igsh=eHFhd29naHRxMHQ%3D&utm_source=qr",
    icon: "instagram",
    label: "Instagram",
  },
  { href: "https://wa.me/+421917163249", icon: "whatsapp", label: "WhatsApp" },
  { href: "https://www.tiktok.com/@vavrostav?_t=ZN-8xCtO6wS9h8&_r=1", icon: "tiktok", label: "TikTok" },
  { href: contactDetails.mapHref, icon: "map", label: "Mapa" },
];

export const homePage: HomePageData = {
  about: {
    intro: [
      "Sme firma, ktorá má rada nové technológie a inovácie. Snažíme sa stále zdokonalovať a rozvíjať. Záruka. Kvalita. Odbornosť. Rýchlosť. Dobre odvedená práca = spokojný zákazník. A spokojnému zákazníkovi sa nevyrovná žiadna reklama. Vážime si každého zákazníka, pretože Vy nám dávate prácu, ktorá nás baví.",
    ],
    leftImage: upload("2026/04/blurred.png"),
    rightImage: upload("2025/05/IMG_1846.jpg"),
    rightText: [
      "Práca v inštalatérskom priemysle, ale aj v stavebníctve je rozmanitá a krásna v tom, že sa stále vyvíjajú novšie a lepšie spôsoby, ako svoju prácu vylepšovať. Objavujú sa kvalitnejšie materiály, ktoré sú odolnejšie a zdravotne nezávadné.",
      "Snaha vyhovieť zákazníkovi prinútila technológov vyvíjať rýchle a jednoduché inštalácie, ktoré urýchľujú prácu.",
    ],
    stats: [
      { label: "rokov skúseností", value: "15+" },
      { label: "spokojných zákazníkov", value: "1000+" },
    ],
    title: "S čím Vám pomôžeme?",
  },
  description: "Kúrenárske práce, klimatizácie, vodoinštalatérske práce a odpady na mieru.",
  heroButton: {
    href: "/kontakt",
    label: "Objednať",
  },
  heroImages: [
    upload("2025/05/IMG_4086.jpg"),
    upload("2025/05/IMG_3742.jpg"),
    upload("2025/05/IMG_0048.jpg"),
    upload("2025/05/IMG_0117.jpg"),
    upload("2025/05/IMG_2923.jpg"),
    upload("2025/05/IMG_0107-2.jpg"),
    upload("2025/05/IMG_8513.jpg"),
  ],
  heroSubtitle: "Od roku 2009 zbierame skúsenosti vďaka ktorým vždy dodáme tie najlepšie výsledky",
  heroTitle: "Energia a inovácie\nv každej kvapke",
  partners: [
    { kind: "text", label: "GEBERIT" },
    { alt: "Bosch", kind: "image", src: upload("2025/05/Bosch-logo.svg.png") },
    { alt: "Empiria", kind: "image", src: upload("2025/05/images.png") },
    { alt: "Zealux", kind: "image", src: upload("2025/05/LOGO.png") },
    { alt: "Ptáček", kind: "image", src: upload("2025/05/ptacek_150px_trans.png") },
    { alt: "Viega", kind: "image", src: upload("2025/05/Viega_Logo.svg.png") },
  ],
  services: [
    { href: "/kurenarske-prace", image: upload("2025/05/IMG_3742.jpg"), title: "Kúrenie" },
    { href: "/vodoinstalaterske-prace", image: upload("2025/05/IMG_0117.jpg"), title: "Voda" },
    {
      href: "/odpady-a-kanalizacie",
      image: upload("2025/05/5556a87b-02e0-49bd-8fe9-ebffb716b825.jpg"),
      title: "Odpady",
    },
    { href: "/klimatizacie", image: upload("2025/05/IMG_0107-2.jpg"), title: "Klimatizácie" },
  ],
  title: "Vavrostav",
};

export const servicePages: ServicePageData[] = [
  {
    description:
      "Komplexné kúrenárske práce od rozvodov kúrenia až po tepelné čerpadlá, podlahové kúrenie a kotly.",
    heroImage: upload("2025/05/IMG_4915-1024x768.jpg"),
    kind: "service",
    navHref: "/kurenarske-prace",
    sections: [
      {
        body: [
          "Kvalitné rozvody kúrenia sú základom každého spoľahlivého vykurovacieho systému. Náš tím kladie dôraz na precíznu trasu vedenia trubiek, správny výber materiálov a dokonalé zvary bez rizika netesností. Vďaka moderným technológiám vieme zabezpečiť rýchly a čistý priebeh montáže aj v existujúcich objektoch.",
          "Po dokončení inštalácie systém odprúdnime a otestujeme, aby ste mohli kúriť bez obáv. Samozrejmosťou je odborné poradenstvo pri plánovaní i následná údržba.",
        ],
        id: "rozvody-kurenia",
        title: "Rozvody kúrenia",
      },
      {
        body: [
          "Naša inštalačná firma sa špecializuje na návrh a montáž moderných tepelných čerpadiel, ktoré zabezpečia výrazné úspory energie vo vašej domácnosti či prevádzke. Priestor starostlivo zmeriame a navrhneme optimálne riešenie podľa vášho rozpočtu aj požiadaviek.",
          "Následná inštalácia prebieha hladko a bez prerušenia chodu vašej prevádzky. Po odovzdaní systému zabezpečíme aj pravidelný servis, aby vaše tepelné čerpadlo bežalo dlhodobo spoľahlivo a efektívne.",
          "Je možné taktiež čerpať dotácie od Zelená domácnostiam.",
        ],
        id: "tepelne-cerpadla",
        images: gallery("Tepelné čerpadlá", [
          "2025/05/IMG_4912.jpg",
          "2025/05/IMG_3983.jpg",
          "2025/05/IMG_3965.jpg",
          "2025/05/IMG_1768.jpg",
          "2025/05/IMG_1881.jpg",
          "2025/06/IMG_5545-preview-1-scaled.jpg",
          "2025/06/IMG_5548-preview-1-scaled.jpg",
          "2025/06/IMG_5552-preview-1-scaled.jpg",
        ]),
        title: "Tepelné čerpadlá",
      },
      {
        body: [
          "Podlahové kúrenie prináša príjemné a rovnomerné teplo po celej ploche miestnosti, čo zvyšuje komfort bývania a znižuje náklady na vykurovanie. Náš skúsený tím zrealizuje pokládku trubíc priamo do poteru alebo suchého systému podľa vašich stavebných požiadaviek.",
          "Používame len overené komponenty, ktoré garantujú dlhú životnosť bez nutnosti častej údržby. Po montáži systém zautomatizujeme pomocou termostatov pre maximálnu úsporu energie a pomôžeme naplánovať optimálnu zónovú reguláciu pre každý priestor.",
        ],
        id: "podlahove-kurenie",
        images: gallery("Podlahové kúrenie", [
          "2025/05/IMG_0061-1.jpg",
          "2025/05/IMG_9782.jpg",
          "2025/05/IMG_9105.jpg",
          "2025/05/IMG_9770.jpg",
          "2025/05/IMG_9064.jpg",
          "2025/05/IMG_8513.jpg",
          "2025/05/IMG_8991.jpg",
          "2025/05/IMG_1287.jpg",
        ]),
        title: "Podlahové kúrenie",
      },
      {
        body: [
          "Montáž plynových kotlov vyžaduje precíznosť a prísne dodržiavanie legislatívnych noriem. Inštalujeme moderné kondenzačné kotly s vysokou účinnosťou, ktoré znižujú spotrebu plynu a emisie CO₂.",
          "Zabezpečíme nielen samotnú montáž, ale aj revízie, spustenie a nastavenie správneho režimu chodu. Pravidelný servis a rýchle riešenie prípadných porúch sú samozrejmosťou, rovnako ako komplexný servis od návrhu až po pravidelnú údržbu.",
        ],
        id: "plynove-kotly",
        images: gallery("Plynové kotly", [
          "2025/05/IMG_1559.jpg",
          "2025/05/IMG_4147.jpg",
          "2025/05/IMG_3635.jpg",
          "2025/05/IMG_9242.jpg",
          "2025/05/IMG_8845.jpg",
          "2025/05/IMG_2384.jpg",
          "2025/05/IMG_8815.jpg",
          "2025/05/IMG_0190-preview.jpg",
        ]),
        title: "Plynové kotly",
      },
      {
        body: [
          "Naše odborné tímy sa špecializujú na inštaláciu pevných palivových pecí na drevo, pelety či uhlie, ktoré dokážu vykúriť celý objekt efektívne a ekologicky. Pri montáži dbáme na bezpečné napojenie na komínový systém, správne odvetranie aj montáž protipožiarnej izolácie podľa legislatívy.",
          "Pec nastavíme a uvedieme do prevádzky vrátane optimalizácie spaľovacieho procesu pre čo najnižšie emisie a maximálnu účinnosť. Ponúkame aj pravidelný servis a čistenie výmenníka, aby pec fungovala spoľahlivo po celé roky.",
        ],
        id: "kotle",
        images: gallery("Kotle na tuhé palivá a biomasu", [
          "2025/05/IMG_0207.jpg",
          "2025/05/IMG_0210.jpg",
          "2025/05/IMG_0212.jpg",
          "2025/05/IMG_0214.jpg",
          "2025/05/IMG_8610-1.jpg",
          "2025/05/IMG_0093.jpg",
        ]),
        title: "Kotle na tuhé palivá a biomasu",
      },
    ],
    slug: "kurenarske-prace",
    title: "Kurenárske práce",
  },
  {
    description: "Inštalácia a servis moderných klimatizačných jednotiek s vysokou energetickou účinnosťou.",
    heroImage: upload("2025/05/IMG_0107-2.jpg"),
    kind: "service",
    navHref: "/klimatizacie",
    sections: [
      {
        body: [
          "Inštalujeme moderné klimatizačné jednotky značiek s vysokou energetickou triedou, ktoré zabezpečia príjemné chladenie aj vykurovanie vzduchu podľa sezóny. Naši technici vypracujú dôkladnú analýzu priestoru, navrhnú optimálny výkon a umiestnenie vnútorných aj vonkajších jednotiek pre maximálnu účinnosť.",
          "Zabezpečíme kompletný servis od montáže, napojenia na elektrickú sieť a chladivový okruh až po uvedenie do prevádzky s presným nastavením termostatov a diaľkového ovládania. Ponúkame aj pravidelnú údržbu vrátane čistenia filtrov, kontroly tlakov a dopúšťania chladiva.",
        ],
        id: "klimatizacie",
        images: gallery("Klimatizácie", [
          "2025/05/IMG_0107-2.jpg",
          "2025/05/IMG_0376-1.jpg",
          "2025/05/IMG_0377-1.jpg",
        ]),
        title: "Klimatizácie",
      },
    ],
    slug: "klimatizacie",
    title: "Klimatizácie",
  },
  {
    description:
      "Vodoinštalatérske práce od rozvodov vody cez domáce vodárne až po kompletáže a exteriérové riešenia.",
    heroImage: upload("2025/05/IMG_7219-2-1024x768.jpg"),
    kind: "service",
    navHref: "/vodoinstalaterske-prace",
    sections: [
      {
        body: [
          "Naše rozvody vody sú navrhnuté s dôrazom na spoľahlivosť a dlhú životnosť. Používame kvalitné nerezové potrubie najvyššej čistoty pre pitnú vodu a Al-pex potrubie s vnútornou BPA free vrstvou. Každú trasu potrubia kladieme tak, aby sme zachovali optimálny tlak aj rovnomerný prietok do všetkých odberných miest.",
          "Po dokončení inštalácie vykonáme tlakové skúšky a dezinfekciu systému, aby voda bola okamžite pripravená na pitie. Zabezpečujeme aj pravidelnú údržbu a rýchly servis pri prípadných poruchách.",
        ],
        id: "rozvody-vody",
        images: gallery("Rozvody vody", [
          "2025/05/IMG_7385.jpg",
          "2025/05/IMG_7219.jpg",
          "2025/05/IMG_7218.jpg",
          "2025/05/IMG_1415.jpg",
          "2025/05/IMG_0120.jpg",
          "2025/05/IMG_0096.jpg",
          "2025/05/IMG_0097.jpg",
        ]),
        title: "Rozvody vody",
      },
      {
        body: [
          "Domáce vodárne dodávame ako komplexné riešenie pre rodinné domy aj menšie prevádzky, vrátane tlakových nádob, čerpadiel a automatickej regulácie. Navrhneme kapacitu aj výkon čerpadla podľa hĺbky zdroja a požiadaviek na spotrebu vody.",
          "Po inštalácii prepojíme čerpadlo s inteligentným riadiacim modulom, ktorý udržiava konštantný tlak a šetrí elektrinu. Poskytujeme aj ročné revízie a servisné prehliadky pre bezproblémový chod.",
        ],
        id: "domace-vodarne",
        images: gallery("Domáce vodárne", [
          "2025/05/IMG_2917.jpg",
          "2025/05/IMG_2922.jpg",
          "2025/05/IMG_2923.jpg",
          "2025/05/IMG_2924.jpg",
          "2025/05/IMG_2916.jpg",
          "2025/05/IMG_2914.jpg",
        ]),
        title: "Domáce vodárne",
      },
      {
        body: [
          "Naša služba kompletáží zahŕňa dodávku a montáž sanitárnej techniky, batérií, sprchových kútov aj vaní na kľúč. Po konzultácii s vami pripravíme detailný rozpis potrebných dielov vrátane doplnkov a spojovacích prvkov.",
          "V procese kompletáže dbáme na presné napojenie na rozvody vody a kanalizácie, tesnosť spojov a správne vyspádovanie odtokov. Každý prvok skontrolujeme a odskúšame, aby ste mali istotu bezchybných spojov a optimálneho odtoku odpadových vôd.",
        ],
        id: "kompletaze",
        images: gallery("Kompletáže", [
          "2025/05/IMG_0003-2.jpg",
          "2025/05/IMG_0008-2.jpg",
          "2025/05/IMG_0005-2.jpg",
          "2025/05/IMG_0012-2.jpg",
          "2025/05/IMG_0013-2.jpg",
          "2025/05/IMG_0014-2.jpg",
          "2025/05/IMG_0017-3.jpg",
          "2025/05/IMG_0018-2.jpg",
        ]),
        title: "Kompletáže",
      },
      {
        body: [
          "Exteriérové vodoinštalácie zabezpečujú spoľahlivú závlahu, odvod dažďovej vody a prívod pitnej vody do vonkajších kohútikov. Navrhneme a položíme záhradné potrubie, napojíme postrekové systémy, inštalujeme dažďové žľaby a podzemné odtokové kanáliky.",
          "Používame mrazuvzdorné ventily a chránené spojky, aby hydraulika fungovala aj pri nízkych teplotách. Po realizácii skontrolujeme prietok a tesnosť systému a upravíme tlak podľa požiadaviek.",
        ],
        id: "exterier",
        images: gallery("Exteriér", [
          "2025/05/IMG_9579.jpg",
          "2025/05/IMG_9580.jpg",
          "2025/05/IMG_9581.jpg",
          "2025/05/IMG_9583.jpg",
          "2025/05/IMG_9585.jpg",
          "2025/05/IMG_9577.jpg",
          "2025/05/IMG_9543.jpg",
          "2025/05/IMG_9582.jpg",
        ]),
        title: "Exteriér",
      },
    ],
    slug: "vodoinstalaterske-prace",
    title: "Vodoinštalatérske práce",
  },
  {
    description: "Komplexné riešenia v oblasti odpadových rúr a kanalizácie.",
    heroImage: upload("2025/05/5556a87b-02e0-49bd-8fe9-ebffb716b825-1024x768.jpg"),
    kind: "service",
    navHref: "/odpady-a-kanalizacie",
    sections: [
      {
        body: [
          "Ponúkame komplexné riešenia v oblasti odpadových rúrok od návrhu a profesionálnej montáže až po opravy existujúcich kanalizačných a dažďových potrubí. Používame odolné PVC, PP a HDPE materiály s presným spádom a tesnosťou, vrátane tlakových skúšok a čistenia.",
          "Vďaka precíznemu spracovaniu prebieha odtok odpadových vôd bez komplikácií a systém funguje spoľahlivo aj v náročnejších prevádzkach.",
        ],
        id: "odpadove-rury",
        images: gallery("Odpadové rúry", [
          "2025/05/IMG_0008-1.jpg",
          "2025/05/IMG_0006-3.jpg",
          "2025/05/IMG_0007-2.jpg",
          "2025/05/IMG_0012-3.jpg",
          "2025/05/IMG_0030-1.jpg",
          "2025/05/IMG_0003.jpg",
          "2025/05/f87cf550-3a5d-40d8-bc22-0fe48dcdf72c.jpg",
          "2025/05/5556a87b-02e0-49bd-8fe9-ebffb716b825.jpg",
        ]),
        title: "Odpadové rúry",
      },
    ],
    slug: "odpady-a-kanalizacie",
    title: "Odpady a kanalizácie",
  },
];

const groupedServiceOverrides: Record<
  string,
  {
    overview: string[];
    slugMap: Record<string, string>;
  }
> = {
  "kurenarske-prace": {
    overview: [
      "Navrhujeme a realizujeme vykurovacie systémy tak, aby boli úsporné, spoľahlivé a dlhodobo servisovateľné. Od prvotného návrhu cez montáž až po spustenie do prevádzky dbáme na čisté prevedenie, správne dimenzovanie a bezpečný chod celej technológie.",
      "Každú realizáciu prispôsobujeme priestoru, rozpočtu aj očakávaniam klienta. V rámci kúrenárskych prác zabezpečujeme klasické rozvody, tepelné čerpadlá, podlahové kúrenie aj rôzne typy kotlov vrátane pravidelného servisu.",
    ],
    slugMap: {
      kotle: "kotle-na-tuhe-paliva-a-biomasu",
    },
  },
  "vodoinstalaterske-prace": {
    overview: [
      "Vodoinštalatérske práce realizujeme s dôrazom na hygienu, presnosť napojenia a dlhú životnosť použitých materiálov. Každý systém navrhujeme tak, aby fungoval spoľahlivo pri každodennej prevádzke v interiéri aj exteriéri.",
      "Od rozvodov pitnej vody cez domáce vodárne až po kompletáže a exteriérové riešenia zabezpečujeme kompletné dodanie, montáž, tlakové skúšky aj uvedenie systému do používania.",
    ],
    slugMap: {},
  },
};

export const groupedServicePages: GroupedServicePageData[] = servicePages
  .filter(
    (
      page,
    ): page is ServicePageData & {
      slug: keyof typeof groupedServiceOverrides;
    } => page.slug in groupedServiceOverrides,
  )
  .map((page) => {
    const overrides = groupedServiceOverrides[page.slug];

    return {
      description: page.description,
      heroImage: page.heroImage,
      navHref: page.navHref,
      overview: overrides.overview,
      slug: page.slug,
      subservices: page.sections.map((section) => ({
        body: section.body,
        description: section.body[0] ?? page.description,
        images: section.images,
        slug: overrides.slugMap[section.id] ?? section.id,
        title: section.title,
      })),
      title: page.title,
    };
  });

export const legalPages: LegalPageData[] = [
  {
    blocks: [
      "Článok I",
      "POUŽÍVANIE COOKIES",
      "- spracovanie údajov zhromaždených s využitím súborov cookies a podobných technológií a",
      "- účely, na ktoré tieto súbory cookies používame.",
      "Článok II",
      "ČO SÚ COOKIES",
      "Článok III",
      "ROZSAH A ÚČELY POUŽÍVANIA COOKIES",
      "Na našej Internetovej stránke používame nasledujúcich päť kategórií súborov cookies: Nevyhnutné súbory cookies, Funkčné súbory cookies, Analytické súbory cookies, Výkonnostné súbory cookies, Marketingové súbory cookies.",
      "Článok IV",
      "NASTAVENIE COOKIES",
      "Článok V",
      "NAKLADANIE S INFORMÁCIAMI",
      "Článok VI",
      "KONTROLA A MAZANIE COOKIES",
      "Článok VII",
      "HLAVNÉ COOKIES A COOKIES TRETÍCH STRÁN",
      "Článok VIII",
      "SLEDOVANIE EMAILOV",
      "Článok IX",
      "ZMENY A KONTAKT",
      "Potrebné súbory cookie sú pre základné funkcie webových stránok zásadné a bez nich nebudú webové stránky fungovať zamýšľaným spôsobom. Tieto súbory cookie neukladajú žiadne osobné identifikačné údaje.",
      "Funkčné súbory cookie pomáhajú vykonávať určité funkcie, ako je zdieľanie obsahu webových stránok na platformách sociálnych médií, zhromažďovanie spätnej väzby a ďalšie funkcie tretích strán.",
      "Analytické cookies sa používajú na pochopenie toho, ako návštevníci interagujú s webovou stránkou. Tieto súbory cookie pomáhajú poskytovať informácie o metrikách počtu návštevníkov, miere okamžitých odchodov, zdroji návštevnosti a podobne.",
      "Výkonnostné cookies sa používajú na pochopenie a analýzu kľúčových indexov výkonnosti webových stránok, čo pomáha zlepšovať užívateľskú skúsenosť pre návštevníkov.",
      "Súbory cookie reklamy sa používajú na doručenie návštevníkom prispôsobených reklám na základe stránok, ktoré navštívili predtým, a na analýzu efektívnosti reklamnej kampane.",
    ],
    description: "Zásady používania súborov cookies spoločnosti Vavrostav.",
    intro: "Zásady používania súborov cookies",
    kind: "legal",
    slug: "cookies",
    title: "Cookies",
  },
  {
    blocks: [
      "Prevádzkovateľ (správca) Vašich osobných údajov podľa článku 4 bod 7. Nariadenia Európskeho parlamentu a rady (EÚ) 2016/679 o ochrane fyzických osôb v súvislosti so spracovaním osobných údajov a o voľnom pohybe takýchto údajov je spoločnosť: VAVROSTAV s.r.o., Hlavná 355/109, 972 11 Lazany, IČO: 51 096 421.",
      "Kontaktné údaje správcu sú:",
      "Email: vavrostavsro@gmail.com",
      "Telefón: 0917 163 249",
      "Čo je osobný údaj?",
      "Osobnými údajmi sú údaje týkajúce sa identifikovanej fyzickej osoby alebo identifikovateľnej fyzickej osoby, ktorú možno identifikovať priamo alebo nepriamo, najmä na základe všeobecne použiteľného identifikátora, iného identifikátora, lokalizačných údajov alebo online identifikátora.",
      "Čo je spracúvanie osobných údajov?",
      "Spracúvaním osobných údajov je spracovateľská operácia alebo súbor spracovateľských operácií s osobnými údajmi alebo súbormi osobných údajov, najmä získavanie, zaznamenávanie, usporadúvanie, štruktúrovanie, uchovávanie, zmena, vyhľadávanie, prehliadanie, využívanie, poskytovanie prenosom, šírením alebo iným spôsobom.",
      "Prevádzkovateľ nemá povinnosť vymenovať alebo určiť Zodpovednú Osobu.",
      "Zdroje a kategórie osobných údajov:",
      "Prevádzkovateľ spracováva osobné údaje, ktoré ste mu poskytli priamo, alebo osobné údaje, ktoré získal na základe plnenia Vašej objednávky.",
      "Vaše identifikačné a kontaktné údaje a údaje nevyhnutné na plnenie zmluvy.",
      "Zákonný dôvod a účel spracovania:",
      "Váš súhlas so spracovaním osobných údajov na účely poskytovania priameho marketingu podľa článku 6 ods. 1 písm. a) GDPR.",
      "Plnenie zmluvy medzi Vami a prevádzkovateľom podľa článku 6 ods. 1 písm. b) GDPR.",
      "Spracúvanie je nevyhnutné na plnenie zákonnej povinnosti prevádzkovateľa podľa článku 6 ods. 1 písm. c) GDPR.",
      "Účelom spracovania osobných údajov je:",
      "Vybavenie Vašej objednávky a výkon práv a povinností vyplývajúcich zo zmluvného vzťahu medzi Vami a prevádzkovateľom. Poskytnutie osobných údajov je nevyhnutná požiadavka na uzatvorenie a plnenie objednávky.",
      "Poskytnutie dohodnutej služby v oblasti vodoinštalatérskych, kúrenárskych, zemných a výkopových prác.",
      "Pri prevádzkovaní profilu na sociálnych sieťach je našim záujmom zvyšovanie povedomia o prevádzkovateľovi v online prostredí a komunikácia so zákazníkmi.",
      "Osobné údaje, ktoré uverejníte na našich stránkach sociálnych sietí, ako napríklad komentáre, lajky, videá alebo obrázky, sa uverejnia prostredníctvom platformy sociálnej siete. Osobné údaje následne nespracúvame na iný účel.",
      "Dotknutá osoba má právo kedykoľvek namietať proti spracúvaniu osobných údajov, ktoré sa jej týka. Námietky môžete zaslať e-mailom na adresu vavrostavsro@gmail.com.",
      "Prevádzkovatelia sociálnych sietí majú vlastné pravidlá, infraštruktúru služby a vlastné ustanovenia k ochrane osobných údajov. Na prenos údajov a využívanie vašich údajov zo strany prevádzkovateľov sociálnych sietí nemáme žiadny vplyv.",
      "V určitých spracovateľských operáciách vystupujeme s prevádzkovateľmi sociálnych sietí ako spoloční prevádzkovatelia v zmysle čl. 26 bod 4 GDPR.",
      "Zo strany prevádzkovateľa nedochádza k automatizovanému individuálnemu rozhodovaniu v zmysle článku 22 GDPR.",
      "Doba uchovávania:",
      "Prevádzkovateľ uchováva osobné údaje po dobu nevyhnutnú na výkon práv a povinností vyplývajúcich zo zmluvného vzťahu medzi Vami a prevádzkovateľom a po dobu vyžadovanú osobitnými právnymi predpismi.",
      "Po uplynutí doby uchovávania osobných údajov prevádzkovateľ osobné údaje vymaže.",
      "Príjemcovia osobných údajov",
      "Kto je príjemca?",
      "Príjemcom je každý, komu sa osobné údaje poskytnú bez ohľadu na to, či ide o tretiu stranu. Za príjemcu sa nepovažuje orgán verejnej moci, ktorý spracúva osobné údaje na základe osobitného predpisu.",
      "Podmienky zabezpečenia osobných údajov",
      "Prevádzkovateľ prijal vhodné personálne, technické a organizačné opatrenia k zabezpečeniu ochrany osobných údajov, vrátane technických opatrení na zabezpečenie dátových úložísk a úložísk osobných údajov v spisovej podobe.",
      "K osobným údajom majú prístup výlučne ním poverené osoby.",
      "Vaše práva:",
      "Za podmienok stanovených v GDPR máte právo na prístup k údajom, právo na opravu, právo na vymazanie, právo na obmedzenie spracúvania, právo na prenosnosť údajov a právo namietať proti spracúvaniu osobných údajov.",
      "Máte právo podať sťažnosť úradu na ochranu osobných údajov v prípade, že sa domnievate, že došlo k porušeniu vašich práv na ochranu osobných údajov.",
      "Ako môžete naplniť svoje práva?",
      "Žiadosť môžete podať elektronicky na e-mailovú adresu vavrostavsro@gmail.com alebo poštou na adresu sídla spoločnosti VAVROSTAV s.r.o., Hlavná 355/109, 972 11 Lazany.",
      "V prípade, že sa domnievate, že došlo k porušeniu Vašich práv na ochranu osobných údajov, máte právo podať sťažnosť dozornému orgánu, ktorým je Úrad na ochranu osobných údajov na adrese Hraničná 12, 820 07 Bratislava 27, Slovenská republika.",
      "IČO: 36064220",
      "DIČ: 2021685985",
      "Sekretariát úradu: +421 /2 3231 3214",
      "E-mail: statny.dozor@pdp.gov.sk",
      "Podateľňa: pondelok – štvrtok 8:00 - 15:00, piatok 8:00 - 14:00.",
      "Vzhľadom na epidemiologickú situáciu v SR Úrad odporúča vykonať podania prostredníctvom poštových alebo elektronických služieb. Osobné podania je možné uskutočniť len v nevyhnutných prípadoch.",
    ],
    description: "Zásady spracovania osobných údajov spoločnosti Vavrostav podľa GDPR.",
    intro: "Zásady spracovania osobných údajov a systém ochrany osobných údajov podľa nariadenia GDPR",
    kind: "legal",
    slug: "ochrana-osobnych-udajov",
    title: "Ochrana osobných údajov",
  },
];

const groupedServiceSlugs = new Set(groupedServicePages.map((page) => page.slug));

export const sitePages: SitePageData[] = [
  ...servicePages.filter((page) => !groupedServiceSlugs.has(page.slug)),
  ...legalPages,
];

export function buildSubserviceHref(groupSlug: string, subserviceSlug: string) {
  return `/${groupSlug}/${subserviceSlug}`;
}

export function getGroupedServicePage(groupSlug: string) {
  return groupedServicePages.find((page) => page.slug === groupSlug) ?? null;
}

export function getGroupedServiceSubpage(groupSlug: string, subserviceSlug: string) {
  const page = getGroupedServicePage(groupSlug);

  if (!page) {
    return null;
  }

  const subservice = page.subservices.find((item) => item.slug === subserviceSlug) ?? null;

  if (!subservice) {
    return null;
  }

  return {
    page,
    subservice,
  };
}

export function getGroupedServiceStaticParams(groupSlug: string) {
  const page = getGroupedServicePage(groupSlug);

  if (!page) {
    return [];
  }

  return page.subservices.map((subservice) => ({
    subservice: subservice.slug,
  }));
}

export function getAllSitePaths() {
  const corePaths = ["/", "/kontakt"];
  const singlePagePaths = sitePages.map((page) => `/${page.slug}`);
  const groupedPaths = groupedServicePages.flatMap((page) => [
    `/${page.slug}`,
    ...page.subservices.map((subservice) => buildSubserviceHref(page.slug, subservice.slug)),
  ]);

  return [...new Set([...corePaths, ...groupedPaths, ...singlePagePaths])];
}

export function getSitePageBySlugParts(slugParts: string[]) {
  const slug = slugParts.join("/");

  return sitePages.find((page) => page.slug === slug) ?? null;
}

export function getStaticSlugParams() {
  return sitePages.map((page) => ({
    slug: page.slug.split("/"),
  }));
}
