import { CustomerViewFormProps } from 'sections/customer/CustomerView';
import { addDays, parseISO } from 'date-fns';

export const customerViewData: CustomerViewFormProps[] = [
  {
    referenceno: 'RF4564644',
    policyno: 'PLN1234156',
    date: addDays(parseISO('2016-01-01'), 1),
    time: '10:30'
  }
];
