import { SubMenu } from "./SubMenuModel";

export interface Menu {
  menu_name: string;
  menu_link: string;
  menu_icon: string;
  submenus: SubMenu[];
}
