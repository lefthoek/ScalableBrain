import { LefthoekEventType } from "../enums";
import { Team } from "../models";

export interface Event {
  detailType: string;
  detail: any;
}

export type LefthoekEventPayload = Team;

export interface LHEvent extends Event {
  detailType: LefthoekEventType;
  detail: LefthoekEventPayload;
}

export interface TeamAddedEvent extends LHEvent {
  detailType: LefthoekEventType.TEAM_ADDED;
  detail: Team;
}

export type LefthoekEvent = TeamAddedEvent;
