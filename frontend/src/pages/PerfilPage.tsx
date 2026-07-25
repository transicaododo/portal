import { useState, type FormEvent } from 'react';
import { isAxiosError } from 'axios';
import { useAuth } from '../lib/auth';
import { updateProfile } from '../lib/profile';
import TextField from '../components/TextField';
import Button from '../components/Button';
import styles from './PerfilPage.module.css';

type FieldErrors = {
  name?: string;
  current_password?: string;
  password?: string;
};

export default function PerfilPage() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name ?? '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) return null;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setFormError(null);
    setSuccessMessage(null);
    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const updated = await updateProfile({
        name,
        ...(newPassword
          ? {
              current_password: currentPassword,
              password: newPassword,
              password_confirmation: newPasswordConfirmation,
            }
          : {}),
      });
      updateUser(updated);
      setCurrentPassword('');
      setNewPassword('');
      setNewPasswordConfirmation('');
      setSuccessMessage('Dados atualizados.');
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 422) {
        const errors = error.response.data.errors as Record<string, string[]>;
        const mapped: FieldErrors = {};
        for (const key of Object.keys(errors)) {
          mapped[key as keyof FieldErrors] = errors[key][0];
        }
        setFieldErrors(mapped);
      } else {
        setFormError('Não foi possível salvar as alterações. Tente novamente.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h2 className={styles.title}>Perfil</h2>
      </header>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <section className={styles.group}>
          <h3 className={styles.groupTitle}>Identificação</h3>
          <TextField
            label="Nome"
            value={name}
            onChange={(event) => setName(event.target.value)}
            error={fieldErrors.name}
            required
          />
          <TextField label="Email" value={user.email} disabled />
        </section>

        <section className={styles.group}>
          <h3 className={styles.groupTitle}>Alterar senha</h3>
          <p className={styles.groupHint}>Deixe em branco para manter a senha atual.</p>
          <TextField
            label="Senha atual"
            type="password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            error={fieldErrors.current_password}
          />
          <TextField
            label="Nova senha"
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            error={fieldErrors.password}
          />
          <TextField
            label="Confirmar nova senha"
            type="password"
            value={newPasswordConfirmation}
            onChange={(event) => setNewPasswordConfirmation(event.target.value)}
          />
        </section>

        {formError && (
          <p role="alert" className={styles.formError}>
            {formError}
          </p>
        )}
        {successMessage && <p className={styles.successMessage}>{successMessage}</p>}

        <Button type="submit" isLoading={isSubmitting} loadingText="salvando…">
          salvar alterações
        </Button>
      </form>
    </div>
  );
}
