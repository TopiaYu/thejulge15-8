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
  address?: string;
  bio?: string;
  shop?: Shop | null;
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

export interface ApplyItem {
  id: number;
  title: string;
  status: string;
  date: string;
  hourlyPay: string;
}

export interface RawApplication {
  item: {
    id: string;
    status: 'pending' | 'accepted' | 'rejected' | 'canceled';
    createdAt: string;
    shop: {
      item: ShopItem;
      href: string;
    };
    notice: {
      item: NoticeItem;
      href: string;
    };
  };
}

export interface ApplicationsResponse {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: RawApplication[];
}

export interface ShopItem {
  id: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}

export interface NoticeItem {
  id: string;
  hourlyPay: number;
  description: string;
  startsAt: string;
  workhour: number;
  closed: boolean;
}

export interface ApplyItem {
  noticeId: string;
  applicationId: string;
}

export interface CancelItem {
  user: string;
  apply: ApplyItem[];
}

export interface CancelData {
  [key: string]: CancelItem;
}
