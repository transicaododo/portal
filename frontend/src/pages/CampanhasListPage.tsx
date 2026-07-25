import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  campanhaStatusTone,
  listCampanhasPage,
  type Campanha,
  type CampanhaStatus,
} from '../lib/campanhas';
import Badge from '../components/Badge';
import EmptyState from '../components/EmptyState';
import Pagination from '../components/Pagination';
import { LinkButton } from '../components/Button';
import { useAuth } from '../lib/auth';
import styles from './CampanhasListPage.module.css';

const VALID_STATUS: CampanhaStatus[] = ['PLANEJADA', 'ATIVA', 'ENCERRADA', 'CANCELADA'];

const STATUS_LABEL: Record<CampanhaStatus, string> = {
  PLANEJADA: 'planejada',
  ATIVA: 'ativa',
  ENCERRADA: 'encerrada',
  CANCELADA: 'cancelada',
};

export default function CampanhasListPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';
  const [searchParams] = useSearchParams();
  const statusParam = searchParams.get('status');
  const statusFilter = VALID_STATUS.includes(statusParam as CampanhaStatus)
    ? (statusParam as CampanhaStatus)
    : undefined;

  const [campanhas, setCampanhas] = useState<Campanha[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [statusFilter]);

  useEffect(() => {
    setCampanhas(null);
    listCampanhasPage({ ...(statusFilter ? { status: statusFilter } : {}), page })
      .then((response) => {
        setCampanhas(response.data);
        setLastPage(response.meta?.last_page ?? 1);
      })
      .catch(() => setError('Não foi possível carregar as campanhas. Tente novamente.'));
  }, [statusFilter, page]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h2 className={styles.title}>Campanhas</h2>
          <p className={styles.subtitle}>Campanhas em andamento e planejadas, por marca.</p>
        </div>
        {isAdmin && <LinkButton to="/campanhas/nova">nova campanha</LinkButton>}
      </header>

      {error && <p className={styles.error}>{error}</p>}

      {campanhas === null && !error && <p className={styles.loading}>Carregando…</p>}

      {campanhas?.length === 0 && (
        <EmptyState
          title={
            statusFilter
              ? `Nenhuma campanha ${STATUS_LABEL[statusFilter]}`
              : 'Nenhuma campanha cadastrada'
          }
          message={
            statusFilter
              ? `Não há campanhas ${STATUS_LABEL[statusFilter]}s no momento.`
              : 'Você ainda não possui campanhas cadastradas.'
          }
        />
      )}

      {campanhas !== null && campanhas.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Campanha</th>
              <th>Marca</th>
              <th>Período</th>
              <th>Status</th>
              <th aria-hidden="true" />
            </tr>
          </thead>
          <tbody>
            {campanhas.map((campanha) => (
              <tr key={campanha.id}>
                <td>{campanha.nome}</td>
                <td>{campanha.marca.nome}</td>
                <td>
                  {campanha.data_inicio}
                  {campanha.data_fim ? ` – ${campanha.data_fim}` : ''}
                </td>
                <td>
                  <Badge label={campanha.status} tone={campanhaStatusTone(campanha.status)} />
                </td>
                <td className={styles.actionCell}>
                  <Link to={`/campanhas/${campanha.id}`} className={styles.actionLink}>
                    ver
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {campanhas !== null && campanhas.length > 0 && (
        <Pagination
          page={page}
          lastPage={lastPage}
          onPrev={() => setPage((current) => current - 1)}
          onNext={() => setPage((current) => current + 1)}
        />
      )}
    </div>
  );
}
