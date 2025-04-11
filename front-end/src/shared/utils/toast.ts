import toast from "react-hot-toast";

// alert
export function showAlert(message: string) {
  return toast(message);
}

// 성공 메시지
export function showSuccess(message: string) {
  return toast.success(message);
}

// 에러 메시지
export function showError(message: string) {
  return toast.error(message);
}
