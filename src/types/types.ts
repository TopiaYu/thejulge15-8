export interface Shop {
  item: {
    id: string;
    name: string;
    category: string;
    address1: string;
    address2: string;
    description: string;
    imageUrl: string;
    originalHourlyPay: number;
  };
  href: string;
}

export interface Notice {
  item: {
    id: string;
    hourlyPay: number;
    description: string;
    startsAt: string;
    workhour: number;
    closed: boolean;
  };
  href: string;
}

export interface UserItem {
  id: string;
  email: string;
  type: 'employer' | 'employee';
  name?: string;
  phone?: string;
  address: string;
  bio?: string;
}

export interface LoginResponse {
  item: {
    token: string;
    user: {
      item: UserItem;
      href: string;
    };
  };
  links: [];
}

export interface AlarmItem {
  id: string;
  createdAt: string;
  result: string;
  read: boolean;
  shop: Shop;
  notice: Notice;
  application: {
    item: {
      id: string;
      status: string;
    };
    href: string;
  };
}

export interface AlarmList {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: AlarmItem[];
}
