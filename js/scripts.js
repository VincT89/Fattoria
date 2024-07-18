class Animale {
	constructor(tipo, salute, fame) {
		this.tipo = tipo;
		this.salute = salute || 100;
		this.fame = fame || 100;
	}

	mangia() {
		alert(`${this.tipo} sta mangiando.`);
	}
}

class Campo {
	constructor(tipoColtura, quantita) {
		this.tipoColtura = tipoColtura;
		this.quantita = quantita;
	}

	aggiungiCampo(campo) {
		this.campi.push(campo);
		alert(
			`Campo di ${campo.tipoColtura}, con capienza di ${campo.quantita} ettari aggiunto alla fattoria.`
		);
	}

	semina(tipoColtura, quantita) {
		this.tipoColtura = tipoColtura;
		this.quantita = quantita;
		alert(`Hai seminato ${quantita} ettari di ${this.tipoColtura}.`);
  }
  

}

class Prodotto {
  constructor(tipoProdotto, quantita, prezzo) {
    this.tipoProdotto = tipoProdotto;
		this.quantita = quantita;
		this.prezzo = prezzo;
		
  }

}

class Fattoria {
	constructor() {
    this.animali = [];
    this.campi = [];
    this.prodotti = {};
  }

	aggiungiAnimale(animale) {
		this.animali.push(animale);
		alert(`${animale.tipo} aggiunto alla fattoria.`);
	}

	nutriAnimale(indiceAnimale) {
		if (indiceAnimale >= 0 && indiceAnimale < this.animali.length) {
			this.animali[indiceAnimale].mangia();
		} else {
			alert("Animale non trovato.");
		}
	}

	aggiungiCampo(campo) {
		this.campi.push(campo);
		alert(`Campo di ${campo.tipoColtura} aggiunto alla fattoria.`);
	}

	seminaCampo(indiceCampo, tipoColtura, quantita) {
		if (indiceCampo >= 0 && indiceCampo < this.campi.length) {
			this.campi[indiceCampo].semina(tipoColtura, quantita);
		} else {
			alert("Campo non trovato.");
		}
  }

  raccogliColtura(indiceCampo, quantita) {
    if (indiceCampo < 0 || indiceCampo >= this.campi.length) {
      alert("Campo non trovato.");
      return;
    }
    if (quantita <= 0 || typeof quantita !== 'number') {
      alert("Quantità non valida.");
      return;
    }
    if (this.campi[indiceCampo].quantita < quantita) {
      alert("Quantità non disponibile.");
      return;
    }
    this.campi[indiceCampo].quantita -= quantita;
    if (!this.prodotti[this.campi[indiceCampo].tipoColtura]) {
      this.prodotti[this.campi[indiceCampo].tipoColtura] = 0;
    }
		this.prodotti[this.campi[indiceCampo].tipoColtura] += quantita;
    alert(`Hai raccolto ${quantita} quintali di ${this.campi[indiceCampo].tipoColtura} che ora sono nel tuo magazzino.`);
  }

	vendiProdotto(tipoProdotto, quantita, prezzo) {
    let quantitaDisponibile = this.prodotti[tipoProdotto];
    if (!quantitaDisponibile || quantitaDisponibile < quantita) {
        alert("Prodotto non disponibile o quantità non disponibile.");
        return;
    }
    this.prodotti[tipoProdotto] -= quantita;
    let guadagno = quantita * prezzo;
    this.guadagno = (this.guadagno || 0) + guadagno;
    alert(`Hai venduto ${quantita} quintali di ${tipoProdotto} a ${prezzo} per quintale. Guadagno totale: ${this.guadagno}.`);
}
	

mostraStato() {
	let stato = "Stato della fattoria:\n";
	stato += "Animali:\n";
	this.animali.forEach((animale, indice) => {
			stato += `${indice + 1}. ${animale.tipo} - Salute: ${animale.salute}, Fame: ${animale.fame}\n`;
	});
	stato += "Campi:\n";
	this.campi.forEach((campo, indice) => {
			stato += `${indice + 1}. ${campo.tipoColtura} - Quantità: ${campo.quantita} ettari\n`;
	});
	stato += "Prodotti:\n";
	for (let tipoProdotto in this.prodotti) {
			stato += `${tipoProdotto}: ${this.prodotti[tipoProdotto]} quintali - Guadagno: ${this.guadagno} euro\n`;
	}
	return stato;
}
}


document.addEventListener("DOMContentLoaded", function () {
	let bottoneIniziaGioco = document.getElementById("iniziaGioco");
	let fattoria = new Fattoria();

	bottoneIniziaGioco.addEventListener("click", function () {
		alert("Benvenuto nella tua fattoria virtuale!");
		let continua = true;

		while (continua) {
			let azione = prompt(
				"Cosa vuoi fare? \n1. Aggiungi Animale \n2. Nutri Animale \n3. Aggiungi Campo \n4. Semina Campo \n5. Raccogli Coltura \n6. Vendi Prodotto \n7. Mostra Stato Fattoria \n0. Esci"
			);

			switch (azione) {
				case "1":
					let tipoAnimale = prompt("Inserisci il tipo di animale:");
					let animale = new Animale(tipoAnimale);
          fattoria.aggiungiAnimale(animale);
        
					break;
				case "2":
					let indiceAnimale = parseInt(
						prompt("Inserisci l'indice dell'animale da nutrire:")
					);
          fattoria.nutriAnimale(indiceAnimale - 1);
         
					break;
				case "3":
					let tipoColtura = prompt("Inserisci il tipo di coltura:");
					let quantita = parseInt(prompt("Inserisci la capienza:"));
					let campo = new Campo(tipoColtura, quantita);
          fattoria.aggiungiCampo(campo);
          
					break;
				case "4":
					let indiceCampo = parseInt(
						prompt("Inserisci l'indice del campo da seminare:")
					);
					let tipoColturaCampo = prompt("Inserisci il tipo di coltura:");
					let quantitaCampo = parseInt(prompt("Inserisci la quantità:"));
					fattoria.seminaCampo(
						indiceCampo - 1,
						tipoColturaCampo,
						quantitaCampo
					);
					break;
				case "5":
          let indiceCampoRaccogli = parseInt(
            prompt("Inserisci l'indice del campo da raccogliere:")
          );
          let quantitaRaccogli = parseInt(
            prompt("Inserisci la quantità da raccogliere:")
          );
          fattoria.raccogliColtura(indiceCampoRaccogli - 1, quantitaRaccogli);
          break;
				
					case "6":
						let tipoProdotto = prompt("Inserisci il tipo di prodotto:");
						let quantitaProdotto = parseInt(prompt("Inserisci la quantità da vendere:"));
						let prezzoProdotto = parseFloat(prompt("Inserisci il prezzo del prodotto (usare il punto per i decimali):")); 
					fattoria.vendiProdotto(tipoProdotto, quantitaProdotto, prezzoProdotto);
					
						break;
				case "7":
					alert(fattoria.mostraStato());
					break;
				case "0":
					alert("Grazie per aver giocato!");
					continua = false;
					break;
				default:
					alert("Scelta non valida, riprova.");
			}
		}
	});
});
