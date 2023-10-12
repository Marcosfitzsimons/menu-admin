export interface AxiosError {
    response?: {
      status?: number;
      data?: {
        msg?: string;
      };
    };
  }