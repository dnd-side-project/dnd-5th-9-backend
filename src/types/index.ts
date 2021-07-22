export interface User {
    id?: number;
    mettingId?: number;
    userId?: number;
    name?: string;
    password?: string;
    auth?: boolean;
    lat?: number;
    lng?: number;
}

export interface Station {
    id?: number;
    name?: string;
    line?: string;
    lat?: number;
    lng?: number;
}

export interface Meeting {
    id?: number;
    title?: string;
    param?: string;
    description?: string;
    placeYn?: boolean;
}

export interface MeetingSchedule {
    id?: number;
    meetingId?: number;
    startDate?: Date;
    endDate?: Date;
}

export interface MeetingMember {
    id?: number;
    meetingId?: number;
    userId?: number;
    name?: string;
    password?: string;
    auth?: boolean;
    lat?: number;
    lng?: number;
}

export interface MeetingMemberSchedule {
    id?: number;
    meetingMemberId?: number;
    startDate?: Date;
    endDate?: Date;
}
