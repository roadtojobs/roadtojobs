import { Component } from 'vue';

export type MenuItem = {
  id: string;
  name: string;
  routeName?: string;
  icon?: Component;
  onClick?: (menuItem: MenuItem) => void;
};
