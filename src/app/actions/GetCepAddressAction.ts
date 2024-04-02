export async function getCepAddress(cep: any) {
    try {
        console.log(cep)
        const resp = await fetch('https://viacep.com.br/ws/' + cep + '/json', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
              },
        });

        const address = await resp.json();

        return address

    } catch (e: any) {
        console.log(e)
        return { message: 'Falha ao realizar login!' }
    }
}