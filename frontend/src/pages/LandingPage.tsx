import { useEffect, useRef, useState } from 'react';
import wordmark from '../assets/brand/wordmark-preto.svg';
import Reveal from '../components/Reveal';
import { HERO_PARALLAX_RANGE, prefersReducedMotion, staggerDelay, STAGGER_STEP_TIGHT } from '../motion';
import styles from './LandingPage.module.css';

const SERVICOS = [
  {
    nome: 'branding',
    descricao:
      'uma marca forte não se reconhece pelo logo. se reconhece pela coerência entre o que diz, o que vende e como aparece. começamos com imersão: contexto, produto, público e o valor que a marca já carrega sem saber nomear. dali, estruturamos posicionamento, narrativa e identidade visual com clareza suficiente para que cada decisão futura tenha onde se apoiar. o entregável é um sistema vivo, não um manual engessado.',
  },
  { nome: 'gestão de mkt de influência', descricao: null },
  { nome: 'direção criativa e produção de campanhas', descricao: null },
  { nome: 'social media', descricao: null },
];

// TODO: substituir pelos perfis reais assim que existirem — spotify e
// pinterest ainda não têm conta da marca, contato aponta para a seção
// de agendamento já existente na própria página.
const FOOTER_LINKS = [
  { nome: 'instagram', href: 'https://instagram.com' },
  { nome: 'spotify', href: '#' },
  { nome: 'pinterest', href: '#' },
  { nome: 'contato', href: '#contato' },
];

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [servicoAberto, setServicoAberto] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);

  // Liga a classe de entrada do cabeçalho um frame depois do primeiro
  // paint, para que o fade + leve subida com stagger seja visível.
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Parallax sutil do hero: a imagem se desloca mais devagar que o
  // scroll, dando profundidade sem chamar atenção. rAF-throttled;
  // desligado para quem prefere menos movimento.
  useEffect(() => {
    if (prefersReducedMotion()) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const hero = heroRef.current;
        const bg = heroBgRef.current;
        if (!hero || !bg) return;
        const rect = hero.getBoundingClientRect();
        const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
        bg.style.transform = `translateY(${progress * HERO_PARALLAX_RANGE}%)`;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={styles.page}>
      <div ref={heroRef} className={styles.hero}>
        {/* decorativo: a mensagem da marca já está no h1 logo abaixo, o
            símbolo não carrega informação própria para leitor de tela */}
        <div ref={heroBgRef} className={styles.heroBg} aria-hidden="true" />
        <div className={`${styles.heroBar} ${mounted ? styles.heroBarIn : ''}`}>
          <a href="/" className={styles.wordmarkLink} aria-label="criativo Dodô — página inicial">
            <img src={wordmark} alt="" className={styles.wordmark} />
          </a>
          <nav aria-label="Navegação principal">
            <ul className={styles.navLinks}>
            <li style={{ transitionDelay: `${staggerDelay(1, STAGGER_STEP_TIGHT)}s` }}>
              <a href="#sobre" className={styles.navLink}>
                sobre nós
              </a>
            </li>
            <li style={{ transitionDelay: `${staggerDelay(2, STAGGER_STEP_TIGHT)}s` }}>
              <a href="#servicos" className={styles.navLink}>
                arquitetura de serviços
              </a>
            </li>
            <li style={{ transitionDelay: `${staggerDelay(3, STAGGER_STEP_TIGHT)}s` }}>
              <a href="#metodologia" className={styles.navLink}>
                metodologia
              </a>
            </li>
            <li style={{ transitionDelay: `${staggerDelay(4, STAGGER_STEP_TIGHT)}s` }}>
              <a href="#contato" className={styles.navLink}>
                que tal um café?
              </a>
            </li>
              <li style={{ transitionDelay: `${staggerDelay(5, STAGGER_STEP_TIGHT)}s` }}>
                <a href="/login" className={styles.navLinkCta}>
                  acesse o portal
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <a href="#sobre" className={`${styles.scrollCue} ${mounted ? styles.heroBarIn : ''}`} aria-label="Rolar para ver mais">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 16.7L24.346 36.346L43.994 16" stroke="currentColor" strokeWidth="4" />
          </svg>
        </a>
      </div>

      <section id="sobre" className={styles.tese}>
        <div className={styles.teseInner}>
          <Reveal className={styles.teseHeadlineWrap}>
            <h1 className={styles.teseHeadline}>marcas não precisam de fórmula. precisam de norte.</h1>
          </Reveal>
          <div className={styles.teseTexto}>
            <Reveal delay={staggerDelay(0)}>
              <p className={styles.teseParagrafo}>
                somos um estúdio que lê marcas antes de movimentá-las. não começamos pelo conteúdo,
                começamos pela direção: o que a marca defende, como ela aparece e por que isso importa
                para quem a encontra pela primeira vez ou pela décima.
              </p>
            </Reveal>
            <Reveal delay={staggerDelay(1)}>
              <p className={styles.teseParagrafo}>
                ouvimos o que já se sustenta e identificamos o que pede revisão. unimos posicionamento,
                narrativa e estética com dados para dar chão e feeling para dar forma.
              </p>
            </Reveal>
            <Reveal delay={staggerDelay(2)}>
              <p className={styles.teseParagrafo}>
                direção criativa, editorial, social ou influência, tudo parte do mesmo lugar e carrega
                uma identidade alinhada em qualquer ponto de contato.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="servicos" className={styles.servicos} aria-labelledby="servicos-titulo">
        <div className={styles.servicosInner}>
          <Reveal>
            <h2 id="servicos-titulo" className={styles.servicosTitulo}>
              arquitetura de serviços
            </h2>
          </Reveal>
          <ul className={styles.servicosLista}>
            {SERVICOS.map((servico, index) => {
              const aberto = servicoAberto === index;
              const contentId = `servico-conteudo-${index}`;
              return (
                <li key={servico.nome} className={styles.servicoItem}>
                  <Reveal delay={staggerDelay(index)}>
                    <button
                      type="button"
                      className={styles.servicoResumo}
                      aria-expanded={aberto}
                      aria-controls={contentId}
                      onClick={() => setServicoAberto(aberto ? -1 : index)}
                    >
                      <h3 className={styles.servicoNome}>{servico.nome}</h3>
                      <span className={`${styles.servicoToggle} ${aberto ? styles.servicoToggleAberto : ''}`} aria-hidden="true" />
                    </button>
                    <div id={contentId} className={`${styles.servicoConteudoWrap} ${aberto ? styles.servicoConteudoAberto : ''}`}>
                      <div className={styles.servicoConteudoInner}>
                        {servico.descricao && <p className={styles.servicoDescricao}>{servico.descricao}</p>}
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section id="metodologia" className={styles.metodologia} aria-labelledby="metodologia-titulo">
        <div className={styles.metodologiaBloco}>
          <div className={styles.metodologiaConteudo}>
            <Reveal>
              <h2 id="metodologia-titulo" className={styles.metodologiaTitulo}>
                nossa metodologia
              </h2>
            </Reveal>
            <div className={styles.metodologiaTexto}>
              <Reveal delay={staggerDelay(0)}>
                <p className={styles.metodologiaParagrafo}>
                  <strong>não existe atalho que preserve o essencial.</strong> começamos pela leitura do
                  que a marca sustenta hoje e do que ela ainda não consegue nomear.
                  <br />
                  em um cenário com muito ruído, o que diferencia é o artesanal: a escuta que antecede a
                  proposta, o critério que organiza as escolhas, a síntese que dá forma.{' '}
                  <strong>a tecnologia entra como ferramenta dentro desse método, nunca como norte.</strong>
                </p>
              </Reveal>
              <Reveal delay={staggerDelay(1)}>
                <p className={styles.metodologiaParagrafo}>
                  no branding, atravessamos negócio, mercado e linguagem até que estratégia, narrativa e
                  estética falem a mesma coisa. no planejamento e no social, traduzimos isso em direção
                  prática para o período. no tráfego, garantimos que a marca apareça com coerência em
                  cada etapa do funil. na influência, escolhemos com critério para que a marca apareça
                  onde faz sentido aparecer.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section id="contato" className={styles.fechamento} aria-labelledby="fechamento-titulo">
        <div className={styles.fechamentoBloco}>
          <Reveal>
            <h2 id="fechamento-titulo" className={styles.fechamentoTitulo}>
              branding, conteúdo e influência para marcas de moda e lifestyle
            </h2>
          </Reveal>
          <Reveal delay={staggerDelay(1)}>
            <p className={styles.fechamentoConvite}>
              <strong>que tal um café?</strong> um convite simples para conversar sobre a sua marca,
              entender o momento e pensar juntos os próximos passos. conversa leve, com clareza e sem
              pressão.
            </p>
          </Reveal>
          <Reveal delay={staggerDelay(2)}>
            <a href="mailto:contato@criativododo.com.br" className={styles.botaoAgendar}>
              agendar :)
            </a>
          </Reveal>
        </div>
      </section>

      <footer className={styles.rodape}>
        {/* Sem Reveal: é o último elemento da página, não há mais scroll
            para "revelar" o rodapé ao se aproximar dele — ele já está na
            tela quando o usuário chega até aqui. */}
        <div className={styles.rodapeInner}>
          <span>criativo Dodô — {new Date().getFullYear()}</span>
          <span aria-hidden="true">|</span>
          {FOOTER_LINKS.map((link, index) => (
            <span key={link.nome}>
              <a href={link.href} className={styles.footerLink}>
                {link.nome}
              </a>
              {index < FOOTER_LINKS.length - 1 && <span aria-hidden="true">,</span>}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}
