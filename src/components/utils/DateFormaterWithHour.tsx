import React from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import { mask } from "remask";

const DateFormatterWithHour = ({ timestamp }:{timestamp: any}) => {
  // Define a localidade para português do Brasil
  moment.locale('pt-br');

  // Converte a string timestamp para um objeto Date e formata a data no formato desejado
  const formattedDate = moment(timestamp, "DD [de] MMMM [de] YYYY [às] HH:mm:ss [UTC]Z").format("DD [de] MMMM [de] YYYY [às] HH:mm");

  return (
    <div>
      {formattedDate}
    </div>
  );
};

export default DateFormatterWithHour;