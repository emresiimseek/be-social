import * as React from 'react';
import EventList from '../../components/common/EventList';
import { Props } from '../../types/common/props';

export default function HomePage(props: Props) {
  return <EventList navigation={props.navigation} isMine />;
}
