import dayjs from 'dayjs';
import { DISPLAY_DATE_FORMAT, SERVER_DATE_FORMAT } from '@/constants';

export const getDisplayDate = (date: Date) =>
  dayjs(date).format(DISPLAY_DATE_FORMAT);

export const getServerDateNow = () => dayjs().format(SERVER_DATE_FORMAT);

export const getFromAgoTime = (date: Date) => dayjs(date).fromNow();

export const parseServerDate = (date: Date) =>
  dayjs(date).format(SERVER_DATE_FORMAT);
