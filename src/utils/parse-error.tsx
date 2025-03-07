import { globalMessage } from '@/constants/message';

type ErrorResponse = {
  statutsCode: number;
  error: string;
  message: string;
};

export const parseError = (error: string | ErrorResponse | undefined) => {
  if (!error) {
    return '';
  }

  let message = 'Error: ';

  if (typeof error === 'string') {
    message += `${error} - `;
  }

  if (typeof error === 'object' && error.message) {
    return (message += `${error.message}`);
  }

  return (message += globalMessage.somethingWentWrong);
};
