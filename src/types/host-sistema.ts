export interface HostSistema {
  id: number;
  hostname: string | null;
  username: string | null;
  port: string | null;
  usernameDB: string | null;
}

export interface CreateHostSistemaDTO {
  hostname?: string;
  username?: string;
  password?: string;
  port?: string;
  usernameDB?: string;
  passDB?: string;
}

export interface UpdateHostSistemaDTO {
  hostname?: string;
  username?: string;
  password?: string;
  port?: string;
  usernameDB?: string;
  passDB?: string;
}