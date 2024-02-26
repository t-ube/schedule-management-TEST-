"use client";

import { useState, useCallback, useEffect } from "react";
import FullCalendar from '@fullcalendar/react';
import { DatesSetArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';// FullCalendarで月表示を可能にするプラグイン
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";// FullCalendarで日付や時間が選択できるようになるプラグイン
import allLocales from '@fullcalendar/core/locales-all';// 多言語化
import styles from "./calender.module.css";
import { RecordData } from '../../types/recordTypes';

export type RecordBarChartProps = {
  onDatesSet: (arg: DatesSetArg) => void,
  onDateClick: (arg: DateClickArg) => void,
  records: RecordData[] | [],
};

// メモ用の型
type Memo = {
  title: string,
  date: string,
  description: string,
  backgroundColor: string
}

// RecordData から Memo へのマッピング関数
export function convertRecordDataToMemos(records: RecordData[]): Memo[] {
  return records.map(record => ({
    title: record.note, // レコードのノート
    date: record.date, // "2024-02-04T00:00:00.000Z" のような形式
    description: `勉強時間: ${record.duration}時間`, // 例: "勉強時間: 2時間"
    backgroundColor: "green" // 背景色は一律で設定（必要に応じて変更可）
  }));
}

// 実績カレンダー
export function RecordCalendar({ onDatesSet, onDateClick, records } : RecordBarChartProps) {
  const [memos, setMemos] = useState<Memo[]>([]);
  
  useEffect(()=>{
    setMemos(convertRecordDataToMemos(records));
  },[records])

  // 未来の日付に適用するクラス名を決定
  const dayCellClassNames = (arg: any) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (arg.date >= today) {
        console.log("log");
        return ["future-date"]; // 未来の日付に 'future-date' クラスを適用
    }
    return [];
  }

  // 日付セルがDOMに追加された後の処理
  const dayCellDidMount = (arg: any) => {
    // 必要に応じて追加の処理をここに記述
  }

  return (
    <div className={styles.top}>
      <FullCalendar
        eventTextColor="white"
        locales={allLocales} // today ボタンを日本語にします
        locale="ja" // カレンダーを日本語にします
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={memos}
        displayEventTime={false} // falseのとき時刻を非表示にします
        dateClick={onDateClick} // 日付クリックイベントハンドラを設定
        dayCellClassNames={dayCellClassNames} // 日付セルにクラス名を適用
        dayCellDidMount={dayCellDidMount} // 日付セルのDOM追加後の処理
        datesSet={onDatesSet} // 表示範囲変更コールバック関数
      />
    </div>
  );
}
