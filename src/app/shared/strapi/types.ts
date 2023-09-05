/** default strapi pagination data */
export interface StrapiPaginationData {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

/** default strapi error data */
export interface StrapiError {
  status: number;
  name: string;
  message: string;
  details: any;
}

/** default properties added by strapi */
export interface DefaultStrapiAttributes {
  createdAt: Date;
  updatedAt: Date;
}
/** extend a type definition with default attributes provided by strapi */
export type StrapiAttributes<T> = T & DefaultStrapiAttributes;
/** structure of a entry in the strapi-response */
export interface StrapiEntry<T> {
  id: number;
  attributes: StrapiAttributes<T>;
}

/** raw response received from strapi when requesting operations wiht many items in the response */
export interface StrapiResponseMany<T> {
  data: StrapiEntry<T>[];
  meta: {
    pagination: StrapiPaginationData;
  };
}

/** raw reponse received from strapi when executing single target querys */
export interface StrapiResponseSingle<T> {
  data: StrapiEntry<T>;
  meta: {};
}

/** raw response when a error happend */
export interface StrapiErrorResponse {
  data: {};
  error: StrapiError;
}

export interface StrapiPutRequest<T> {
  data: T;
}
