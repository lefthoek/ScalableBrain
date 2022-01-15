import { LefthoekEventType } from "../enums";
import { AuthLookupData, Team } from "../models";

export interface Event<T extends string, U> {
  detailType: T;
  detail: U;
}

export type GenericEvent = Event<string, unknown>;

export type LefthoekEventPayload = Team | AuthLookupData;

export type LHEvent = Event<LefthoekEventType, LefthoekEventPayload>;

export interface TeamAuthenticatedEvent extends LHEvent {
  detailType: LefthoekEventType.TEAM_AUTHENTICATED;
  detail: AuthLookupData;
}
export interface TeamAddedEvent extends LHEvent {
  detailType: LefthoekEventType.TEAM_ADDED;
  detail: Team;
}

export type LefthoekEvent = TeamAddedEvent;
