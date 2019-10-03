export interface IPicture {
  id?: number;
  title?: string;
  imgContentType?: string;
  img?: any;
}

export class Picture implements IPicture {
  constructor(public id?: number, public title?: string, public imgContentType?: string, public img?: any) {}
}
