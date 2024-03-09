export type ScheduleData = {
    scheduleId: string;
    userId: string;
    dayOfWeekId: string;
    duration: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
};

export type EditingScheduleData = {
    dayOfWeekId: string;
    dayOfWeekName: string;
    scheduleId: string | null;
    duration: number | null;
    created: boolean;
};
