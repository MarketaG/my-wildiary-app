import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);

export const getNowForInput = () => dayjs().format("YYYY-MM-DDTHH:mm");

export async function applyLocale(locale: string) {
  try {
    await import(`dayjs/locale/${locale}.js`);
    dayjs.locale(locale);
  } catch {
    dayjs.locale("en");
  }
}

export { dayjs };
