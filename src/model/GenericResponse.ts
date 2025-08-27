interface GenericResponse<R, T> {
  data?: T[];
  status?: number;
  success: boolean;
  message?: string;
  errors?: Partial<R>;  
}

export { GenericResponse}