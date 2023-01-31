export interface Db {
  add: (sub: string, price: string, link: string) => Promise<void>;
}

type Price = string;
type Link = string;

export type DbData = Record<Price, Link[]>;
