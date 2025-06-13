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
