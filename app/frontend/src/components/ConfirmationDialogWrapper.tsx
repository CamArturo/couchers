import React, { ReactElement, useState } from "react";

import Button from "./Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "./Dialog";

interface ConfirmationDialogWrapperProps {
  children: (setIsOpen: (value: boolean) => void) => ReactElement;
  title: string;
  message: string;
  onConfirm: () => void;
}

export default function ConfirmationDialogWrapper({
  children,
  title,
  message,
  onConfirm,
}: ConfirmationDialogWrapperProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ariaLabel = `${title.replace(/\s+/g, "")}-confirmation-dialog`;
  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };
  return (
    <>
      {children(setIsOpen)}
      <Dialog aria-labelledby={ariaLabel} open={isOpen}>
        <DialogTitle id={ariaLabel}>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm}>Yes</Button>
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
