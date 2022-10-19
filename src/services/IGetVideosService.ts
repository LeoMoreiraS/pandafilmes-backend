export interface Movie {
  id: string;
  title: string;
  image: string;
}

export interface IGetVideosService {
  execute(): Movie[];
}
