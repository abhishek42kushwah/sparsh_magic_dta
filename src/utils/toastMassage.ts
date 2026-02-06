import { toast } from 'sonner';

export const successToast = (msg:string) => toast.success(msg, {
  position: "top-right",
  
});

export const errorToast = (msg:string) => toast.error(msg, {
  position: "top-right",
});

export const warningToast = (msg:string) => toast.warning(msg, {
  position: "top-right",
 
});

