"use client";

import { useCallback } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';// FullCalendarで月表示を可能にするプラグイン
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";// FullCalendarで日付や時間が選択できるようになるプラグイン
import allLocales from '@fullcalendar/core/locales-all';// 多言語化

import styles from "./calender.module.css";

// パターン１：メモを表示
export function SampleCalender() {
  // メモ
  const memos = [
    {
        title: "TypeScriptを学習した", // メモのタイトル
        date: `2024-01-22`, // メモの日付
        description: "", // 詳細な説明など
        backgroundColor: "green" // このほか "rgba(255,0,0,1.0)" のような文字列での RGBA 表記も可能です
    }
  ];

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
      />
    </div>
  );
}

// パターン２：日付のクリックを検知
export function SampleCalender2() {
  // メモ
  const memos = [
    {
        title: "TypeScriptを学習した", // メモのタイトル
        date: `2024-01-22`, // メモの日付
        description: "", // 詳細な説明など
        backgroundColor: "green" // このほか "rgba(255,0,0,1.0)" のような文字列での RGBA 表記も可能です
    }
  ];

  // 日付がクリックされたときに呼ばれるハンドラ
  const handleDateClick = useCallback((arg: DateClickArg) => {
    // クリックされた日付をコンソールに表示
    // ここで他のアクションを実行する
    alert(arg.dateStr);
  }, []);

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
        dateClick={handleDateClick} // 日付クリックイベントハンドラを設定
      />
    </div>
  );
}

// パターン３：未来の日付のセルの背景色を変更する
// 色の変更はCSSを用います。'future-date' クラスは globals.css に定義されています
export function SampleCalender3() {
  // メモ
  const memos = [
    {
        title: "TypeScriptを学習した", // メモのタイトル
        date: `2024-01-22`, // メモの日付
        description: "", // 詳細な説明など
        backgroundColor: "green" // このほか "rgba(255,0,0,1.0)" のような文字列での RGBA 表記も可能です
    }
  ];

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
        dayCellClassNames={dayCellClassNames} // 日付セルにクラス名を適用
        dayCellDidMount={dayCellDidMount} // 日付セルのDOM追加後の処理
      />
    </div>
  );
}


// パターン４：（パターン２＋パターン３）
export function SampleCalender4() {
  // メモ
  const memos = [
    {
      title: "今日は二時間も勉強した", // メモのタイトル
      date: `2024-01-20`, // メモの日付
      description: "", // 詳細な説明など
      backgroundColor: "green" // このほか "rgba(255,0,0,1.0)" のような文字列での RGBA 表記も可能です
    },
    {
        title: "TypeScriptを学習した", // メモのタイトル
        date: `2024-01-22`, // メモの日付
        description: "", // 詳細な説明など
        backgroundColor: "green" // このほか "rgba(255,0,0,1.0)" のような文字列での RGBA 表記も可能です
    }
  ];

  // 日付がクリックされたときに呼ばれるハンドラ
  const handleDateClick = useCallback((arg: DateClickArg) => {
    // クリックされた日付をコンソールに表示
    // ここで他のアクションを実行する
    alert(arg.dateStr);
  }, []);

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
        dateClick={handleDateClick} // 日付クリックイベントハンドラを設定
        dayCellClassNames={dayCellClassNames} // 日付セルにクラス名を適用
        dayCellDidMount={dayCellDidMount} // 日付セルのDOM追加後の処理
      />
    </div>
  );
}
