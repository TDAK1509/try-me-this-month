export interface Db {
  add: (sub: SubName, price: Price, link: Link) => Promise<void>;
  fetch: () => Promise<SubsData>;
  remove: (subName: SubName, price: Price, link: Link) => Promise<void>;
}

export type Price = string;
export type Link = string;

export type DbData = Record<Price, Link[]>;

export type SubName = string;
export type SubsData = Record<SubName, DbData>;
export type SubsDataByPrice = Record<SubName, Link[]>;
