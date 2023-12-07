var numeroReal = 0

$(() => {
    numeroReal = randomNumber(1, 100).toFixed(0)

    $('.numero-real').text(numeroReal)
})

$('.exibir').on('click', () => $('p').show())

var respostas = []

const addResposta = (numero) => {

    start()

    $('.mensagem').hide()

    numero = Number(numero)

    if (numero < 1 || numero > 100 || isNaN(numero)){
        $('.mensagem').text('Esse não vale.').show()
        return
    }

    if (respostas.map(r => r.numero).includes(numero)) {
        $('.mensagem').text('Esse número já foi.').show()
        return
    }



    const last = respostas[respostas.length - 1]

    const distancia = Math.abs(numeroReal - numero)


    const maiorDistancia = Math.max(...respostas.map(r => r.distancia))

    let color = 'bg-frio'
    let legenda = 'Frio'
    let pontos = 2

    if ((last?.distancia ?? 100) >= distancia) {
        color = 'bg-quente'
        legenda = 'Quente'
        pontos = -3

    }

    if (distancia >= 1 && distancia <= 4) {
        color = 'bg-muito-quente'
        legenda = 'Muito Quente'
        pontos = -5

    }

    if (distancia > maiorDistancia && respostas.length > 0) {
        color = 'bg-muito-frio'
        legenda = 'Muito Frio'
        pontos = 4

    }

    if (numero == numeroReal) {
        color = 'bg-acertou'
        legenda = 'Acertou!'
        pontos = -10
        pause()
        $('input').hide()
    }


    const data = {
        numero,
        color,
        distancia,
        legenda,
        pontos
    }

    respostas.push(data)

    renderRespostas()

}

const renderRespostas = () => {
    const container = $('.container-numeros')

    container.empty()

    respostas.forEach(e => {
        container.prepend(`<div class="resposta ${e.color}" > ${e.numero} <span>${e.legenda}</span> </div>`)
    })

    const tentativas = respostas.length
    const pontos = respostas.reduce((acc, element, index) => acc+=element.pontos, 0)

    $('.tentativas-count').text(`${tentativas}`)
    $('.pontos-count').text(`${pontos < 0 ? 0 : 100 - pontos}`)

}

$('input').keyup(e => {
    if (e.which == 13) {
        addResposta(e.target.value)
        e.target.value = ''
    }
})
$('input').blur(e => {
    if (e.target.value != '') {

        addResposta(e.target.value)
        e.target.value = ''
    }

})


function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

var timerId;
var counter = 1;

function start() {
    if (timerId == undefined) {
        loop()
    }
}

function pause() {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    }
}

function loop() {
    timerId = setInterval(function () {
        $('.timer').text(formatSeconds(counter));
        counter++;
    }, 1000);
}

const formatSeconds = (SECONDS) => {
    return new Date(SECONDS * 1000).toISOString().substring(14, 19)

}