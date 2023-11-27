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

export type Author = BaseEntity & {
  __typename?: 'Author';
  created: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  pseudonym: Scalars['String']['output'];
  updated: Scalars['String']['output'];
};

export type AuthorInput = {
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  pseudonym: Scalars['String']['input'];
};

export type AuthorUpdate = {
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  pseudonym?: InputMaybe<Scalars['String']['input']>;
};

export type BaseEntity = {
  created: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  updated: Scalars['String']['output'];
};

export type Book = BaseEntity & {
  __typename?: 'Book';
  authors: Array<Author>;
  created: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updated: Scalars['String']['output'];
};

export type BookInput = {
  authors: Array<Scalars['ID']['input']>;
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type BookUpdate = {
  authors?: InputMaybe<Array<Scalars['ID']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Library = BaseEntity & {
  __typename?: 'Library';
  address: Scalars['String']['output'];
  books: Array<Book>;
  created: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updated: Scalars['String']['output'];
};

export type LibraryInput = {
  address: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type LibraryUpdate = {
  address?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addBookInLibrary?: Maybe<Scalars['String']['output']>;
  createAuthor: Author;
  createBook: Book;
  createLibrary: Library;
  deleteAuthor: Scalars['String']['output'];
  deleteBook: Scalars['String']['output'];
  deleteLibrary: Scalars['String']['output'];
  sendMessage?: Maybe<Scalars['String']['output']>;
  updateAuthor: Author;
  updateBook: Book;
  updateLibrary: Library;
};


export type MutationAddBookInLibraryArgs = {
  bookId: Scalars['ID']['input'];
  libraryId: Scalars['ID']['input'];
};


export type MutationCreateAuthorArgs = {
  author: AuthorInput;
};


export type MutationCreateBookArgs = {
  book?: InputMaybe<BookInput>;
};


export type MutationCreateLibraryArgs = {
  library?: InputMaybe<LibraryInput>;
};


export type MutationDeleteAuthorArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteBookArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteLibraryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSendMessageArgs = {
  message: Scalars['String']['input'];
};


export type MutationUpdateAuthorArgs = {
  author: AuthorUpdate;
  id: Scalars['ID']['input'];
};


export type MutationUpdateBookArgs = {
  book?: InputMaybe<BookUpdate>;
  id: Scalars['ID']['input'];
};


export type MutationUpdateLibraryArgs = {
  id: Scalars['ID']['input'];
  library?: InputMaybe<LibraryUpdate>;
};

export type Query = {
  __typename?: 'Query';
  findAuthor: Author;
  findAuthors: Array<Maybe<Author>>;
  findBook: Book;
  findBooks: Array<Maybe<Book>>;
  findLibraries: Array<Maybe<Library>>;
  findLibrary: Library;
};


export type QueryFindAuthorArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindBookArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindLibraryArgs = {
  id: Scalars['ID']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  messages?: Maybe<Scalars['String']['output']>;
};
