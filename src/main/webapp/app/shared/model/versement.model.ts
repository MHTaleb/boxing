import { Moment } from 'moment';
import { IBoxer } from 'app/shared/model/boxer.model';

export interface IVersement {
  id?: number;
  montant?: number;
  date?: Moment;
  boxer?: IBoxer;
}

export class Versement implements IVersement {
  constructor(public id?: number, public montant?: number, public date?: Moment, public boxer?: IBoxer) {}
}
