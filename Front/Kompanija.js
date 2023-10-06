import { Vozilo } from "./Vozilo.js";

export class Kompanija {
    constructor(id, nazivKompanije, prosecnaZarada, prosecniBrojac) {
        this.id = id;
        this.nazivKompanije = nazivKompanije;
        this.prosecnaZarada = prosecnaZarada;
        this.prosecniBrojac = prosecniBrojac;

        this.listaVozila = [];
        this.container = null;
    }

    dodajListiVozila(vozilo) {
        this.listaVozila.push(vozilo);
    }

    crtajkompaniju(host) {
        this.container = document.createElement("div");
        this.container.className = "glavni";
        host.appendChild(this.container);

        var levi = document.createElement("div");
        levi.className = "levi";
        this.container.appendChild(levi);

        var desni = document.createElement("div");
        desni.className = "desni";
        this.container.appendChild(desni);

        var red1 = document.createElement("div");
        red1.className = "red1";
        levi.appendChild(red1);

        var zapLabel = document.createElement("label");
        zapLabel.className = "zapLabel";
        zapLabel.innerHTML = "Zapremina(cm^3): ";
        red1.appendChild(zapLabel);

        var zapInput = document.createElement("input");
        zapInput.className = "zapInput";
        zapInput.type = "number";
        zapInput.min = 1;
        red1.appendChild(zapInput);

        var red2 = document.createElement("div");
        red2.className = "red2";
        levi.appendChild(red2);

        var tezLabel = document.createElement("label");
        tezLabel.className = "tezLabel";
        tezLabel.innerHTML = "Tezina(kg): ";
        red2.appendChild(tezLabel);

        var tezInput = document.createElement("input");
        tezInput.className = "tezInput";
        tezInput.type = "number";
        tezInput.min = 1;
        red2.appendChild(tezInput);

        var red3 = document.createElement("div");
        red3.className = "red3";
        levi.appendChild(red3);

        var datPrijemLabel = document.createElement("label");
        datPrijemLabel.className = "datPrijemLabel";
        datPrijemLabel.innerHTML = "Datum prijema: ";
        red3.appendChild(datPrijemLabel);

        var datPrijemInput = document.createElement("input");
        datPrijemInput.className = "datPrijemInput";
        datPrijemInput.type = "date";
        red3.appendChild(datPrijemInput);

        var red4 = document.createElement("div");
        red4.className = "red4";
        levi.appendChild(red4);

        var datDostavaLabel = document.createElement("label");
        datDostavaLabel.className = "datDostavaLabel";
        datDostavaLabel.innerHTML = "Datum dostave: ";
        red4.appendChild(datDostavaLabel);

        var datDostavaInput = document.createElement("input");
        datDostavaInput.className = "datDostavaInput";
        datDostavaInput.type = "date";
        red4.appendChild(datDostavaInput);

        var red5 = document.createElement("div");
        red5.className = "red5";
        levi.appendChild(red5);

        var cenaOdLabel = document.createElement("label");
        cenaOdLabel.className = "cenaOdLabel";
        cenaOdLabel.innerHTML = "Cena od: ";
        red5.appendChild(cenaOdLabel);

        var cenaOdInput = document.createElement("input");
        cenaOdInput.className = "cenaOdInput";
        cenaOdInput.type = "number";
        cenaOdInput.min = 1;
        red5.appendChild(cenaOdInput);

        var red6 = document.createElement("div");
        red6.className = "red6";
        levi.appendChild(red6);

        var cenaDoLabel = document.createElement("label");
        cenaDoLabel.className = "cenaDoLabel";
        cenaDoLabel.innerHTML = "Cena do: ";
        red6.appendChild(cenaDoLabel);

        var cenaDoInput = document.createElement("input");
        cenaDoInput.className = "cenaDoInput";
        cenaDoInput.type = "number";
        cenaDoInput.min = 1;
        red6.appendChild(cenaDoInput);

        var pronadjiBtn = document.createElement("button");
        pronadjiBtn.className = "pronadjiBtn";
        pronadjiBtn.innerHTML = "Pronadji"
        levi.appendChild(pronadjiBtn);

        pronadjiBtn.onclick = (ev) => this.crtajVozila(desni);
    }

    async crtajVozila(host) {
        host.innerHTML = '';
        var zapremina = parseInt(this.container.querySelector(".zapInput").value);
        var tezina = parseInt(this.container.querySelector(".tezInput").value);
        var datPrijem = this.container.querySelector(".datPrijemInput").value;
        var datDostava = this.container.querySelector(".datDostavaInput").value;
        var cenaOd = parseInt(this.container.querySelector(".cenaOdInput").value);
        var cenaDo = parseInt(this.container.querySelector(".cenaDoInput").value);

        var response = await fetch(`http://localhost:5056/Kompanija/VratiTrazeneKompanije/${zapremina}/${tezina}/${datPrijem}%2017%3A32%3A28.0000000/${datDostava}%2017%3A32%3A28.0000000/${cenaOd}/${cenaDo}`);
        var data = await response.json();
        console.log(data);

        data.forEach(e => {
            e.vozila.forEach(vozilo => {
                var kartica = document.createElement("div");
                kartica.className = "kartica";
                host.appendChild(kartica);

                var red1K = document.createElement("div");
                red1K.className = "red1K";
                kartica.appendChild(red1K);

                var nazivKompLabel = document.createElement("label");
                nazivKompLabel.className = "nazivKompLabel";
                nazivKompLabel.innerHTML = "Naziv kompanije: " + e.nazivKompanije;
                red1K.appendChild(nazivKompLabel);

                var red2K = document.createElement("div");
                red2K.className = "red2K";
                kartica.appendChild(red2K);

                var slika = document.createElement("img");
                slika.className = "slika";
                slika.src = `www.root/${vozilo.slika}`
                slika.alt = `www.root/${vozilo.slika}`
                red2K.appendChild(slika);

                var red3K = document.createElement("div");
                red3K.className = "red3K";
                kartica.appendChild(red3K);

                var cenaVozilaLabel = document.createElement("label");
                cenaVozilaLabel.className = "cenaVozila";
                cenaVozilaLabel.innerHTML = "Cena :" + vozilo.cenaDostave;
                red3K.appendChild(cenaVozilaLabel);

                var red4K = document.createElement("div");
                red4K.className = "red4K";
                kartica.appendChild(red4K);

                var proZarLabel = document.createElement("label");
                proZarLabel.className = "proZarLabel";
                proZarLabel.innerHTML = "Prosecna zarada kompanije: " + e.prosecnaZarada;
                red4K.appendChild(proZarLabel);

                var naruciBtn = document.createElement("button");
                naruciBtn.className = "naruciBtn";
                naruciBtn.innerHTML = "Naruci";
                kartica.appendChild(naruciBtn);

                naruciBtn.onclick = (e) => this.naruciVozilo(vozilo);
            });
        });


    }

    async naruciVozilo(vozilo) {
        var response = await fetch(`http://localhost:5056/Kompanija/IsporuciVozilo/${vozilo.id}`);
        var data = await response.json();

    }
}