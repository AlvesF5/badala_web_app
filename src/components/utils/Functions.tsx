import { parse, format, isValid as isValidDate } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { toDate, formatInTimeZone } from "date-fns-tz";

export const convertDate = (dateString: string): string => {
    console.log("Data que está sendo passada: " + dateString);
  
    // Parse the date string using the format and locale
    const parsedDate = parse(
      dateString,
      "d 'de' MMMM 'de' yyyy 'às' HH:mm:ss 'UTC'XXX",
      new Date(),
      { locale: ptBR }
    );
  
    // Convert the parsed date to the desired time zone
    const zonedDate = toDate(parsedDate, { timeZone: "America/Sao_Paulo" });
  
    // Check if the parsed date is valid
    if (isNaN(zonedDate.getTime())) {
      throw new RangeError("Invalid time value");
    }
  
    // Format the parsed date to the desired format using formatInTimeZone
    return formatInTimeZone(zonedDate, "America/Sao_Paulo", "yyyy-MM-dd");
  };