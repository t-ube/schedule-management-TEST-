"use client"

import { useState, useEffect, useCallback } from "react";
import Image from 'next/image';
import { RecordBarChart, RecordBarChartProps } from '../components/charts/RecordBarChart';
import { SampleCalender4 } from '../components/calender/SampleCalender';
import { Header } from '../components/header/header';
import { RecordData } from '../types/recordTypes';

export default function Home() {
  const [userName, setUserName] = useState('ゲスト');
  const [userId, setUserId] = useState('');
  const [records, setRecords] = useState<RecordData[]>([]);
  const [currentTime, setCurrentTime] = useState('');

  
  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user?firebaseId=abcd1234', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        setUserName(responseData.name); // レスポンスからname要素を取り出し、設定
        setUserId(responseData.userId); // レスポンスからuserId要素を取り出し、設定
        console.log('受け取った値:', responseData);
      } else {
        console.error('送信エラー:', response.statusText);
      }
    } catch (error) {
      console.error('通信エラー:', error);
    }
  };

  const fetchRecordData = useCallback(async () => {
    const endDateObject = new Date(currentTime);
    const startDateObject = new Date(currentTime);
    startDateObject.setDate(endDateObject.getDate() - 7);

    try {
      const response = await fetch(`/api/record?userId=${userId}&startDate=${startDateObject.toISOString()}&endDate=${endDateObject.toISOString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        setRecords(responseData);
        console.log('受け取った値:', responseData);
      } else {
        console.error('送信エラー:', response.statusText);
      }
    } catch (error) {
      console.error('通信エラー:', error);
    }
  }, [userId,currentTime]);

  useEffect(()=>{
    setCurrentTime(new Date().toISOString());
    fetchUserData();
  },[])

  useEffect(()=>{
    if (userId) { // userIdがセットされている場合のみfetchRecordDataを実行
      fetchRecordData();
    }
  },[userId, fetchRecordData])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header/>
      {`こんにちは ${userName} さん`}
      <p>{`今の時刻は${currentTime}`}</p>
      <RecordBarChart endDate={currentTime} records={records}/>
      <SampleCalender4 />
    </main>
  )
}
