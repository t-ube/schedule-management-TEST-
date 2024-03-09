import { ScheduleData, EditingScheduleData } from '../types/scheduleTypes';
import { DaysOfWeekData } from '../types/daysofWeekTypes';


// 編集用スケジュールデータを生成します //
export function createEditingSchedules (dows: DaysOfWeekData[], schedules: ScheduleData[])
    : EditingScheduleData[] {
    const editingSchedules: EditingScheduleData[] = [];

    // 曜日データを一つずつ取り出します //
    for (const dayOfWeek of dows) {

        // 編集用データを初期化します //
        const editingSchedule: EditingScheduleData = {
            dayOfWeekId: dayOfWeek.dayOfWeekId,
            dayOfWeekName: dayOfWeek.name,
            scheduleId: null,
            duration: null,
            created: false
        };

        // 既存のスケジュールの配列から、曜日データと同じ曜日の識別子を持つものを見つけます //
        const schedule = schedules.find(schedule => schedule.dayOfWeekId === dayOfWeek.dayOfWeekId);

        if (schedule) {
            // スケジュールが見つかった //

            // 編集用スケジュールにスケジュールの識別子や学習時間を格納します //
            editingSchedule.scheduleId = schedule.scheduleId;
            editingSchedule.duration = schedule.duration;

            // すでに登録済みのスケジュールなので true にします //
            editingSchedule.created = true;
        }

        // 配列に追加します //
        editingSchedules.push(editingSchedule);
    }

    // 配列を返します //
    return editingSchedules;
}
