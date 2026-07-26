import { useEffect, useRef, useState, type ReactNode } from 'react';
import { prefersReducedMotion } from '../motion';
import styles from './Reveal.module.css';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: 'up' | 'left';
};

/*
  Revela o conteúdo ao entrar na viewport (fade + leve subida), cedo o
  bastante para que o movimento já tenha assentado quando o elemento
  chega ao centro da tela; some de novo ao rolar para cima, para que a
  página não pareça "gasta" depois do primeiro scroll. Sem dependência
  externa de animação — IntersectionObserver + CSS transition — e com
  prefers-reduced-motion sempre respeitado.
*/
export default function Reveal({ children, className, delay = 0, variant = 'up' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.15,
      rootMargin: '0px 0px -15% 0px',
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const classes = [styles.reveal, variant === 'left' ? styles.revealLeft : '', visible ? styles.visible : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} className={classes} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}
