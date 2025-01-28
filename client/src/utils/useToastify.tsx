import { toast } from "react-toastify";
/*
Ajouter les lignes ci-dessous où vous avez besoin d'utiliser useToastify
import useToast from "../../utils/useToastify";
const { notifySuccess, notifyError } = useToast();
*/
const useToast = () => {
  const notifySuccess = (msg: string) => toast.success(msg);
  const notifyError = (msg: string) => toast.error(msg);
  return { notifySuccess, notifyError };
};
export default useToast;
