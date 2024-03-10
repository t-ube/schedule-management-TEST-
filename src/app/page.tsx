"use client"

import { useState, useEffect, useCallback } from "react";
import Image from 'next/image';
import { DateClickArg } from "@fullcalendar/interaction";
import { RecordBarChart, RecordBarChartProps } from '../components/charts/RecordBarChart';
import { RecordCalendar } from '../components/calender/RecordCalender';
import { Header } from '../components/header/header';
import { RecordDialog } from '../components/dialog/RecordDialog';
import { WeeklySchedule } from '../components/schedule/WeeklySchedule';
import { RecordData, EditingRecordData } from '../types/recordTypes';
import { DaysOfWeekData } from '../types/daysofWeekTypes';
import { ScheduleData, EditingScheduleData } from '../types/scheduleTypes';
import { createEditingSchedules, sortWeeklySchedule } from '../utils/scheduleConverter';


export default function Home() {
  const [userName, setUserName] = useState('ゲスト');
  const [userId, setUserId] = useState('');
  const [records, setRecords] = useState<RecordData[]>([]);
  const [calendarRecords, setCalendarRecords] = useState<RecordData[]>([]);
  const [currentTime, setCurrentTime] = useState('');
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<EditingRecordData>({
    date: new Date(),
    duration: 0,
    note: '',
    created: false
  });
  const [daysOfWeekDataList, setDaysOfWeekDataList] = useState<DaysOfWeekData[]>([]);
  const [scheduleDataList, setScheduleDataList] = useState<ScheduleData[]>([]);
  const [editingScheduleDataList, setEditingScheduleDataList] = useState<EditingScheduleData[]>([]);

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
        console.log('/api/user から受け取った値:', responseData);
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
        console.log('/api/record から受け取った値:', responseData);
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
    fetchDaysOfWeekListData();
    fetchScheduleListData();
  },[])

  useEffect(()=>{
    let newSchedules = createEditingSchedules(
      daysOfWeekDataList,
      scheduleDataList
    );
    console.log("編集用のスケジュール:");
    newSchedules.forEach(schedule => {
      console.log(schedule);
    });
    setEditingScheduleDataList(sortWeeklySchedule(newSchedules));
  },[daysOfWeekDataList, scheduleDataList])

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
        console.log('/api/record から受け取った値:', responseData);
      } else {
        console.error('送信エラー:', response.statusText);
      }
    } catch (error) {
      console.error('通信エラー:', error);
    }
  }, [userId,currentTime]);

  const fetchDaysOfWeekListData = async () => {
    try {
      const response = await fetch('/api/daysofWeek', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const responseData: DaysOfWeekData[] = await response.json();
        setDaysOfWeekDataList(responseData);
        console.log('/api/daysofWeek から受け取った値:', responseData);
      } else {
        console.error('送信エラー:', response.statusText);
      }
    } catch (error) {
      console.error('通信エラー:', error);
    }
  };

  const fetchScheduleListData = async () => {
    try {
      const response = await fetch('/api/schedule', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const responseData: ScheduleData[] = await response.json();
        setScheduleDataList(responseData);
        console.log('/api/schedule から受け取った値:', responseData);
      } else {
        console.error('送信エラー:', response.statusText);
      }
    } catch (error) {
      console.error('通信エラー:', error);
    }
  };

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
        console.log('/api/record から受け取った値:', responseData);
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

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  // 日付がクリックされたときに呼ばれるハンドラ
  const handleDateClick = useCallback(async (arg: DateClickArg) => {
    const clickDate = arg.dateStr;
    const clickDateObject = new Date(clickDate);
    console.log(`カレンダーのクリック日:${clickDate}`);

    // データの再取得
    try {
      const response = await fetch(`/api/record?userId=${userId}&startDate=${clickDateObject.toISOString()}&endDate=${clickDateObject.toISOString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // 編集用の空の実績情報を作る
        let editing: EditingRecordData = {
          date: clickDateObject,
          duration: 0,
          note: '',
          created: false
        };

        // 実績の配列を受け取る
        const responseData: RecordData[] = await response.json();
        console.log('/api/record から受け取った値:', responseData);

        if (responseData.length > 0) {
          //  実績の配列が空でないとき、配列の先頭のアイテムを編集する
          editing.date = new Date(responseData[0].date);
          editing.duration = responseData[0].duration;
          editing.note = responseData[0].note;
          editing.created = true;
        }

        setEditingRecord(editing);
        console.log('編集をする値:', editing);
        
        openDialog();

      } else {
        console.error('送信エラー:', response.statusText);
      }
    } catch (error) {
      console.error('通信エラー:', error);
    }

  }, [userId]);

  // 実績保存時に呼ばれるハンドラ
  const handleRecordSave = useCallback(async (date: Date, duration: number, note: string) => {
    console.log(`date:${date.toISOString()}/duration:${duration}/note:${note}`);
    if (!userId) {
      return;
    }

    // データの保存
    try {
      const response = await fetch(`/api/record`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            "userId": userId,
            "date": date.toISOString(),
            "duration": duration,
            "note": note
          }
        ),
      });

      if (response.ok) {
        const responseData = await response.json();
        setCurrentTime(new Date().toISOString());
        console.log('/api/record で保存成功:', responseData);
      } else {
        console.error('送信エラー:', response.statusText);
      }

    } catch (error) {
      console.error('通信エラー:', error);
    }

  },[userId]);

  // スケジュールの学習時間を変更するハンドラ
  const handleDurationChange = useCallback(async (index: number, newDuration: number) => {
    console.log(`index:${index}/newDuration:${newDuration}`);
    
    // バリデーション：最小値は0、最大値は24
    if (newDuration < 0 || newDuration > 24) {
      console.log("学習時間は0から24時間の間で指定してください。");
      return; // バリデーションに失敗した場合は処理を中止
    }

    if (!userId) {
      return;
    }

    let method: string = 'POST';
    let body: string = '{}';

    console.log(editingScheduleDataList[index]);
    
    if (editingScheduleDataList[index].created === true) {
      // 作成済みのスケジュール
      method = 'PUT';
      body = JSON.stringify(
        {
          "scheduleId": editingScheduleDataList[index].scheduleId,
          "duration": newDuration,
        }
      );
    } else {
      // 未作成のスケジュール
      method = 'POST';
      body = JSON.stringify(
        {
          "userId": userId,
          "dayOfWeekId": editingScheduleDataList[index].dayOfWeekId,
          "duration": newDuration,
        }
      );
    }

    // データの保存
    try {
      const response = await fetch(`/api/schedule`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('/api/schedule で保存成功:', responseData);
        
        await fetchScheduleListData();

      } else {
        console.error('送信エラー:', response.statusText);
      }

    } catch (error) {
      console.error('通信エラー:', error);
    }

  },[userId, editingScheduleDataList]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header/>
      {`こんにちは ${userName} さん`}
      <p>{`今の時刻は${currentTime}`}</p>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%'}}>
        <WeeklySchedule weeklySchedule={editingScheduleDataList} onChange={handleDurationChange} />
      </div>
      <RecordBarChart endDate={currentTime} records={records}/>
      <RecordCalendar onDatesSet={handleDatesSet} onDateClick={handleDateClick} records={calendarRecords}/>
      <RecordDialog record={editingRecord} isOpen={isDialogOpen} onClose={closeDialog} onSave={handleRecordSave}>
      </RecordDialog>
    </main>
  )
}
