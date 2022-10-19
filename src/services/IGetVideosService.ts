export interface Movie {
  id: string;
  title: string;
}

export interface IGetVideosService {
  execute(): Movie[];
}
