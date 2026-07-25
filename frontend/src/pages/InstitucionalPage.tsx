import buttonStyles from '../components/Button.module.css';
import styles from './InstitucionalPage.module.css';

const SERVICOS = [
  {
    nome: 'Branding',
    descricao: 'Identidade visual e verbal para marcas que querem ser lembradas, não só vistas.',
  },
  {
    nome: 'Conteúdo',
    descricao: 'Fotografia, vídeo e texto pensados para cada canal, do feed ao ponto de venda.',
  },
  {
    nome: 'Social Media',
    descricao: 'Gestão de redes com calendário, aprovação e métricas — sem perder a voz da marca.',
  },
  {
    nome: 'Influência',
    descricao: 'Curadoria e gestão de parcerias com criadoras, do briefing ao pagamento.',
  },
];

export default function InstitucionalPage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <img src="/horizontal-branco.svg" alt="Criativo Dodô" className={styles.logo} />
        <p className={styles.eyebrow}>Criativo Dodô</p>
        <h1 className={styles.headline}>Marcas com ponto de vista, não só com posts.</h1>
        <p className={styles.subheadline}>
          Somos uma agência de branding, conteúdo e influência. Ajudamos marcas a decidir o que
          dizer, mostrar e com quem colaborar — e cuidamos da execução do início ao fim.
        </p>
        <a href="#contato" className={styles.heroCta}>
          <span className={styles.heroCtaButton}>vamos tomar um café</span>
        </a>
      </header>

      <section className={styles.servicos} aria-labelledby="servicos-title">
        <h2 id="servicos-title" className={styles.sectionTitle}>
          O que fazemos
        </h2>
        <div className={styles.servicosGrid}>
          {SERVICOS.map((servico) => (
            <article key={servico.nome} className={styles.servicoCard}>
              <h3 className={styles.servicoNome}>{servico.nome}</h3>
              <p className={styles.servicoDescricao}>{servico.descricao}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.projetos} aria-labelledby="projetos-title">
        <h2 id="projetos-title" className={styles.sectionTitle}>
          Projetos
        </h2>
        <p className={styles.projetosEmBreve}>
          Nosso portfólio está a caminho. Enquanto isso, fale com a gente — contamos os casos
          direto.
        </p>
      </section>

      <section id="contato" className={styles.contato} aria-labelledby="contato-title">
        <h2 id="contato-title" className={styles.sectionTitle}>
          Contato
        </h2>
        <p className={styles.contatoTexto}>
          Conta pra gente o que sua marca precisa. Respondemos rápido.
        </p>
        <a
          href="mailto:contato@criativododo.com.br"
          className={`${buttonStyles.button} ${buttonStyles.primary} ${styles.contatoCta}`}
        >
          contato@criativododo.com.br
        </a>
      </section>

      <footer className={styles.footer}>
        <span>Criativo Dodô</span>
        <span className={styles.footerDot} />
        <span>Gestão de marca, conteúdo e influência</span>
      </footer>
    </div>
  );
}
