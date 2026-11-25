const WA_NUMBER = '22670206034';

/** Lien WhatsApp avec message pré-rempli */
export const wa = (subject?: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    subject
      ? `Bonjour ToJC, je souhaite des informations sur : ${subject}.`
      : 'Bonjour ToJC, je souhaite échanger sur un projet.',
  )}`;

export const SITE = {
  name: 'Towards Just Consultancy FZ-LLC',
  shortName: 'Towards Just Consultancy',
  short: 'ToJC',
  motto: 'Toujours œuvrer en Juste Constructeur',
  description:
    "ToJC accompagne entreprises, investisseurs et porteurs de projets : conseil stratégique et finance, commerce international, transport et logistique, BTP.",
  contact: {
    name: 'Lallé Ibrahim SORY',
    role: 'Directeur Général',
    phoneDisplay: '+226 70 20 60 34',
    phoneHref: 'tel:+22670206034',
    whatsapp: `https://wa.me/${WA_NUMBER}`,
    // À compléter : laissés vides, ces champs ne s'affichent pas sur le site
    email: '',
    address: '',
    hours: '',
    freeZone: '',
  },
} as const;

export const EXPERTISES = [
  {
    id: 'finance',
    title: 'Conseil stratégique et finance',
    waSubject: 'Conseil stratégique & Finance',
    short: 'Ingénierie financière, levée de fonds et sécurisation des investissements.',
    long: 'Ingénierie financière, levée de fonds et sécurisation des investissements : nous donnons à vos projets une structure solide et des financements adaptés.',
    alt: 'Tours d’affaires vues en contre-plongée',
    services: [
      'Business plans et études de faisabilité',
      'Montage financier de projets',
      'Recherche de financements et levée de fonds',
      'Due diligence et sécurisation des investissements',
    ],
  },
  {
    id: 'commerce',
    title: 'Commerce international',
    waSubject: 'Commerce international',
    short: 'Import-export, négoce et intermédiation commerciale globale.',
    long: 'Import-export, négoce et intermédiation commerciale globale : nous identifions les bons partenaires et sécurisons chaque transaction.',
    alt: 'Vue aérienne d’un quartier d’affaires',
    services: [
      'Sourcing et sélection de fournisseurs',
      'Négociation et contrats (Incoterms)',
      'Sécurisation des paiements et crédit documentaire',
      'Intermédiation et mise en relation d’affaires',
    ],
  },
  {
    id: 'logistique',
    title: 'Transport et logistique',
    waSubject: 'Transport & Logistique',
    short: 'Maîtrise et optimisation des flux de marchandises mondiaux.',
    long: 'Maîtrise et optimisation des flux de marchandises mondiaux, du port d’embarquement jusqu’à la destination finale, y compris vers les pays sans littoral.',
    alt: 'Autoroute de nuit et flux de véhicules',
    services: [
      'Fret maritime, aérien et routier',
      'Transit et formalités douanières',
      'Acheminement par les corridors de Lomé, Abidjan, Tema et Cotonou',
      'Suivi des expéditions et optimisation des coûts',
    ],
  },
  {
    id: 'btp',
    title: 'Bâtiment et travaux publics',
    waSubject: 'BTP',
    short: 'Conception et réalisation d’infrastructures durables.',
    long: 'Conception et réalisation d’infrastructures durables, avec la rigueur d’un bâtisseur engagé.',
    alt: 'Façade d’un immeuble contemporain',
    services: [
      'Études et conception',
      'Maîtrise d’œuvre et suivi de chantier',
      'Construction de bâtiments',
      'Voiries, réseaux et travaux publics',
    ],
  },
] as const;

export const PILLARS = [
  { letters: 'To', title: 'Toujours œuvrer', text: 'La détermination et la pérennité au service de vos ambitions.' },
  { letters: 'J', title: 'Juste', text: 'L’éthique, la transparence et la précision dans chaque transaction.' },
  { letters: 'C', title: 'Constructeur', text: 'La capacité de bâtir des solutions solides, immatérielles ou physiques.' },
] as const;

/** Préfixe un chemin interne avec la base du site (ex. « /tojc » sur GitHub Pages) */
export const u = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;
