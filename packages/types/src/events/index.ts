import { LefthoekEventType } from "../enums";
import { Team } from "../models";

export interface Event<T extends string, U> {
  detailType: T;
  detail: U;
}

export type LefthoekEventPayload = Team;

export type LHEvent = Event<LefthoekEventType, LefthoekEventPayload>;

export interface TeamAuthenticatedEvent extends LHEvent {
  detailType: LefthoekEventType.TEAM_AUTHENTICATED;
  detail: Team;
}
export interface TeamAddedEvent extends LHEvent {
  detailType: LefthoekEventType.TEAM_ADDED;
  detail: Team;
}

export type LefthoekEvent = TeamAddedEvent;
