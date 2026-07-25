import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import type { Role } from '../lib/auth';
import { countParceiras } from '../lib/parceiras';
import { countCampanhas } from '../lib/campanhas';
import styles from './Dashboard.module.css';

const ROLE_LABELS: Record<Role, string> = {
  ADMIN: 'Administrador(a)',
  GESTOR_MARCA: 'Gestor(a) de Marca',
  INFLUENCIADORA: 'Influenciadora',
};

function greetingForHour(hour: number): string {
  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
}

type IndicadorStatus = 'loading' | 'error' | 'ready';

export default function Dashboard() {
  const { user } = useAuth();
  const [pendentes, setPendentes] = useState<number | null>(null);
  const [pendentesStatus, setPendentesStatus] = useState<IndicadorStatus>(
    user?.role === 'ADMIN' ? 'loading' : 'ready',
  );
  const [totalCampanhas, setTotalCampanhas] = useState<number | null>(null);
  const [campanhasStatus, setCampanhasStatus] = useState<IndicadorStatus>('loading');

  useEffect(() => {
    if (user?.role !== 'ADMIN') return;
    setPendentesStatus('loading');
    countParceiras({ status: 'Inativa' })
      .then((total) => {
        setPendentes(total);
        setPendentesStatus('ready');
      })
      .catch(() => setPendentesStatus('error'));
  }, [user?.role]);

  useEffect(() => {
    setCampanhasStatus('loading');
    countCampanhas({ status: 'ATIVA' })
      .then((total) => {
        setTotalCampanhas(total);
        setCampanhasStatus('ready');
      })
      .catch(() => setCampanhasStatus('error'));
  }, []);

  if (!user) return null;

  const firstName = user.name.split(' ')[0];
  const greeting = greetingForHour(new Date().getHours());
  const roleLabel = user.role ? ROLE_LABELS[user.role] : 'Sem papel atribuído';

  return (
    <>
      <section className={styles.greeting}>
        <h2 className={styles.greetingTitle}>
          {greeting}, {firstName}.
        </h2>
        <p className={styles.greetingSubtitle}>{roleLabel} — este é o seu painel.</p>
      </section>
      <section className={styles.cards}>
        <article className={styles.card}>
          <h3 className={styles.cardTitle}>Campanhas</h3>
          {campanhasStatus === 'loading' && (
            <p className={styles.cardMessage}>Carregando…</p>
          )}
          {campanhasStatus === 'error' && (
            <p className={styles.cardMessage} role="alert">
              Não foi possível carregar as campanhas.
            </p>
          )}
          {campanhasStatus === 'ready' && totalCampanhas ? (
            <>
              <p className={styles.cardMessage}>
                {totalCampanhas} {totalCampanhas === 1 ? 'campanha ativa' : 'campanhas ativas'}.
              </p>
              <Link to="/campanhas?status=ATIVA" className={styles.cardLink}>
                ver campanhas
              </Link>
            </>
          ) : null}
          {campanhasStatus === 'ready' && !totalCampanhas && (
            <p className={styles.cardMessage}>Nenhuma campanha ativa no momento.</p>
          )}
        </article>

        <article className={styles.card}>
          <h3 className={styles.cardTitle}>Colaborações</h3>
          <p className={styles.cardMessage}>Em breve — indicador ainda não implementado.</p>
        </article>

        <article className={styles.card}>
          <h3 className={styles.cardTitle}>Aprovações</h3>
          {pendentesStatus === 'loading' && (
            <p className={styles.cardMessage}>Carregando…</p>
          )}
          {pendentesStatus === 'error' && (
            <p className={styles.cardMessage} role="alert">
              Não foi possível carregar as aprovações.
            </p>
          )}
          {pendentesStatus === 'ready' && pendentes ? (
            <>
              <p className={styles.cardMessage}>
                {pendentes} {pendentes === 1 ? 'inscrição aguardando' : 'inscrições aguardando'}{' '}
                aprovação.
              </p>
              <Link to="/parceiras?status=Inativa" className={styles.cardLink}>
                ver novas inscrições
              </Link>
            </>
          ) : null}
          {pendentesStatus === 'ready' && !pendentes && (
            <p className={styles.cardMessage}>Nenhuma aprovação pendente.</p>
          )}
        </article>

        <article className={styles.card}>
          <h3 className={styles.cardTitle}>Financeiro</h3>
          <p className={styles.cardMessage}>Em breve — indicador ainda não implementado.</p>
        </article>
      </section>
    </>
  );
}
