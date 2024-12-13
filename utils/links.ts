type NavLink = {
  href: string;
  label: string;
};

export const links: NavLink[] = [
    { href: '/checkin', label: 'checkin' },
    { href: '/analytics', label: 'analytics' },
    { href: '/tips', label: 'tips' },
];
export const UserInfoLinks: NavLink[] = [
    { href: '/setting', label: 'setting' },
    { href: '/about', label: 'about' },
];