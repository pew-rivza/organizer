export type ConfirmationProps = {
  trigger: JSX.Element;
  question: string | JSX.Element;
  confirmText: string;
  cancelText?: string;
  onConfirm: () => void;
};
