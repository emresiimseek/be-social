import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export const navigate = (name, params) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};

export const goBack = () => navigationRef.goBack();

export const directNested = (basePage, screen, params) =>
  navigationRef.navigate(basePage, {
    screen: screen,
    params: params,
  });
