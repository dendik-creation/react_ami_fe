import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export const parseDateHaha = (dateString: string) => {
  const parsedDate = new Date(dateString);
  return format(parsedDate, 'EEEE, d MMMM yyyy', { locale: id });
};

export const isAvailableToRespon = (dateString: string) => {
  const targetDate = new Date(dateString);
  const now = new Date();
  if (now <= targetDate) {
    return true;
  } else {
    return false;
  }
};
