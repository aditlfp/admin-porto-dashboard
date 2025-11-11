import { toast } from 'react-toastify';

export const notifySuccess = (title) => toast.success(title);
export const notifyError = (title) => toast.error(title);
export const notifyWarning = (title) => toast.warn(title);
export const notifyInfo = (title) => toast.info(title);