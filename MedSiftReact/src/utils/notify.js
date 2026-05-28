import { toast } from 'react-toastify';

const base = { position: 'top-right', autoClose: 4000 };

export const notify = {
  success: (msg) => toast.success(msg, base),
  error:   (msg) => toast.error(msg, base),
  warn:    (msg) => toast.warn(msg, base),
  info:    (msg) => toast.info(msg, base),
};
