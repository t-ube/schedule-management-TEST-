export type RecordData = {
    recordId: string;
    userId: string;
    date: string;
    duration: number;
    note: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
};

export type EditingRecordData = {
    date: Date;
    duration: number;
    note: string;
    created: boolean;
};
