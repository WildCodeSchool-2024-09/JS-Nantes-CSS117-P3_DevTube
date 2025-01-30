import { useCallback } from "react";
import { toast } from "react-toastify";

/*
Ajouter les lignes ci-dessous où vous avez besoin d'utiliser useToastify

import useToast from "../../utils/useToastify";
const { notifySuccess, notifyError } = useToast();
*/

const useToast = () => {
  const notifySuccess = useCallback((msg: string) => toast.success(msg), []);
  const notifyError = useCallback((msg: string) => toast.error(msg), []);
  return { notifySuccess, notifyError };
};
export default useToast;
