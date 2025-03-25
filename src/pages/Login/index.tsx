import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

export function Component() {
  const { t } = useTranslation('login');
  return (
    <div>
      <Button variant="outlined">{t('title')}</Button>
    </div>
  );
}
