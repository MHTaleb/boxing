import { Moment } from 'moment';
import { IPicture } from 'app/shared/model/picture.model';

export interface ITrainer {
  id?: number;
  fullName?: string;
  birthDate?: Moment;
  phone?: string;
  picture?: IPicture;
}

export class Trainer implements ITrainer {
  constructor(public id?: number, public fullName?: string, public birthDate?: Moment, public phone?: string, public picture?: IPicture) {}
}
