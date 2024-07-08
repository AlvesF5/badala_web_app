
export const formatedDate = (date:Date) => {

    var date = new Date(date);
    var formatedDate = date.toLocaleDateString('pt-BR', {timeZone: 'UTC'});

    return formatedDate
};

export const formatedCPF = (cpf:string) =>{
    if(cpf){
      cpf = cpf.replace(/[^\d]/g, "");
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
    return ""
}

export const formatedNumber = (number:string) => {
   if(number){
    var r = number.replace(/\D/g, "");
    r = r.replace(/^0/, "");
    if (r.length > 10) {
      r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 5) {
      r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
      r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else {
      r = r.replace(/^(\d*)/, "($1");
    }
    return r;
   }

   return ""
}

export const selectGender = (value:string) => {
    switch(value) {
        case "MA":
          return "Masculino"
        case "FE":
          return "Feminino"
        case "NB":
          return "Não Binário"
      }
 }


 export const selectUserGreeting = (value:string) => {
  switch(value) {
      case "MA":
        return "Bem-vindo, "
      case "FE":
        return "Bem-vinda, "
      case "NB":
        return "Olá, "
    }
}


 export const selectUserStatus = (value:boolean) => {
  switch(value) {
      case true:
        return "Ativo"
      case false:
        return "Inativo"
    }
}


  