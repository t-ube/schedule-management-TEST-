import { useState, useEffect } from 'react';

// EditingScheduleData型をimport
import { EditingScheduleData } from '../../types/scheduleTypes';
import styles from "./schedule.module.css";

// 日本語の曜日名を定義
const dayOfWeekNamesJP: { [key: string]: string } = {
  "Monday": "月曜日",
  "Tuesday": "火曜日",
  "Wednesday": "水曜日",
  "Thursday": "木曜日",
  "Friday": "金曜日",
  "Saturday": "土曜日",
  "Sunday": "日曜日"
};

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

  // 日本語の曜日名を返す
  function getDaysOfWeekNameJP(name:string):string {
    if (dayOfWeekNamesJP.hasOwnProperty(name)) {
      return dayOfWeekNamesJP[name]; 
    }
    return name;
  }

  return (
    <div className={styles.weeklyScheduleContainer}>
      {editedSchedules.map((schedule, index) => (
        <div key={schedule.dayOfWeekId} className={styles.scheduleItem}>
          <h2>{getDaysOfWeekNameJP(schedule.dayOfWeekName)}</h2>
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
