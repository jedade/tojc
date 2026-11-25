/**
 * Photos réelles, libres de droits (licence Unsplash : usage commercial gratuit,
 * sans attribution obligatoire). Aucune image générée par IA.
 * Les crédits sont repris dans la page Mentions légales.
 */
import equipe from './assets/photos/equipe.jpg';
import finance from './assets/photos/finance.jpg';
import commerce from './assets/photos/commerce.jpg';
import logistique from './assets/photos/logistique.jpg';
import btp from './assets/photos/btp.jpg';
import chantier from './assets/photos/chantier.jpg';

export const PHOTOS = { equipe, finance, commerce, logistique, btp, chantier };

export const PHOTO_ALTS = {
  finance: 'Homme d’affaires au téléphone, prenant des notes devant son ordinateur',
  commerce: 'Porte-conteneurs chargé, au large de Port-Saïd',
  logistique: 'Camions de marchandises sur une route nationale au Kenya',
  btp: 'Ouvriers posant une charpente et une toiture en Ouganda',
} as const;

/** Diapositives du carrousel d'accueil (ordre d'affichage) */
export const SLIDES = [
  { src: equipe, alt: 'Réunion d’équipe dans une salle de conférence à Lagos', position: '50-50' },
  { src: commerce, alt: PHOTO_ALTS.commerce, position: '50-50' },
  { src: logistique, alt: PHOTO_ALTS.logistique, position: '40-70' },
  { src: btp, alt: PHOTO_ALTS.btp, position: '50-35' },
  { src: finance, alt: PHOTO_ALTS.finance, position: '70-50' },
];

/** Crédits photographiques */
export const CREDITS = [
  { what: 'Réunion d’équipe, Lagos (Nigeria)', who: 'Ninthgrid', url: 'https://unsplash.com/photos/AekHsx1SxXQ' },
  { what: 'Homme d’affaires', who: 'Vitaly Gariev', url: 'https://unsplash.com/photos/QqrzaNxK-94' },
  { what: 'Porte-conteneurs, Port-Saïd (Égypte)', who: 'Mohammed Mosaad', url: 'https://unsplash.com/photos/6NXLGfpCuEM' },
  { what: 'Camions sur la route (Kenya)', who: 'Sweder Breet', url: 'https://unsplash.com/photos/5k68xh2BS3g' },
  { what: 'Chantier de toiture (Ouganda)', who: 'Mugabi Owen', url: 'https://unsplash.com/photos/qUOjMuKDkrM' },
  { what: 'Chantier, Johannesburg (Afrique du Sud)', who: 'Mark Potterton', url: 'https://unsplash.com/photos/sNVkn3507Oo' },
];
