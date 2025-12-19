import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

import "dayjs/locale/cs";
import "dayjs/locale/en";

dayjs.extend(localizedFormat);

export function formatDate(date: string | Date, locale: string) {
  return dayjs(date).locale(locale).format("LL");
}

export function getNowForInput() {
  return dayjs().format("YYYY-MM-DDTHH:mm");
}

export { dayjs };
