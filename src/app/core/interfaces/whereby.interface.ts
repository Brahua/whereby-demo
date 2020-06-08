export interface IResponseWhereby {
  startDate?: string;
  endDate?: string;
  roomUrl?: string;
  meetingId?: string;
  hostRoomUrl?: string;
}

export interface IMeeting {
  roomNamePrefix?: string;
  roomMode?: string;
  startDate?: string;
  endDate?: string;
  fields?: string[];
}

export interface Meeting {
  meetingId?: string;
  roomNamePrefix?: string;
  roomMode?: string;
  startDate?: string;
  endDate?: string;
  roomUrl?: string;
  hostRoomUrl?: string;
}
