"use client";
import { RecordData } from '../../types/recordTypes';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styles from "./chart.module.css";
import {} from "./chart.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export type RecordBarChartProps = {
  endDate: string,
  records: RecordData[] | [],
};

// 実績チャートに使用する型
type ChartRecord = {
  date: string,
  duration: number,
}

// 実績を表示するグラフ
export function RecordBarChart({ endDate, records } : RecordBarChartProps) {

  // endDateから1週間前の日付を計算
  const endDateObject = new Date(endDate);
  const startDateObject = new Date(endDateObject);
  startDateObject.setDate(endDateObject.getDate() - 7);

  // 1週間分のチャートデータ用の配列を生成
  const initialData:ChartRecord[] = [];
  for (let day = new Date(startDateObject); day <= endDateObject; day.setDate(day.getDate() + 1)) {
    initialData.push({
      date: `${day.getMonth() + 1}/${day.getDate()}`, // 日付
      duration: 0, // 実績は0で初期化
    });
  }

  // APIで取得した値（records）からデータを順番に取り出して、チャート用データ配列の同じ日付のデータに実績を加算する
  records.forEach(record => {
    const recordDate = new Date(record.date);
    
    // 日付の文字列を作成
    const formattedDate = `${recordDate.getMonth() + 1}/${recordDate.getDate()}`;
    
    // 同じ日付のデータを探す
    const dataIndex = initialData.findIndex(data => data.date === formattedDate);

    if (dataIndex !== -1) {
      // 同じ日付を見つけた（配列番号を取得できた）
      initialData[dataIndex].duration += record.duration;
    }
  });
  
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '実績グラフ',
      },
    },
  }

  const data = {
    labels: initialData.map(data => data.date),
    datasets: [
      {
        label: '実績',
        data: initialData.map(data => data.duration),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <>
      <div className={styles.piechart}>
        <Bar
          data={data}
          options={options}
        />
      </div>
    </>
  );
}
