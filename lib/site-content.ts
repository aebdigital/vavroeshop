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
  { href: "/obchod", label: "Obchod" },
  { href: "/kontakt", label: "Kontakt" },
];

export const footerLinkGroups = [
  {
    links: mainNav,
    title: "Navigácia",
  },
  {
    links: [
      { href: "/cookies", label: "Cookies nastavenia" },
      { href: "/zasady-pouzivania-suborov-cookies", label: "Zásady používania súborov cookies" },
      { href: "/ochrana-osobnych-udajov", label: "Ochrana osobných údajov" },
    ],
    title: "Legal",
  },
  {
    links: [
      { href: "/postovne-a-doprava", label: "Poštovné a doprava" },
      { href: "/obchodne-podmienky", label: "Obchodné podmienky" },
      { href: "/reklamacne-podmienky", label: "Reklamačné podmienky" },
      { href: "/podmienky-ochrany-osobnych-udajov", label: "Podmienky ochrany osobných údajov" },
    ],
    title: "ESHOP Legal",
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
  description: "Kúrenárske práce, klimatizácie, vodoinštalatérske práce ochrana osobných údajov a odpady na mieru.",
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
          "2025/05/IMG_0117.jpg",
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
          "Používame mrazuvzdorné ventily and chránené spojky, aby hydraulika fungovala aj pri nízkych teplotách. Po realizácii skontrolujeme prietok a tesnosť systému a upravíme tlak podľa požiadaviek.",
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
      "Tieto webové stránky používajú súbory cookies, ktoré ich návštevníka (ďalej len „vy“ v príslušnom gramatickom tvare) odlišujú od ostatných používateľov. To nám umožňuje vylepšovanie našich stránok a poskytovanie lepšieho zážitku pri ich prehliadaní jednotlivými návštevníkmi.",
      "Článok II",
      "ČO SÚ COOKIES",
      "Cookies – sú malé súbory, ktoré sa sťahujú do zariadenia (počítač, tablet, mobilný telefón atď.), obsahujúce určité množstvo informácií umožňujúcich webovej stránke rozpoznať vás ako používateľa, počas používania Internetovej stránky.",
    ],
    description: "Zásady používania súborov cookies spoločnosti Vavrostav.",
    intro: "Zásady používania súborov cookies",
    kind: "legal",
    slug: "cookies",
    title: "Cookies",
  },
  {
    blocks: [
      "Prevádzkovateľ (správca) Vašich osobných údajov podľa článku 4 bod 7. Nariadenia Európskeho parlamentu a rady (EÚ) 2016/679 o ochrane fyzických osôb v súvislosti so spracovaním osobných údajov a o voľnom pohybe takýchto údajov (ďalej len GDPR)  je spoločnosť: VAVROSTAV s.r.o., Hlavná 355/109, 972 11 Lazany, IČO: 51 096 421",
      "Kontaktné údaje správcu sú :",
      "Email: vavrostavsro@gmail.com",
      "Telefón: 0917 163 249",
      "Čo je osobný údaj?",
      "Osobnými údajmi sú údaje týkajúce sa identifikovanej fyzickej osoby, alebo identifikovateľnej fyzickej osoby, ktorú možno identifikovať priamo alebo nepriamo, najmä na základe všeobecne použiteľného identifikátora, iného identifikátora ako je napríklad meno, priezvisko, identifikačné číslo, lokalizačné údaje, alebo online identifikátor, alebo na základe jednej alebo viacerých charakteristík alebo znakov, ktoré tvoria jej fyzickú identitu, fyziologickú identitu, genetickú identitu, psychickú identitu, mentálnu identitu, ekonomickú identitu, kultúrnu identitu alebo sociálnu identitu.",
      "Čo je spracúvanie osobných údajov?",
      "Spracúvaním osobných údajov je spracovateľská operácia alebo súbor spracovateľských operácií s osobnými údajmi alebo súbormi osobných údajov, najmä získavanie, zaznamenávanie, usporadúvanie, štruktúrovanie, uchovávanie, zmena, vyhľadávanie, prehliadanie, využívanie, poskytovanie prenosom, šírením alebo iným spôsobom, preskupovanie alebo kombinovanie, obmedzenie, vymazanie, bez ohľadu na to, či sa vykonáva automatizovanými prostriedkami alebo neautomatizovanými prostriedkami.",
      "Prevádzkovateľ  (Správca)  nemá povinnosť vymenovať/určiť  Zodpovednú Osobu.",
      "Zdroje a kategórie osobných údajov:",
      "Prevádzkovateľ spracováva osobné údaje (priamo od vás) ktoré ste mu poskytli, alebo osobné údaje ktoré získal na základe plnenia Vašej objednávky.",
      "Vaše identifikačné a kontaktné údaje  a údaje nevyhnutné na plnenie zmluvy.",
      "Zákonný dôvod a účel spracovania :",
      "Zákonným dôvodom spracovania je:",
      "Váš súhlas so spracovaním osobných údajov na účely poskytovania priameho marketingu podľa článku 6 ods.1 písmeno a) GDPR",
      "Plnenie zmluvy medzi Vami a prevádzkovateľom podľa článku 6 ods.1 písmeno b) GDPR",
      "Spracúvanie je nevyhnutné na plnenie zákonnej povinnosti prevádzkovateľa podľa článku 6 ods. 1 písmena c) GDPR",
      "Účelom spracovania osobných údajov je :",
      "Vybavenie Vašej objednávky a výkon práv a povinností vyplývajúcich zo zmluvného vzťahu medzi Vami a prevádzkovateľom. Pri objednávke sú vyžadované osobné údaje nevyhnutné pre úspešné vybavenie objednávky podľa čl. 6 ods. 1 písm. b) Nariadenia (s tým súvisí aj následné uskutočnenie platby, dodanie tovaru alebo služby, vybavovanie reklamácie a pod.); spracúvanie osobných údajov zákazníka prebieha bez súhlasu zákazníka, nakoľko právnym základom spracúvania jeho osobných údajov na účely plnenia zmluvy je konkrétna objednávka medzi zákazníkom a prevádzkovateľom. Poskytnutie osobných údajov je nevyhnutná požiadavka na uzatvorenie a plnenie objednávky, bez poskytnutia osobných údajov nie je možné uzavrieť zmluvu či zo strany prevádzkovateľa plniť jej podmienky.",
      "Poskytnutie dohodnutej služby v oblasti vodoinštalatérskych/ kúrenárskych/ zemných a výkopových prác.",
      "Pri prevádzkovaní profilu na sociálnych sieťach  (Facebook, Instagram, TikTok) je našim záujmom zvyšovanie povedomia o prevádzkovateľovi v online prostredí a komunikácia so zákazníkmi.",
      "Osobné údaje, ktoré uverejníte na našich stránkach sociálnych sietí ako napríklad komentáre, lajky, videá, obrázky atď. sa uverejnia prostredníctvom platformy sociálnej siete. Osobné údaje následne nespracúvame na iný účel.",
      "Dotknutá osoba má právo kedykoľvek namietať z dôvodov týkajúcich sa jej konkrétnej situácie proti spracúvaniu osobných údajov, ktoré sa jej týka. Námietky môžete zaslať e-mailom na kontaktnú adresu prevádzkovateľa vavrostavsro@gmail.com",
      "Prevádzkovatelia sociálnych sietí majú vlastné prijaté pravidlá, infraštruktúru služby a vlastné ustanovenia k ochrane osobných údajov. Na prenos údajov a využívanie vašich údajov zo strany prevádzkovateľov sociálnych sietí nemáme žiadny vplyv Odporúčame Vám oboznámiť sa s podmienkami ochrany súkromia poskytovateľa platformy sociálnej siete:",
      "Facebook – nasledujúci link: https://www.facebook.com/policy.php",
      "Instagram – môžete použiť odkaz: https://help.instagram.com/519522125107875",
      "TikTok – nasledujúci odkaz: https://www.tiktok.com/legal/privacy-policy-eea?lang=en",
      "V určitých spracovateľských operáciách vystupujeme s prevádzkovateľmi sociálnych sietí ako spoloční prevádzkovatelia v zmysle čl. 26 bod 4 GDPR.",
      "Zo strany prevádzkovateľa nedochádza k automatizovanému individuльному rozhodovaniu v zmysle článku 22 GDPR .",
      "Doba uchovávania:",
      "Prevádzkovateľ uchováva osobné údaje:",
      "Po dobu nevyhnutnú k výkonu práv and povinností vyplývajúcich so zmluvného vzťahu medzi Vami and prevádzkovateľom and uplatňovania nároku vyplývajúceho  z týchto zmluvných vzťahov .",
      "Po uplynutí doby uchovávania osobných údajov ktorá vyplýva zo zákona č. 395/2002 Z. z. Zákon o archívoch a registratúrach a o doplnení niektorých zákonov prevádzkovateľ osobné údaje vymaže.",
      "Príjemcovia osobných údajov",
      "Kto je príjemca?",
      "Príjemcom je každý, komu sa osobné údaje poskytnú bez ohľadu na to, či je treťou stranou. Za príjemcu sa nepovažuje orgán verejnej moci, ktorý spracúva osobné údaje na základe osobitného predpisu.",
      "Sú osoby ktoré sa  podieľajú na dodaní tovaru, služieb, realizácii platieb na základe zmluvy",
      "Prevádzkovateľ neposkytuje, nezverejňuje  a nesprístupňuje osobné údaje do tretích krajín",
      "Podmienky zabezpečenia osobných údajov",
      "Prevádzkovateľ prehlasuje, že prijal vhodné personálne, technické a organizačné opatrenia k zabezpečeniu ochrany osobných údajov.",
      "Prevádzkovateľ prijal technické opatrenia na zabezpečenie dátových úložísk and úložísk osobných údajov v spisovej podobe.",
      "Prevádzkovateľ prehlasuje , že k osobným údajom majú prístup výlučne ním poverené osoby.",
      "Vaše práva :",
      "Za podmienok stanovených v GDPR máte:",
      "Právo na prístup k svojim osobným údajom podľa čl. 15 GDPR",
      "Právo na opravu osobných údajov podľa čl.16 GDPR",
      "Právo na obmedzenie spracúvania",
      "Právo na výmaz podľa čl.17 GDPR",
      "Právo namietať podľa článku 21 GDPR",
      "Právo na prenesenie osobných údajov podľa článku 21 GDPR",
      "Právo odvolať súhlas (elektronicky, alebo na korešpondenčnú adresu)",
      "Právo podať sťažnosť úradu na ochranu osobných údajov v prípade, že sa domnievate, že došlo k porušeniu vašich práv na ochranu osobných údajov.",
      "Ďalej máte právo podať sťažnosť úradu na ochranu osobných údajov v prípade, že sa domnievate, že došlo k porušeniu vašich práv na ochranu osobných údajov",
      "Ako môžete naplniť svoje práva?",
      "Právo na prístup k údajom",
      "Máte právo vedieť, či spracúvame Vaše osobné údaje. Pokiaľ ich spracúvame, môžete nás požiadať o prístup k nim. Na základe Vašej žiadosti vydáme potvrdenie s informáciami o spracúvaní Vašich osobných údajov. Žiadosť môžete podať elektronicky, na emailovú adresu vavrostavsro@gmail.com alebo poštou na adresu sídla: VAVROSTAV s.r.o., Hlavná 355/109, 972 11 Lazany, IČO: 51 096 421",
      "Právo na opravu",
      "Máte právo na to, aby Vaše osobné údaje, ktoré spracúvame, boli správne, úplné and aktuálne. Pokiaľ sú Vaše osobné údaje nesprávne alebo neaktuálne, môžete nás požiadať o opravu alebo doplnenie and to elektronickou formou na emailovú adresu vavrostavsro@gmail.com alebo poštou na adresu sídla: VAVROSTAV s.r.o., Hlavná 355/109, 972 11 Lazany, IČO: 51 096 421",
      "Právo na vymazanie",
      "Za určitých okolností máte právo, aby sme Vaše osobné údaje vymazali. O vymazanie Vašich údajov nás môžete požiadať kedykoľvek. Vaše osobné údaje vymažeme, ak:",
      "už vaše osobné údaje nepotrebujeme pre účel, na ktorý ste nám ich poskytli,",
      "odvoláte svoj súhlas,",
      "namietate voči spracúvaniu vašich osobných údajov,",
      "spracúvame Vaše osobné údaje nezákonne,",
      "osobné údaje musia byť vymazané, aby sa tým splnila zákonná povinnosť,",
      "ak ste dieťa, príp. rodič dieťaťa, ktoré súhlasilo so spracúvaním osobných údajov cez internet.",
      "Právo na obmedzenie spracúvania",
      "Môžete nás požiadať, aby sme obmedzili spracúvanie vašich osobných údajov. Pokiaľ Vašej žiadosti vyhovieme, Vaše osobné údaje budeme iba uchovávať and ďalej s nimi pracovať nebudeme. K obmedzeniu spracúvania Vašich údajov dôjde, ak:",
      "nám oznámite, že Vaše osobné údaje sú nesprávne, and to až dokým neoveríme ich správnosť,",
      "spracúvame Vaše osobné údaje nezákonne, avšak Vy nesúhlasíte s ich vymazaním and na miesto toho žiadate, aby sme spracúvanie Vašich osobných údajov len obmedzili,",
      "Vaše údaje už nepotrebujeme, ale potrebujete ich Vy na preukázanie, uplatňovanie alebo obhajovanie svojich práv",
      "namietate voči spracúvaniu Vašich osobných údajov, and to až kým neoveríme, či naše oprávnené záujmy prevažujú nad vašimi dôvodmi.",
      "Právo na prenosnosť údajov",
      "Máte právo žiadať, aby sme Vám poskytli Vaše osobné údaje v elektronickej forme (napr. súbor XML alebo CSV), ktorá Vám umožní ľahko si preniesť údaje do inej spoločnosti. Tiež nás môžete požiadať, aby sme Vaše osobné údaje preniesli vybranej spoločnosti priamo my. Vašej žiadosti vyhovieme v prípade, že ste nám poskytli osobné údaje priamo Vy and dali ste nám na ich spracúvanie súhlas.",
      "Právo namietať",
      "Máte právo namietať, že spracúvame Vaše osobné údaje. Ak Vaše osobné údaje spracúvame v nasledovných prípadoch:",
      "z dôvodu nášho oprávneného záujmu,",
      "vytvárania zákazníckeho profilu,",
      "môžete namietať ich spracúvanie, ak máte na to osobné dôvody.",
      "Ako môžete tieto práva vykonávať?",
      "S Vašou žiadosťou sa môžete na nás obrátiť niektorým z týchto spôsobov:",
      "emailom : vavrostavsro@gmail.com alebo poštou na adresu sídla: VAVROSTAV s.r.o., Hlavná 355/109, 972 11 Lazany, IČO: 51 096 421",
      "V prípade, že sa domnievate, že došlo k porušeniu Vašich práv na ochranu osobných údajov máte právo podať sťažnosť dozornému orgánu ktorým je Úrad na ochranu osobných údajov na adrese",
      "Hraničná 12",
      "820 07 Bratislava 27",
      "Slovenská republika",
      "Identifikačné údaje:",
      "IČO: 36064220",
      "DIČ: 2021685985",
      "Sekretariát úradu:",
      "+421 /2 3231 3214",
      "E-mail: statny.dozor@pdp.gov.sk",
      "Podateľňa: pondelok – štvrtok: 8:00 – 15:00",
      "piatok: 8:00 – 14:00",
      "Vzhľadom na epidemiologickú situáciu v SR Úrad odporúča vykonať podania prostredníctvom poštových alebo elektronických služieb (www.slovensko.sk). Osobné podania od 29.11.2021 je možné uskutočniť len v nevyhnutných prípadoch najneskôr do 12:00 hod.",
    ],
    description: "Zásady spracovania osobných údajov spoločnosti Vavrostav podľa GDPR.",
    intro: "Zásady spracovania osobných údajov a systém ochrany osobných údajov podľa nariadenia GDPR",
    kind: "legal",
    slug: "ochrana-osobnych-udajov",
    title: "Ochrana osobných údajov",
  },
  {
    blocks: [
      "Článok I",
      "POUŽÍVANIE COOKIES",
      "Tieto webové stránky používajú súbory cookies, ktoré ich návštevníka (ďalej len „vy“ v príslušnom gramatickom tvare) odlišujú od ostatných používateľov. To nám umožňuje vylepšovanie našich stránok a poskytovanie lepšieho zážitku pri ich prehliadaní jednotlivými návštevníkmi.",
      "Tieto zásady používanja súborov cookies popisujú:",
      "– spracovanie údajov zhromaždených s využitím súborov cookies a podobných technológií a",
      "– účely, na ktoré tieto súbory cookies používame.",
      "Ďalšie dôležité informácie o tom, akým spôsobom sú spracúvané osobné údaje získané prostredníctvom týchto webových stránok nájdete v časti označovanej ako podmienky používania.",
      "Článok II",
      "ČO SÚ COOKIES",
      "Cookies – sú malé súbory, ktoré sa sťahujú do zariadenia (počítač, tablet, mobilený telefón atď.), obsahujúce určité množstvo informácií umožňujúcich webovej stránke rozpoznať vás ako používateľa, počas používania Internetovej stránky. Prevádzkovateľ pomocou cookies skúma účinnosť Internetovej stránky. Cookies vo všeobecnosti nemajú žiadne informácie slúžiace na identifikáciu jednotlivých osôb, ale namiesto toho sa používajú na identifikáciu prehliadača na konkrétnom zariadení. Pojem cookies používame v tomto dokumente aj na iné súbory, ktoré zhromažďujú informácie podobným spôsobom (napr. pixely, majáky, atď). Na základe týchto súborov vás webová stránka môže rozpoznať:",
      "pomocou tzv. „relačného cookies“ – počas vašej návštevy webu. Tieto tzv. dočasné cookies, ktoré sa po zatvorení prehliadača automaticky odstránia. Prehliadač môžete nastaviť tak, aby Vás informoval o používaní súborov cookies. To Vám zabezpečí transparentnosť používania cookies. Dôležité: ak úplne vylúčite používanie súborov cookies, pravdepodobne nebudete môcť používať určité funkcionality našej Internetovej stránky.",
      "pomocou tzv. „trvalé cookies“ – pre opakované návštevy webu. Tieto trvalé cookies môžu byť kontrolované pri každej návšteve Internetovej stránky. Informácie, ktoré zhromažďujeme prostredníctvom Internetovej stránky, zahŕňajú: typ prehliadača, internetovú adresu, z ktorej sa pripojil na Internetovú stránku, operačný systém zariadenia, IP adresa zariadenia. Pre zobrazovanie relevantnejších reklám sú niektoré cookies stanovené reklamným systémom tretích strán, ako je Google Analytics. Toto je možné vypnúť v účte Google. Počítač je možné nastaviť tak, aby cookies odmietal, aj keď v takom prípade je možné, že niektoré funkcie stránky nebudú funkčné.",
      "Tzv. „naše cookies“ sú také súbory cookies, ktoré boli umiestnené na túto webovú stránku našou spoločnosťou.",
      "Tzv. „cookies tretích strán“ sú také súbory cookies, ktoré sú umiestnené do vášho zariadenia inou spoločnosťou pri použití našich webových stránok. Súbory cookies tretích strán môže do vášho zariadenia umiestňovať niekto, kto nám poskytuje určitú službu (napríklad Google Analytics).",
      "Tretie strany nemajú prístup k dátam v našich súboroch cookies a takisto my nemôžeme získať prístup ku cookies tretích strán.",
      "Článok III",
      "ROZSAH A ÚČELY POUŽÍVANIA COOKIES",
      "Na našej Internetovej stránke používame nasledujúcich päť kategórií súborov cookies: Nevyhnutné súbory cookies, Funkčné súbory cookies, Analytické súbory cookies, Výkonnostné súbory cookies, Marketingové súbory cookies",
      "Súbory cookies sú používame na nasledujúce účely:",
      "Nevyhnutné súbory cookiessú súbory cookies, bez ktorých by naše webové stránky nemohli fungovať, resp. bez ktorých by nebolo možné riadne používanie týchto stránok. Tieto súbory cookies sa automaticky umiestňujú do vášho zariadenia a nemožno ich vypnúť. Nevyhnutné cookies vás nemôžu identifikovať a sú používané iba preto, aby sa zaručilo správne zobrazenie a fungovanie našej webovej stránky.",
      "Funkčné súbory cookiesslúžia na to, aby sme vás spoznali pri návrate na naše webové stránky. Funkčné súbory cookies helpujú zlepšovať funkčnosť a zabezpečenie webových stránok vrátane zapamätania vašich preferencií a správy výkonu webových stránok.",
      "Analytické súbory cookies nám umožňujú vykonávať rôzne štatistické analýzy našich webových stránok. Tieto cookies sa používajú v anonymizovanej podobe, čo znamená, že vás nemôžu identifikovať. Používanie týchto cookies môžete vo svojom webovom prehliadači vypnúť.",
      "Výkonnostné súbory cookies helpujú zlepšovať funkčnosť našich webových stránok, napríklad tým, že zaisťujú, aby používatelia ľahko našli to, čo hľadajú.",
      "Marketingové súbory cookies sa používajú na vykonávanie personalizovaných reklamných služieb. Neukladajú priamo osobné údaje, ale sú založené na jedinečnej identifikácii vášho prehliadača a internetového zariadenia. Chceli by sme vás upozorniť, že odmietnutie použitia týchto súborov cookies nezabráni zobrazovaniu reklám na webových stránkach, avšak už nemusia zodpovedať vašim záujmom.",
      "Tieto cookies môžu byť nastavené prostredníctvom našich stránok aj našimi reklamnými partnermi, ktorí ich môžu použiť na profilovanie vašich záujmov a na zobrazenie relevantných reklám aj na iných stránkach, v zmysle zásad používania súborov cookies dostupných na stránkach tychto partnerov zobrazených v pokročilom nastavení ukladania súborov cookies.",
      "Tieto základné zásady používania cookies vám dávajú informácie o konkrétnych cookies používaných na týchto webových stránkach.",
      "Článok IV",
      "NASTAVENIE COOKIES",
      "Pri prvej návšteve našich webových stránok sa do vášho zariadenia ukladajú iba absolútne nevyhnutné súbory cookies. Pokiaľ neprijmete/nepovolíte všetky súbory cookies alebo nevyberiete vaše individuálne preferencie pre súbory cookies, toto nastavenie sa nezmení. Podrobnosti o tom, ako kontrolovať a mazať súbory cookies, nájdete v čl. VI Kontrola a mazanie cookies.",
      "Niektoré súbory cookies, ktoré používame, sú nevyhnutné pre to, aby naše webové stránky fungovali. Napríklad keď prvýkrát navštívite naše webové stránky, objaví sa vám vyskakovacie okno so správou upozorňujúcou na naše používanie cookies.",
      "Kliknutím na príslušné tlačidlo vo vyskakovacom okne súhlasíte s naším používaním nevyhnutných cookies spôsobom opísaným v týchto základných zásadách používania cookies. Vo vzťahu ku všetkým ostatným typom cookies, ktoré používame, uvádzame, že tieto vo vašom zariadení nebudú nastavené, pokiaľ nedáte súhlas s ich použitím.",
      "V prípade, ak poskytnete svoj súhlas s cookies, zároveň poskytnete nám aj príslušným tretím stranám súhlas, aby predmetné cookies používali vaše osobné údaje takým spôsobom, ako je uvedené v našich podmienky používania, a mi nastavíme alebo prečítame iba relevantné súbory cookies v čase uvedenom v tabuľke, ku ktorej sa dostanete kliknutím na príslušný odkaz vo vyskakovacom okne.",
      "Aby ste vypli príslušné súbory cookies, ktoré sa používajú na základe súhlasu, môžete kedykoľvek odvolať svoj súhlas s používaním cookies. Uskutočňuje sa to pomocou ikony cookies v príslušnej časti našich stránok. Dovoľujeme si vás upozorniť, že súbory cookies môžu na vašom zariadení zostať aj po tom, čo sa rozhodnete ich nepoužívať. Ďalšie informácie o tom, ako tieto súbory odstrániť z vášho zariadenia, nájdete v texte nižšie alebo v záložke pomocníka/nápovedy vášho prehliadača.",
      "S odvolaním vášho súhlasu s používaním voliteľných cookies je spojené aj odvolanie súhlasu na použitie osobných údajov, ktoré zhromažďujeme pomocou týchto cookies. Ďalšie podrobnosti nájdete v našich podmienkach používania.",
      "Článok V",
      "NAKLADANIE S INFORMÁCIAMI",
      "V tejto časti zásad používania cookies uvádzame, ako používame osobné údaje získané prostredníctvom súborov cookies používaných na našich webových stránkach, na základe akých právnych dôvodov a na aké účely.",
      "Pre prípad zmluvného dôvodu pre nevyhnutné súbory cookies môžeme vaše osobné údaje používať na plnenie našich zmluvných povinností v zmysle našich podmienok používania.",
      "Pre prípad zákonného dôvodu pre nevyhnutné súbory cookies môžeme vaše osobné údaje používať na plnenie našich zákonných povinností, a to najmä v prípadoch, keď od nás zákon vyžaduje rozpoznať predvoľby cookies (napríklad zistiť, keď ste v prehliadači vypli všetky cookies).",
      "Pre prípad oprávneného záujmu pre nevyhnutné súbory cookies, môžeme v rámci nášho oprávneného záujmu používať vaše osobné údaje na prevádzkovanie webových stránok v prípadoch, keď neexistuje zákonný dôvod pre ich spracovanie – viď vyššie.",
      "Pre prípad, že ste nám poskytli svoj súhlas s výkonnostnými súbormi cookies, s funkčnými súbormi cookies alebo s marketingovými súbormi cookies, môžeme vaše osobné údaje použiť a spracovať na:",
      "náhľad a analýzu vykonanú za účelom informovania o našich marketingových stratégiách a na zlepšenie vašej návštevnosti;",
      "identifikáciu a zaznamenanie, kedy ste otvorili webové stránky;",
      "zaznamenanie, kedy sa zapojili do elektronickej komunikácie;",
      "hodnotenie a zlepšovanie našich služieb tak, aby vaša návšteva a používanie webovej stránky boli užitočnejšie;",
      "zhodnotenie použitia webu, aby sme vám mohli poskytnúť rozšírené služby;",
      "kontrolu kvality, výkonu webových stránok a správu systému;",
      "sledovanie vášho prehliadača na iných weboch a vytváranie profilu vašich záujmov, aby sa vám zobrazovali relevantné reklamy na iných webových stránkach;",
      "účely zabezpečenia, ako je napríklad prevencia alebo odhalenie podvodnej činnosti.",
      "Článok VI",
      "KONTROLA A MAZANIE COOKIES",
      "K vypnutiu alebo odhláseniu príslušných súborov cookies slúžia ikony cookies v rohu vášho zariadenia, kde môžete kedykoľvek zmeniť nastavenia cookies. Pre funkčnosť nastavenia bude zrejme nutné aktualizovať stránku. Po tomto vypnutí alebo odhlásení už nebudú naše webové stránky k týmto súborom cookies pristupovať ani ich čítať.",
      "V zariadení môžu zostať aj naďalej uložené rôzne súbory, skripty, kódy prípadne ďalšie informácie týkajúce sa súborov cookies. Tieto môžete odstrániť vymazaním súborov cookies a medzipamäte prehliadača pomocou nastavenia webového prehľadávača.",
      "Akákoľvek zmena nastavenia vášho webového prehľadávača sa vzťahuje iba na tento konkrétny webový prehliadač. Pokiaľ v zariadení používate viac ako jeden webový prehliadač, musíte zmeniť nastavenia zvlášť pre každý prehliadač a každé zariadenie.",
      "Ďalšie informácie týkajúce sa súborov cookies môžu byť k dispozícii v rámci funkcie „pomocník“ prehliadača alebo operačného systému alebo v návode na obsluhu vášho zariadenia.",
      "Pre odhlásenie zo sledovania Google Analytics na všetkých webových stránkach, navštívte stránku http://tools.google.com/dlpage/gaoptout.",
      "Webová stránka http://www.allaboutcookies.org/, poskytuje komplexné informácie o úprave nastavení cookies v celom rade prehliadačov. Dovoľujeme si vás upozorniť, že nakoľko nie sme ani vlastníkmi ani prevádzkovateľmi tohto webu, nenesieme zodpovednosť za jeho obsah.",
      "Dovoľujeme si vás upozorniť, že v prípade, ak pomocou nastavení webového prehľadávača zakážete nevyhnutné súbory cookies (alebo všetky súbory cookies), nebude fungovať jedna alebo viac základných funkcií týchto webových stránok vrátane tých, ktoré majú zaistiť bezpečnú návštevu, správne alebo vôbec.",
      "Dovoľujeme si vás upozorniť, že v prípade, ak odmietnete alebo odvoláte súhlas s použitím akýchkoľvek nie nevyhnutných cookies alebo súvisiacich osobných údajov, nemusí zodpovedajúca funkcia alebo funkcia týchto webových stránok fungovať správne alebo vôbec. Použitie základných funkcií a funkčnosť webových stránok týmto nebude dotknuté.",
      "Článok VII",
      "HLAVNÉ COOKIES A COOKIES TRETÍCH STRÁN",
      "Kliknutím na odkaz Podrobnosti o súbore cookies na banneri sa dostanete k zoznamu hlavných súborov cookies, ktoré na našich stránkach používame, ako aj k informáciám o účele ich použitia, ktoré sa nachádzajú v tabuľke Podrobnosti o súboroch cookies.",
      "V rámci našej činnosti používame a spolupracujeme s viacerými dodávateľmi a partnermi tretích strán, ktorí nastavujú alebo čítajú súbory cookies na našich webových stránkach, pričom nad týmito súbormi nemáme žiadnu kontrolu. Odporúčame, aby ste si kontrolovali zásady ochrany osobných údajov príslušnej tretej strany, a to aj napriek tomu, že poskytujeme zhrnutie súborov cookies tretích strán použitých v tabuľke Podrobnosti o súboroch cookies.",
      "Súbory cookies tretích strán používané v súvislosti s našimi webovými stránkami zahŕňajú:",
      "Nevyhnutné súbory cookies. Ide o súbory cookies, ktoré sú nevyhnutné pre fungovanie našich webových stránok.",
      "Výkonnostné súbory cookies. Používame cookies, aby ste nám pomohli zhromažďovať informácie, ktoré nám umožňujú analyzovať webovú prevádzku na našich webových stránkach. Informácie zhromaždené prostredníctvom cookies, ktoré sú anonymné, sú zasielané tretej strane, ktorá prevádzkuje analytické nástroje, ktoré používame na analýzu zhromaždených informácií a na zlepšenie výkonu webu.",
      "Funkčné súbory cookies. Súbory cookies používame na zlepšenie funkčnosti a zabezpečenie webu vrátane zapamätania vašich preferencií a správy výkonu webu.",
      "Marketingové súbory cookies. Tieto cookies sú nastevné prostredníctvom našich stránok našimi marketingovými partnermi a slúžia na vytváranie profilu vašich záujmov a zobrazovanie relevantných reklám na iných stránkach. Neukladajú priamo osobné údaje, ale sú založené na jedinečnej identifikácii vášho prehliadača a internetového zariadenia.",
      "Článok VIII",
      "SLEDOVANIE EMAILOV",
      "Niektoré našou spoločnosťou zasielané e-maily, môžu obsahovať tzv. pixelový štítok, webový maják, priehľadný obrázok alebo sledované odkazy, ktoré nám umožňujú zistiť, kedy ste otvorili e-mail, a overiť, ktoré odkazy uvedené v e-maile ste navštívili. Vďaka týmto informáciám vieme zistiť, ktoré časti našich e-mailov sú najviac zaujímavé.",
      "Odstránením e-mailu môžete odstrániť aj pixelový štítok. V prípade, ak si neprajete stiahnuť pixel do svojho počítača alebo iného zariadenia, môžete to zaistiť výberom služby dostávať e-maily vo formáte jednoduchého textu, alebo neotváraním obrázkov v e-maile.",
      "Pre odhlásenie z nášho mailing listu môžete použiť našu kontaktnú emailovú adresu uvedenú v podmienkach používania.",
      "Článok IX",
      "ZMENY A KONTAKT",
      "Kedykoľvek môže dôjsť k zmene týchto základných zásad používania cookies zo strany našej spoločnosti, a to zaslaním e-mailu s pozmenenými ustanoveniami alebo ich zverejnením na našich webových stránkach.",
      "Akékoľvek zmeny nadobudnú účinnosť 7 dní po dátume odoslania e-mailu podľa predchádzajúceho bodu alebo po dátume zverejnenia upravených ustanovení na webových stránkach, podľa toho, ktorá skutočnosť nastane skôr.",
      "Ak máte akékoľvek otázky alebo potrebujete ďalšie informácie o súboroch cookies alebo spracovaní osobných údajov, kontaktujte nás za pomoci kontaktných údajov uvedených v našich podmienkach používania.",
    ],
    description: "Zásady používania súborov cookies na stránke Vavrostav.",
    kind: "legal",
    slug: "zasady-pouzivania-suborov-cookies",
    title: "Zásady používania súborov cookies",
  },
  {
    blocks: [
      "Informácie o poštovnom a doprave budú doplnené.",
    ],
    description: "Informácie o poštovnom a doprave – Vavrostav e-shop.",
    kind: "legal",
    slug: "postovne-a-doprava",
    title: "Poštovné a doprava",
  },
  {
    blocks: [
      "Obchodné podmienky budú doplnené.",
    ],
    description: "Obchodné podmienky e-shopu Vavrostav.",
    kind: "legal",
    slug: "obchodne-podmienky",
    title: "Obchodné podmienky",
  },
  {
    blocks: [
      "Reklamačné podmienky budú doplnené.",
    ],
    description: "Reklamačné podmienky e-shopu Vavrostav.",
    kind: "legal",
    slug: "reklamacne-podmienky",
    title: "Reklamačné podmienky",
  },
  {
    blocks: [
      "Podmienky ochrany osobných údajov budú doplnené.",
    ],
    description: "Podmienky ochrany osobných údajov – Vavrostav e-shop.",
    kind: "legal",
    slug: "podmienky-ochrany-osobnych-udajov",
    title: "Podmienky ochrany osobných údajov",
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
