
export const formatedDate = (date:Date) => {

    var date = new Date(date);
    var formatedDate = date.toLocaleDateString('pt-BR', {timeZone: 'UTC'});

    return formatedDate
};

export const formatedCPF = (cpf:string) =>{
    cpf = cpf.replace(/[^\d]/g, "");
    
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export const formatedNumber = (number:string) => {
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
  