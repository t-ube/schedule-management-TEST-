"use client";

import { useState, useEffect } from 'react';

// EditingScheduleData型をimport
import { EditingScheduleData } from '../../types/scheduleTypes';
import styles from "./schedule.module.css";

// 一週間分のスケジュールを表示するコンポーネント
export const WeeklySchedule = ({ weeklySchedule }: { weeklySchedule: EditingScheduleData[] }) => {
  const [editedSchedules, setEditedSchedules] = useState(weeklySchedule);

  useEffect(()=>{
    setEditedSchedules(weeklySchedule);
  },[weeklySchedule])

  // スケジュールの学習時間を変更するハンドラー
  const handleDurationChange = (index: number, newDuration: number) => {
    // バリデーション：最小値は0、最大値は24
    if (newDuration < 0 || newDuration > 24) {
      console.log("学習時間は0から24時間の間で指定してください。");
      return; // バリデーションに失敗した場合は処理を中止
    }

    const updatedSchedules = [...editedSchedules];
    updatedSchedules[index].duration = newDuration;
    console.log(`${updatedSchedules[index].dayOfWeekName} :${updatedSchedules[index].duration}時間`);
    setEditedSchedules(updatedSchedules);
  };

  return (
    <div className={styles.weeklyScheduleContainer}>
      {editedSchedules.map((schedule, index) => (
        <div key={schedule.dayOfWeekId} className={styles.scheduleItem}>
          <h2>{schedule.dayOfWeekName}</h2>
          <div className={styles.durationInput}>
            <input 
              type="number" 
              value={schedule.duration ?? ''} 
              onChange={(e) => handleDurationChange(index, parseInt(e.target.value))}
            />
            <span>時間</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeeklySchedule;
