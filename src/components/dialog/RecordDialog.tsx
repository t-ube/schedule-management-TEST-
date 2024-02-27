"use client";

import React from 'react';
import { useState, useEffect } from "react";
import styles from "./dialog.module.css";
import { EditingRecordData } from '../../types/recordTypes';

export type DialogProps = {
  record: EditingRecordData;
  isOpen: boolean;
  onClose: () => void;
  onSave: (date: Date, duration: number, note: string) => void;
};

// 実績ダイアログ
export function RecordDialog({ record, isOpen, onClose, onSave } : DialogProps) {
  const [date, setDate] = useState<Date>(record.date);
  const [duration, setDuration] = useState<number>(record.duration);
  const [note, setNote] = useState<string>(record.note);
  const [created, setCreated] = useState<boolean>(record.created);

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

  // record が変化したときに呼ばれる
  useEffect(() => {
    setDate(record.date);
    setDuration(record.duration);
    setNote(record.note);
    setCreated(record.created);
  }, [record]);

  if (!isOpen)
    return null;

  // ダイアログ以外をクリックしたらダイアログを消す
  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleSave = () => {
    onSave(date, duration, note);
    onClose();
  };

  const getDateText = (date:Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() は0から始まるため、1を加える
    const day = date.getDate();
    const dayNames = ['日', '月', '火', '水', '木', '金', '土'];
    const dayOfWeek = dayNames[date.getDay()];
    const formattedDate = `${year}年${month.toString().padStart(2, '0')}月${day.toString().padStart(2, '0')}日(${dayOfWeek})`;
    return formattedDate;
  }

  return (
  <div
    className={styles.container}
    onClick={handleBackgroundClick}
  >
    <div
      className={styles.main}
    >
      <div className={styles.item}>
        <div className={styles.item}>
          <label className={styles.date}>{getDateText(date)}</label>
        </div>
        <label className={styles.itemLabel}>学習時間（時間）:</label>
        <input
          className={styles.inputArea}
          type="number"
          min="0"
          max="24"
          step="1"
          value={duration}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            if (!isNaN(value) && value >= 0 && value <= 24) {
              setDuration(value)
            }
          }}
          disabled={created}
        />
      </div>
      <div className={styles.item}>
        <label className={styles.itemLabel}>メモ（1000文字以内）:</label>
        <textarea
          className={styles.textArea}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          maxLength={1000}
          disabled={created}
        />
      </div>
      <button
        className={styles.buttonSave}
        onClick={handleSave}
        disabled={created}
        hidden={created}
      >
        保存
      </button>
      <button className={styles.buttonClose} onClick={onClose}>閉じる</button>
    </div>
  </div>
  );
}
