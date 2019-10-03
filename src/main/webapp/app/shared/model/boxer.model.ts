import { Moment } from 'moment';
import { IPicture } from 'app/shared/model/picture.model';

export interface IBoxer {
  id?: number;
  fullName?: string;
  birthDate?: Moment;
  phone?: string;
  picture?: IPicture;
}

export class Boxer implements IBoxer {
  constructor(public id?: number, public fullName?: string, public birthDate?: Moment, public phone?: string, public picture?: IPicture) {}
}
