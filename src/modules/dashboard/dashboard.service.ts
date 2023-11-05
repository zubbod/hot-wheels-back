import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BehaviorSubject } from 'rxjs';
import { USER } from 'src/core/token/user.token';
import { getUserId } from 'src/core/utils/user';
import { CarModel } from 'src/models/car.model';
import { FileModel } from 'src/models/file.model';
import { UserModel } from 'src/models/user.model';

@Injectable({ scope: Scope.REQUEST })
export class DashboardService {
  constructor(
    @InjectModel(CarModel) private carModel: typeof CarModel,
    @Inject(USER) private user: BehaviorSubject<UserModel>,
  ) {}

  async getDoubles() {
    let rows = await this.carModel.findAll({
      where: { userId: getUserId(this.user) },
      include: [FileModel],
    });
    const result: CarModel[][] = [];

    while (!!rows.length) {
      const item = rows.pop();

      if (item) {
        const doubles: CarModel[] = [item];

        for (let index = 0; index < rows.length; index++) {
          if (rows[index].model === item.model) {
            doubles.push(rows[index]);
          }
        }

        if (doubles.length > 1) {
          result.push(doubles);
          rows = rows.filter((el) => el.model !== item.model);
        }
      }
    }

    const data = result.reduce((a, c) => {
      a.push({ car: c[0], count: c.length });
      return a;
    }, [] as any);

    return data;
  }
}
