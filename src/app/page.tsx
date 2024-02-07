"use client"

import { useState, useEffect, useCallback } from "react";
import Image from 'next/image';
import { RecordBarChart, RecordBarChartProps } from '../components/charts/RecordBarChart';
import { RecordCalendar } from '../components/calender/RecordCalender';
import { Header } from '../components/header/header';
import { RecordData } from '../types/recordTypes';

export default function Home() {
  const [userName, setUserName] = useState('ゲスト');
  const [userId, setUserId] = useState('');
  const [records, setRecords] = useState<RecordData[]>([]);
  const [calendarRecords, setCalendarRecords] = useState<RecordData[]>([]);
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

  const fetchCalendarRecordData = useCallback(async () => {
    const endDateObject = new Date(currentTime);
    const startDateObject = new Date(currentTime);
    startDateObject.setDate(endDateObject.getDate() - 30);

    try {
      const response = await fetch(`/api/record?userId=${userId}&startDate=${startDateObject.toISOString()}&endDate=${endDateObject.toISOString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        setCalendarRecords(responseData);
        console.log('受け取った値:', responseData);
      } else {
        console.error('送信エラー:', response.statusText);
      }
    } catch (error) {
      console.error('通信エラー:', error);
    }
  }, [userId,currentTime]);

  // 表示範囲変更コールバック関数
  const handleDatesSet = useCallback(async (arg:any) => {
    const startDate = arg.startStr; // 表示範囲の開始日
    const endDate = arg.endStr;   // 表示範囲の終了日

    const startDateObject = new Date(startDate);
    const endDateObject = new Date(endDate);
  
    console.log(`カレンダー開始日:${startDate}`);
    console.log(`カレンダー最終日:${endDate}`);

    // データの再取得
    try {
      const response = await fetch(`/api/record?userId=${userId}&startDate=${startDateObject.toISOString()}&endDate=${endDateObject.toISOString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        setCalendarRecords(responseData);
        console.log('受け取った値:', responseData);
      } else {
        console.error('送信エラー:', response.statusText);
      }
    } catch (error) {
      console.error('通信エラー:', error);
    }
  }, [userId]);

  useEffect(()=>{
    if (userId) { // userIdがセットされている場合のみfetchRecordDataを実行
      fetchRecordData();
      fetchCalendarRecordData();
    }
  },[userId, fetchRecordData, fetchCalendarRecordData])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header/>
      {`こんにちは ${userName} さん`}
      <p>{`今の時刻は${currentTime}`}</p>
      <RecordBarChart endDate={currentTime} records={records}/>
      <RecordCalendar onDatesSet={handleDatesSet} records={calendarRecords}/>
    </main>
  )
}
