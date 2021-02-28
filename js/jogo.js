$(document).ready(()=>{
    
    //função randomica para carregar as img
    let todasasIMG = document.querySelectorAll(".card-imagem img")
    let valorRandom = Math.floor(Math.random() * 3) + 1
    console.log(valorRandom)

    if(valorRandom == 1){
        $("#game2, #game3").remove()
    }else if(valorRandom == 2){
        $("#game1, #game3").remove()
    }else if(valorRandom == 3){
        $("#game2, #game1").remove()
    }

    // Programação do game...
    $("#fimJogo").hide()
    const allCards = document.querySelectorAll(".card")
    const cardsMemoriaCapa = document.querySelectorAll(".card-capa")
    const cardsMemoriaImagem = document.querySelectorAll(".card-imagem")
    let contagemCliques = 0

    function fimJogo(cardVisto){
        let jaFoi = document.querySelectorAll(cardVisto)
    
        if((allCards.length/2) == jaFoi.length){
            setTimeout(() => {
                // alert("FIM JOGO!")
                $("#fimJogo").show().addClass("animated fadeIn")
                $("#areaJogo").remove()
            }, 1200);
        }else{
            console.log("jogo em andamento!")
        }
    }

    for (let i = 0; i < cardsMemoriaCapa.length; i++) {
        cardsMemoriaCapa[i].id = `cardCapa${i}`
        cardsMemoriaImagem[i].id = `cardImagem${i}`
        cardsMemoriaImagem[i].style.display = "none"

        //virando os cards
        $(`#cardCapa${i}`).click(()=>{
            contagemCliques++
            console.log(contagemCliques)
            $(`#cardImagem${i}`).addClass(`animated flipInX elementoVirado${contagemCliques}`)
            $(`#cardCapa${i}`).addClass(`test${contagemCliques}`)
            cardsMemoriaImagem[i].style.display = "block"

            $(`#cardCapa${i}`).css("display", "none")


            if(contagemCliques == 2){
                let imgViradaA = document.querySelector(".elementoVirado1 img")
                let imgViradaB = document.querySelector(".elementoVirado2 img")

                console.log(imgViradaA.getAttribute("src"));console.log(imgViradaB.getAttribute("src"))
                allCards.forEach(element => {
                    element.classList.add("semCliqueContinuar")
                });

                if(imgViradaA.getAttribute("src") === imgViradaB.getAttribute("src")){
                    console.log("imagens iguais, Acertou!")
                    document.querySelector(".elementoVirado1").classList.add("semClique","cardJaVisto")
                    document.querySelector(".elementoVirado1").classList.remove("elementoVirado1")
                    document.querySelector(".elementoVirado2").classList.add("semClique", "cardJaVisto")
                    document.querySelector(".elementoVirado2").classList.remove("elementoVirado2")
                    allCards.forEach(element => {
                        element.classList.remove("semCliqueContinuar", "test1", "test2")
                    });
                    contagemCliques = 0
                }else{
                    console.log("imagens diferentes!")
                    document.querySelector(".elementoVirado1").classList.remove("semClique", "semCliqueContinuar")
                    document.querySelector(".elementoVirado2").classList.remove("semClique", "semCliqueContinuar")
                    setTimeout(() => {
                        $(".test1, .test2").addClass("animated flipInX").show()
                        $(".elementoVirado1, .elementoVirado2").removeClass("animated flipInX").hide()
                        allCards.forEach(element => {
                            element.classList.remove("semCliqueContinuar", "test1", "test2")
                        });
                    }, 2000);
                    setTimeout(() => {
                        $(".elementoVirado1").removeClass("elementoVirado1")
                        $(".elementoVirado2").removeClass("elementoVirado2")
                        contagemCliques = 0
                    }, 2500);
                }
               
            }
            else if(contagemCliques == 0){
                cardsMemoriaCapa[i].classList.remove("semCliqueContinuar")
            }
           
            fimJogo(".cardJaVisto")
        })

        $("#Reiniciar").click(()=>{
            localStorage.setItem("reiniciouGame", "sim")
        })
    }
})