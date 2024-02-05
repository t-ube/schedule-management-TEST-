"use client";

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


// グラフパターン１：実績だけを表示するグラフ
export function SampleBarChart() {
  // オプション（設定）
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'グラフパターン１：実績グラフ',
      },
    },
  }

  // ラベル
  //const labels_en = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const labels_jp = ['日','月', '火', '水', '木', '金', '土'];

  const data = {
    labels: labels_jp,
    datasets: [
      {
        label: '実績',
        data: [3,0,3,4,3,4,3],
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

// グラフパターン２：予定と実績を並べるグラフ
export function SampleBarChart2() {
  // オプション（設定）
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'グラフパターン２：予定/実績グラフ',
      },
    },
  }

  // ラベル
  const labels_jp = ['日','月', '火', '水', '木', '金', '土'];

  const data = {
    labels: labels_jp,
    datasets: [
      {
        label: '予定',
        data: [1,2,3,4,1,2,3],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: '実績',
        data: [3,0,3,4,3,4,3],
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

// グラフパターン３：予定と実績の差分を表示するグラフ
export function SampleBarChart3() {
  // オプション（設定）
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'グラフパターン３：実績差グラフ',
      },
    },
  }

  // ラベル
  const labels_jp = ['日','月', '火', '水', '木', '金', '土'];

  const data = {
    labels: labels_jp,
    datasets: [
      {
        label: '実績差',
        data: [2,-2,0,0,2,2,0],
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

// グラフパターン４：引数として予定と実績の配列を渡すグラフ
export type BarChart4Props = {
  plan: Number[],
  result: Number[],
};

export function SampleBarChart4({ plan, result } : BarChart4Props) {
  // オプション（設定）
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'グラフパターン４：(引数付き)予定/実績グラフ',
      },
    },
  }

  // ラベル
  const labels_jp = ['日','月', '火', '水', '木', '金', '土'];

  const data = {
    labels: labels_jp,
    datasets: [
      {
        label: '予定',
        data: plan,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: '実績',
        data: result,
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
