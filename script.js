function detectarBase(numero) {
  if (/^[01]+$/.test(numero)) return 2;       // Binário
  if (/^[0-7]+$/.test(numero)) return 8;      // Octal
  if (/^[0-9]+$/.test(numero)) return 10;     // Decimal
  if (/^[0-9A-Fa-f]+$/.test(numero)) return 16; // Hexadecimal
  return null;
}

function mostrarDivisoes(decimal, base) {
  let n = decimal;
  let passos = "";
  while (n > 0) {
    let quociente = Math.floor(n / base);
    let resto = n % base;
    passos += `${n} ÷ ${base} = ${quociente}, resto ${resto}\n`;
    n = quociente;
  }
  return passos;
}

function mostrarDecimal(numero, base) {
  let passos = "";
  let chars = numero.toUpperCase().split("").reverse();
  let soma = 0;
  for (let i = 0; i < chars.length; i++) {
    let valor = parseInt(chars[i], base);
    passos += `${chars[i]} × ${base}^${i} = ${valor * Math.pow(base, i)}\n`;
    soma += valor * Math.pow(base, i);
  }
  passos += `Soma = ${soma}`;
  return passos;
}

function converter() {
  const numero = document.getElementById("numero").value.trim();
  const base = detectarBase(numero);
  
  if (!base) {
    alert("Número inválido! Digite apenas dígitos válidos para uma base.");
    return;
  }
  
  const decimal = parseInt(numero, base);
  
  document.getElementById("binario").textContent = decimal.toString(2);
  document.getElementById("decimal").textContent = decimal.toString(10);
  document.getElementById("octal").textContent = decimal.toString(8);
  document.getElementById("hexadecimal").textContent = decimal.toString(16).toUpperCase();
  
  document.getElementById("expDecimal").textContent = 
    "Conversão para decimal (soma das potências):\n" + mostrarDecimal(numero, base);
  document.getElementById("expBinario").textContent = 
    "Conversão para binário (divisões sucessivas por 2):\n" + mostrarDivisoes(decimal, 2);
  document.getElementById("expOctal").textContent = 
    "Conversão para octal (divisões sucessivas por 8):\n" + mostrarDivisoes(decimal, 8);
  document.getElementById("expHexadecimal").textContent = 
    "Conversão para hexadecimal (divisões sucessivas por 16):\n" + mostrarDivisoes(decimal, 16);
}

function limpar() {
  document.getElementById("numero").value = "";
  ["binario","decimal","octal","hexadecimal",
   "expBinario","expDecimal","expOctal","expHexadecimal"].forEach(id => {
    document.getElementById(id).textContent = "";
  });
}
