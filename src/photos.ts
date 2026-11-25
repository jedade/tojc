import hero from './assets/photos/accueil-hero.jpg';
import finance from './assets/photos/finance.jpg';
import commerce from './assets/photos/commerce.jpg';
import logistique from './assets/photos/logistique.jpg';
import btp from './assets/photos/btp.jpg';
import aPropos from './assets/photos/a-propos.jpg';
import equipe from './assets/affiche/equipe.jpg';
import icFinance from './assets/affiche/icone-finance.png';
import icCommerce from './assets/affiche/icone-commerce.png';
import icLogistique from './assets/affiche/icone-logistique.png';
import icBtp from './assets/affiche/icone-btp.png';

export const PHOTOS = { hero, aPropos, equipe, finance, commerce, logistique, btp };

/** Illustrations des expertises, extraites de l'affiche ToJC */
export const ICONS = { finance: icFinance, commerce: icCommerce, logistique: icLogistique, btp: icBtp };

/** Diapositives du carrousel d'accueil (ordre d'affichage) */
export const SLIDES = [
  { src: equipe, alt: 'L’équipe ToJC devant un panorama urbain', position: '50% 30%' },
  { src: hero, alt: 'Immeuble contemporain aux façades blanches', position: '70% 50%' },
  { src: logistique, alt: 'Autoroute de nuit et flux de véhicules', position: '50% 60%' },
  { src: commerce, alt: 'Vue aérienne d’un quartier d’affaires', position: '50% 50%' },
  { src: btp, alt: 'Façade d’un immeuble contemporain', position: '50% 50%' },
];
