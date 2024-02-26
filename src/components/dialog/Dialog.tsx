"use client";

import React from 'react';
import { useEffect } from "react";
import styles from "./dialog.module.css";

export type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

// ダイアログ
export function Dialog({ isOpen, onClose, children } : DialogProps) {

  // Close 状態になったときに呼ばれる
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  if (!isOpen)
    return null;

  // ダイアログ以外をクリックしたらダイアログを消す
  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
  <div
    className={styles.container}
    onClick={handleBackgroundClick}
  >
    <div
      className={styles.main}
    >
      <button onClick={onClose}>Close</button>
      {children}
    </div>
  </div>
  );
}
