import React from "react";
import Popup from "reactjs-popup";
import "./Confirmation.scss";
import { Icon } from "@iconify/react";

type ConfirmationProp = {
  trigger: JSX.Element;
  question: string | JSX.Element;
  confirmText: string;
  cancelText?: string;
  onConfirm: () => void;
};

export const Confirmation: React.FC<ConfirmationProp> = ({
  trigger,
  question,
  confirmText,
  cancelText = "Отмена",
  onConfirm,
}) => {
  return (
    <Popup trigger={trigger} modal>
      {/* @ts-ignore */}
      {(close: React.MouseEventHandler) => (
        <div className="modal">
          <Icon icon="radix-icons:cross-2" className="close" onClick={close} />
          {question}
          <div className="actions">
            <button
              onClick={(e) => {
                onConfirm();
                close(e);
              }}
              className="confirm"
            >
              {confirmText}
            </button>
            <button onClick={close} className="cancel">
              {cancelText}
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};
