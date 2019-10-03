import { Moment } from 'moment';
import { ITrainer } from 'app/shared/model/trainer.model';
import { IBoxer } from 'app/shared/model/boxer.model';

export interface ILesson {
  id?: number;
  detail?: string;
  date?: Moment;
  hour?: Moment;
  trainer?: ITrainer;
  boxers?: IBoxer[];
}

export class Lesson implements ILesson {
  constructor(
    public id?: number,
    public detail?: string,
    public date?: Moment,
    public hour?: Moment,
    public trainer?: ITrainer,
    public boxers?: IBoxer[]
  ) {}
}
