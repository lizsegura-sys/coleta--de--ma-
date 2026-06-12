function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}let jogador;
let alimentos = [];
let pontos = 0;

function setup() {
  createCanvas(800, 600);

  jogador = {
    x: width / 2,
    y: height - 70,
    largura: 80,
    altura: 80
  };
}

function draw() {
  background(135, 206, 235); // céu

  desenharCenario();

  // Jogador
  fill(0, 100, 255);
  rect(jogador.x, jogador.y, jogador.largura, jogador.altura, 10);

  // Movimento
  if (keyIsDown(LEFT_ARROW)) {
    jogador.x -= 7;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    jogador.x += 7;
  }

  jogador.x = constrain(jogador.x, 0, width - jogador.largura);

  // Criar alimentos
  if (frameCount % 40 === 0) {
    alimentos.push({
      x: random(30, width - 30),
      y: -20,
      tamanho: 30
    });
  }

  // Atualizar alimentos
  for (let i = alimentos.length - 1; i >= 0; i--) {
    let a = alimentos[i];

    a.y += 4;

    // Desenhar alimento (maçã)
    fill(255, 0, 0);
    ellipse(a.x, a.y, a.tamanho);

    fill(0, 180, 0);
    rect(a.x - 3, a.y - 20, 6, 10);

    // Colisão
    if (
      a.x > jogador.x &&
      a.x < jogador.x + jogador.largura &&
      a.y > jogador.y &&
      a.y < jogador.y + jogador.altura
    ) {
      pontos++;
      alimentos.splice(i, 1);
      continue;
    }

    // Remove se sair da tela
    if (a.y > height) {
      alimentos.splice(i, 1);
    }
  }

  // Pontuação
  fill(0);
  textSize(28);
  text("Pontos: " + pontos, 20, 40);

  // Título
  textSize(20);
  text("Agrinho - Colha os alimentos!", 20, 75);
}

function desenharCenario() {
  // chão
  fill(80, 180, 80);
  rect(0, height - 100, width, 100);

  // sol
  fill(255, 220, 0);
  ellipse(700, 100, 100);

  // celeiro
  fill(180, 50, 50);
  rect(80, 280, 120, 120);

  fill(120, 30, 30);
  triangle(70, 280, 140, 200, 210, 280);

  fill(90, 60, 30);
  rect(120, 330, 40, 70);
}
