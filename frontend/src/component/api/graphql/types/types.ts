export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type BaseEntity = {
  created: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  updated: Scalars['String']['output'];
};

export type Category = BaseEntity & {
  __typename?: 'Category';
  created: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updated: Scalars['String']['output'];
};

export type Item = BaseEntity & {
  __typename?: 'Item';
  categories: Array<Category>;
  created: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  updated: Scalars['String']['output'];
};

export type ItemInput = {
  categories: Array<Scalars['ID']['input']>;
  description: Scalars['String']['input'];
  image: Scalars['String']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
};

export type ItemUpdate = {
  categories?: InputMaybe<Array<Scalars['ID']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
};

export type Message = BaseEntity & {
  __typename?: 'Message';
  created: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  text: Scalars['String']['output'];
  updated: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: Category;
  createItem: Item;
  sendMessage: Scalars['String']['output'];
  updateCategory: Category;
  updateItem: Item;
};


export type MutationCreateCategoryArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateItemArgs = {
  item?: InputMaybe<ItemInput>;
};


export type MutationSendMessageArgs = {
  message: Scalars['String']['input'];
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdateItemArgs = {
  id: Scalars['ID']['input'];
  item?: InputMaybe<ItemUpdate>;
};

export type Query = {
  __typename?: 'Query';
  findAllCategories: Array<Category>;
  findAllItems: Array<Item>;
  findAllMessages: Array<Message>;
};

export type Subscription = {
  __typename?: 'Subscription';
  messages?: Maybe<Scalars['String']['output']>;
};
