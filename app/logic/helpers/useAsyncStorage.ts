import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

export const useAsyncStorage = async <T>(key: string): Promise<T | undefined> => {
  const value = await AsyncStorage.getItem(key);
  return await JSON.parse(value ?? '');
};

export const getItem = async <T>(key: string): Promise<T | undefined> => {
  const value = await AsyncStorage.getItem(key);

  if (!value) return;

  return await JSON.parse(value);
};
