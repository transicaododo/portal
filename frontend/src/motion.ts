/*
  Lado JS/TS do sistema de motion da DODÔ — espelha
  frontend/src/theme/motion.css (mesmo stagger, mesma checagem de
  prefers-reduced-motion). Qualquer componente que precise orquestrar
  animação em JS (delay de stagger, parallax, entrada no mount) usa
  este módulo em vez de valores soltos.
*/

/** Intervalo entre itens de um mesmo grupo revelado em cascata (s). */
export const STAGGER_STEP = 0.15;

/** Cascata mais compacta, para grupos curtos de UI (ex.: itens de nav). */
export const STAGGER_STEP_TIGHT = 0.05;

export function staggerDelay(index: number, step: number = STAGGER_STEP): number {
  return index * step;
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Percurso do parallax do hero, em % de translateY ao longo do scroll da seção. */
export const HERO_PARALLAX_RANGE = 6;
