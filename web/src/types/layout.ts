import { Component } from 'vue';

export type MenuItem = {
  id: string;
  name: string;
  routeName?: string;
  icon?: Component;
  childRoutes?: string[];
  onClick?: (menuItem: MenuItem) => void;
};
