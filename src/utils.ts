import moment from "moment";
import {
  FilterBy,
  OrderBy,
  SortBy,
} from "./store/reducers/expanse/expanseSlice";
import { Category } from "./types/category";
import { Expanse } from "./types/expanse";

export const sortAndFilterExpansesList = ({
  expanses,
  sortBy,
  orderBy,
  filterBy,
  categories,
}: {
  expanses: Expanse[];
  sortBy: SortBy;
  filterBy: FilterBy;
  orderBy: OrderBy;
  categories: Category[];
}): Expanse[] => {
  let list: Expanse[] = [...expanses];

  switch (filterBy) {
    case "today":
      list = list.filter((item) =>
        moment(item.createdAt).isSame(moment(), "day")
      );
      break;
    case "week":
      list = list.filter((item) =>
        moment(item.createdAt).isSame(moment(), "week")
      );
      break;
    case "month":
      list = list.filter((item) =>
        moment(item.createdAt).isSame(moment(), "month")
      );
      break;
    case "year":
      list = list.filter((item) =>
        moment(item.createdAt).isSame(moment(), "year")
      );
      break;
    default:
      break;
  }
  switch (sortBy) {
    case "createdAt":
      list = list.sort((i1, i2) => {
        if (orderBy === "asc") {
          if (moment(i2.createdAt).isBefore(moment(i1.createdAt))) {
            return 1;
          } else if (moment(i1.createdAt).isBefore(moment(i2.createdAt))) {
            return -1;
          }
        } else {
          if (moment(i2.createdAt).isBefore(moment(i1.createdAt))) {
            return -1;
          } else if (moment(i1.createdAt).isBefore(moment(i2.createdAt))) {
            return 1;
          }
        }
        return 0;
      });
      break;

    case "updatedAt":
      list = list.sort((i1, i2) => {
        if (orderBy === "asc") {
          if (moment(i2.updatedAt).isBefore(moment(i1.updatedAt))) {
            return 1;
          } else if (moment(i1.updatedAt).isBefore(moment(i2.updatedAt))) {
            return -1;
          }
        } else {
          if (moment(i2.updatedAt).isBefore(moment(i1.updatedAt))) {
            return -1;
          } else if (moment(i1.updatedAt).isBefore(moment(i2.updatedAt))) {
            return 1;
          }
        }
        return 0;
      });
      break;

    case "title":
      list = list.sort((i1, i2) => {
        if (orderBy === "desc") {
          if (i1.title.toLocaleLowerCase() > i2.title.toLocaleLowerCase()) {
            return -1;
          } else if (
            i1.title.toLocaleLowerCase() < i2.title.toLocaleLowerCase()
          ) {
            return 1;
          }
        } else {
          if (i1.title.toLocaleLowerCase() > i2.title.toLocaleLowerCase()) {
            return 1;
          } else if (
            i1.title.toLocaleLowerCase() < i2.title.toLocaleLowerCase()
          ) {
            return -1;
          }
        }
        return 0;
      });
      break;

    case "category":
      list = list.sort((i1, i2) => {
        const c1 = categories.find((item) => item.id === i1.category);
        const c2 = categories.find((item) => item.id === i2.category);
        if (orderBy === "asc") {
          if (!c1) return 1;
          if (!c2) return -1;

          if (c1.name > c2.name) {
            return 1;
          } else if (c1.name < c2.name) {
            return -1;
          }
        } else {
          if (!c1) return -1;
          if (!c2) return 1;

          if (c1.name > c2.name) {
            return -1;
          } else if (c1.name < c2.name) {
            return 1;
          }
        }
        return 0;
      });
    default:
      break;
  }

  return list;
};
