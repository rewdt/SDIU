import OverviewActive from "../assets/images/overview-active.svg";
import OverviewInactive from "../assets/images/overview-inactive.svg";
import UserActive from "../assets/images/user-active.svg";
import UserInactive from "../assets/images/user-inactive.svg";
import GroupActive from "../assets/images/group-active.svg";
import GroupInactive from "../assets/images/group-inactive.svg";
import SuggestionActive from "../assets/images/suggestions-active.svg";
import SuggestionInactive from "../assets/images/suggestions-inactive.svg";
import BlogInactive from "../assets/images/blog-inactive.svg";
import SettingsInactive from "../assets/images/settings-inactive.svg";

const adminSidebarRoutes = [
  {
    path: "/",
    exact: true,
    pathName: "Overview",
    activeIcon: OverviewActive,
    inactiveIcon: OverviewInactive
  },
  {
    path: "/users",
    exact: true,
    pathName: "Users",
    activeIcon: UserActive,
    inactiveIcon: UserInactive
  },
  {
    path: "/groups",
    exact: true,
    pathName: "Groups",
    activeIcon: GroupActive,
    inactiveIcon: GroupInactive
  },
  {
    path: "/suggestions",
    exact: true,
    pathName: "Suggestions",
    activeIcon: SuggestionActive,
    inactiveIcon: SuggestionInactive
  },
  {
    path: "/blog",
    exact: true,
    pathName: "Blog",
    activeIcon: UserActive,
    inactiveIcon: BlogInactive
  },
  {
    path: "/admin",
    exact: true,
    pathName: "Admin",
    activeIcon: UserActive,
    inactiveIcon: SettingsInactive
  }
];

export default adminSidebarRoutes;
