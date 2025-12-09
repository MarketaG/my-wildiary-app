import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);

export function applyLocale(locale: string) {
  try {
    require(`dayjs/locale/${locale}.js`);
    dayjs.locale(locale);
  } catch {
    dayjs.locale("en");
  }
}

export { dayjs };
