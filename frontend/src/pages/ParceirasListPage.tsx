import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  listParceirasPage,
  parceiraStatusTone,
  type Parceira,
  type ParceiraStatus,
} from '../lib/parceiras';
import { useAuth } from '../lib/auth';
import Badge from '../components/Badge';
import EmptyState from '../components/EmptyState';
import { LinkButton } from '../components/Button';
import Pagination from '../components/Pagination';
import styles from './ParceirasListPage.module.css';

export default function ParceirasListPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';
  const [searchParams, setSearchParams] = useSearchParams();
  const statusFilter = searchParams.get('status') === 'Inativa' ? 'Inativa' : null;

  const [parceiras, setParceiras] = useState<Parceira[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [statusFilter]);

  useEffect(() => {
    setParceiras(null);
    listParceirasPage({
      ...(statusFilter ? { status: statusFilter as ParceiraStatus } : {}),
      page,
    })
      .then((response) => {
        setParceiras(response.data);
        setLastPage(response.meta?.last_page ?? 1);
      })
      .catch(() => setError('Não foi possível carregar as parceiras. Tente novamente.'));
  }, [statusFilter, page]);

  function selecionarFiltro(novoStatus: 'Inativa' | null) {
    if (novoStatus) {
      setSearchParams({ status: novoStatus });
    } else {
      setSearchParams({});
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h2 className={styles.title}>Parceiras</h2>
          <p className={styles.subtitle}>Base de influenciadoras cadastradas.</p>
        </div>
        {isAdmin && <LinkButton to="/parceiras/nova">nova parceira</LinkButton>}
      </header>

      <div className={styles.filterTabs} role="tablist" aria-label="Filtrar por status">
        <button
          type="button"
          role="tab"
          aria-selected={statusFilter === null}
          className={[styles.filterTab, statusFilter === null ? styles.filterTabActive : '']
            .filter(Boolean)
            .join(' ')}
          onClick={() => selecionarFiltro(null)}
        >
          todas
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={statusFilter === 'Inativa'}
          className={[styles.filterTab, statusFilter === 'Inativa' ? styles.filterTabActive : '']
            .filter(Boolean)
            .join(' ')}
          onClick={() => selecionarFiltro('Inativa')}
        >
          novas inscrições
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {parceiras === null && !error && <p className={styles.loading}>Carregando…</p>}

      {parceiras?.length === 0 && statusFilter === 'Inativa' && (
        <EmptyState
          title="Nenhuma inscrição pendente"
          message="Não há novas inscrições aguardando aprovação no momento."
        />
      )}

      {parceiras?.length === 0 && statusFilter === null && (
        <EmptyState
          title="Nenhuma parceira cadastrada"
          message="Você ainda não possui parceiras cadastradas."
        />
      )}

      {parceiras !== null && parceiras.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Status</th>
              <th>Email</th>
              <th aria-hidden="true" />
            </tr>
          </thead>
          <tbody>
            {parceiras.map((parceira) => (
              <tr key={parceira.id}>
                <td>{parceira.nome}</td>
                <td>
                  <Badge label={parceira.status} tone={parceiraStatusTone(parceira.status)} />
                </td>
                <td>{parceira.email ?? '—'}</td>
                <td className={styles.actionCell}>
                  <Link to={`/parceiras/${parceira.id}`} className={styles.actionLink}>
                    ver
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {parceiras !== null && parceiras.length > 0 && (
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
