// component
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

export const sidebarConfig = [
  {
    title: "Drive",
    icon: getIcon("icon-park-outline:cloud-storage"),
    key: "drive",
    path: "/dashboard/drive",
  },
  {
    title: "Members",
    key: "members",
    icon: getIcon("eva:people-fill"),
    path: "/dashboard/members",
  },
  {
    title: "Emergency Alert",
    key: "alert",
    icon: getIcon("eva:alert-triangle-outline"),
    path: "/dashboard/alert",
  },
  {
    title: "Access Permission",
    key: "alert",
    icon: getIcon("icon-park-outline:permissions"),
    path: "/dashboard/access",
  },

  // {
  //   title: "Analytics",
  //   path: "/dashboard/app",
  //   key: "analytics",
  //   icon: getIcon("eva:pie-chart-2-fill"),
  // },

  // {
  //   title: "login",
  //   path: "/login",
  //   icon: getIcon("eva:lock-fill"),
  // },

  // {
  //   title: "register",
  //   path: "/register",
  //   icon: getIcon("eva:person-add-fill"),
  // },
  // {
  //   title: "Not found",
  //   path: "/404",
  //   icon: getIcon("eva:alert-triangle-fill"),
  // },
];

export const individualSiderbarConfig = [
  {
    title: "Share",
    icon: getIcon("icon-park-outline:share"),
    path: "/dashboard/share",
  },
  {
    title: "Shared with",
    icon: getIcon("icon-park-outline:share"),
    path: "/dashboard/sharedwith",
  },
];
