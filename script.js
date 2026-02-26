// Detecta a base do número digitado
function detectarBase(numero) {
  if (/^[01]+(\.[01]+)?$/.test(numero)) return 2;       // Binário
  if (/^[0-7]+(\.[0-7]+)?$/.test(numero)) return 8;      // Octal
  if (/^[0-9]+(\.[0-9]+)?$/.test(numero)) return 10;     // Decimal
  if (/^[0-9A-Fa-f]+(\.[0-9A-Fa-f]+)?$/.test(numero)) return 16; // Hexadecimal
  return null;
}

// Método da tabelinha para converter qualquer base → decimal
function mostrarDecimal(numero, base) {
  let [parteInteira, parteFracionaria] = numero.toUpperCase().split(".");
  let passos = "";
  let soma = 0;

  // Parte inteira
  let charsInt = parteInteira.split("").reverse();
  for (let i = 0; i < charsInt.length; i++) {
    let valor = parseInt(charsInt[i], base);
    passos += `${charsInt[i]} (${valor}) × ${base}^${i} = ${valor * Math.pow(base, i)}\n`;
    soma += valor * Math.pow(base, i);
  }

  // Parte fracionária
  if (parteFracionaria) {
    let charsFrac = parteFracionaria.split("");
    for (let i = 0; i < charsFrac.length; i++) {
      let valor = parseInt(charsFrac[i], base);
      passos += `${charsFrac[i]} (${valor}) × ${base}^-${i+1} = ${valor * Math.pow(base, -(i+1))}\n`;
      soma += valor * Math.pow(base, -(i+1));
    }
  }

  passos += `\nSoma final = ${soma}`;
  return passos;
}

// Divisões sucessivas para parte inteira
function mostrarDivisoes(decimal, base) {
  let n = Math.floor(decimal);
  let passos = "";
  while (n > 0) {
    let quociente = Math.floor(n / base);
    let resto = n % base;
    passos += `${n} ÷ ${base} = ${quociente}, resto ${resto}\n`;
    n = quociente;
  }
  return passos || "Não há parte inteira para dividir.";
}

// Multiplicações sucessivas para parte fracionária (decimal → binário)
function mostrarMultiplicacoes(fracao) {
  let passos = "";
  let limite = 10; // número máximo de casas
  let f = fracao;
  for (let i = 0; i < limite && f > 0; i++) {
    f *= 2;
    let inteiro = Math.floor(f);
    passos += `Passo ${i+1}: ×2 = ${f}, inteiro = ${inteiro}\n`;
    f -= inteiro;
  }
  return passos || "Não há parte fracionária.";
}

// Função principal
function converter() {
  const numero = document.getElementById("numero").value.trim();
  const base = detectarBase(numero);
  const opcao = document.getElementById("opcao").value;
  const basePers = parseInt(document.getElementById("basePersonalizada").value);

  if (!base) {
    alert("Número inválido! Digite apenas dígitos válidos para uma base.");
    return;
  }

  const decimal = parseFloat(parseInt(numero.replace(".",""), base) / Math.pow(base, (numero.split(".")[1] || "").length));

  // Resultados
  document.getElementById("binario").textContent = decimal.toString(2);
  document.getElementById("decimal").textContent = decimal.toString(10);
  document.getElementById("octal").textContent = decimal.toString(8);
  document.getElementById("hexadecimal").textContent = decimal.toString(16).toUpperCase();

  // Explicações
  document.getElementById("expDecimal").textContent = "Método da tabelinha:\n" + mostrarDecimal(numero, base);
  document.getElementById("expBinario").textContent = "Divisões sucessivas por 2:\n" + mostrarDivisoes(decimal, 2);

  // Se for decimal → binário com fração, mostra multiplicações sucessivas
  if (base === 10 && numero.includes(".")) {
    let fracao = decimal - Math.floor(decimal);
    document.getElementById("expBinario").textContent += "\nMultiplicações sucessivas (fração):\n" + mostrarMultiplicacoes(fracao);
  }

  document.getElementById("expOctal").textContent = "Divisões sucessivas por 8:\n" + mostrarDivisoes(decimal, 8);
  document.getElementById("expHexadecimal").textContent = "Divisões sucessivas por 16:\n" + mostrarDivisoes(decimal, 16);

  // Base personalizada
  if (opcao === "personalizada" && basePers >= 2 && basePers <= 36) {
    document.getElementById("personalizada").textContent = decimal.toString(basePers).toUpperCase();
    document.getElementById("expPersonalizada").textContent = `Conversão para base ${basePers}: ${decimal.toString(basePers).toUpperCase()}`;
  }

  // Controle de visibilidade
  ["cardBinario","cardDecimal","cardOctal","cardHexadecimal","cardPersonalizada"].forEach(id => {
    document.getElementById(id).style.display = "none";
  });

  if (opcao === "todas") {
    ["cardBinario","cardDecimal","cardOctal","cardHexadecimal"].forEach(id => {
      document.getElementById(id).style.display = "block";
    });
  } else if (opcao === "personalizada") {
    document.getElementById("cardPersonalizada").style.display = "block";
  } else {
    document.getElementById("card" + opcao.charAt(0).toUpperCase() + opcao.slice(1)).style.display = "block";
  }
}

// Limpar
function limpar() {
  document.getElementById("numero").value = "";
  ["binario","decimal","octal","hexadecimal","personalizada",
   "expBinario","expDecimal","expOctal","expHexadecimal","expPersonalizada"].forEach(id => {
    document.getElementById(id).textContent = "";
  });
  ["cardBinario","cardDecimal","cardOctal","cardHexadecimal","cardPersonalizada"].forEach(id => {
    document.getElementById(id).style.display = "none";
  });
}
