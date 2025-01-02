/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Home from './components/home';
import DarkThemeCalendar from './components/test';

// AppRegistry.registerComponent(appName, () => DarkThemeCalendar);
AppRegistry.registerComponent(appName, () => Home);
