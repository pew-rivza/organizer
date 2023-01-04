import { Icon } from "@iconify/react";
import React from "react";
import Popup from "reactjs-popup";

import { ConfirmationProps } from "types/props";

import "./Confirmation.scss";

export const Confirmation: React.FC<ConfirmationProps> = ({
  trigger,
  question,
  confirmText,
  cancelText = "Отмена",
  onConfirm,
}) => {
  const popupBody: any = (close: () => void) => {
    return (
      <div className="modal">
        <Icon icon="radix-icons:cross-2" className="close" onClick={close} />
        {question}
        <div className="actions">
          <button
            onClick={() => {
              onConfirm();
              close();
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
    );
  };

  return (
    <Popup trigger={trigger} modal>
      {popupBody}
    </Popup>
  );
};
