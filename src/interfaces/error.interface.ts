export type TErrors = {
    path: string | number;
    message: string;
  }[];

  export type TGenericErrorResponse = {
    errorSources: TErrors;
    stack: string
  };