import styles from './Pagination.module.css';

export default function Pagination({
  page,
  lastPage,
  onPrev,
  onNext,
}: {
  page: number;
  lastPage: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  if (lastPage <= 1) return null;

  return (
    <div className={styles.pagination}>
      <span className={styles.paginationInfo}>
        página {page} de {lastPage}
      </span>
      <button
        type="button"
        className={styles.paginationButton}
        disabled={page <= 1}
        onClick={onPrev}
      >
        anterior
      </button>
      <button
        type="button"
        className={styles.paginationButton}
        disabled={page >= lastPage}
        onClick={onNext}
      >
        próxima
      </button>
    </div>
  );
}
