import { PlatformType, LefthoekEventType } from "../enums";
import { SlackOAuthData } from "../models";

export interface Event {
  detailType: string;
  detail: any;
}

export type LefthoekEventPayload = SlackOAuthData;

export interface LHEvent extends Event {
  detailType: LefthoekEventType;
  detail: LefthoekEventPayload;
}

export interface TeamAddedEvent extends LHEvent {
  detailType: LefthoekEventType.TEAM_ADDED;
  detail: SlackOAuthData & { platform_type: PlatformType };
}

export type LefthoekEvent = TeamAddedEvent;
