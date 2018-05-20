/**
 * Classe auxiliar de formatação numérica.
 */
export default class NumeroHelper {

    static formataMoeda(valor) {

    let v = valor;
        v = v.replace(/\D/g, ""); //permite digitar apenas números
        v = v.replace(/[0-9]{12}/, "inválido"); //limita pra máximo 999.999.999,99
        v = v.replace(/(\d{1})(\d{8})$/, "$1.$2"); //coloca ponto antes dos últimos 8 digitos
        v = v.replace(/(\d{1})(\d{5})$/, "$1.$2"); //coloca ponto antes dos últimos 5 digitos
        v = v.replace(/(\d{1})(\d{1,2})$/, "$1,$2"); //coloca virgula antes dos últimos 2 digitos
        return v;
    }

}
