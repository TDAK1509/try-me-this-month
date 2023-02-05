export interface Db {
  add: (sub: string, price: string, link: string) => Promise<void>;
  fetch: () => Promise<SubsData>;
}

export type Price = string;
export type Link = string;

export type DbData = Record<Price, Link[]>;

export type SubName = string;
export type SubsData = Record<SubName, DbData>;
export type SubsDataByPrice = Record<SubName, Link[]>;
