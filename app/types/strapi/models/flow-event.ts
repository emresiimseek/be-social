import { Items, Data } from '../base/base';
import { Event } from './event';

export interface FlowEventData {
  getEventsByUserId: Items<Event>;
}
