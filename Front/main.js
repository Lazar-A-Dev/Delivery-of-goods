import { Kompanija } from "./Kompanija.js";
import { Vozilo } from "./Vozilo.js";

var response = await fetch("http://localhost:5056/Kompanija/VratiSveKompanije");
var data = await response.json();

var kompanija;

data.forEach(async k => {
    kompanija = new Kompanija(k["id"], k["nazivKompanije"], k["prosecnaZarada"], k["prosecniBrojac"]);
    var vozila = k["vozila"];
    vozila.forEach(async v => {
        var vozilo = new Vozilo(v["id"], v["zapremina"], v["tezina"], v["cenaDostave"], v["slika"], v["datumPrijema"], v["datumDostave"]);
        kompanija.dodajListiVozila(vozilo);
    })
});

kompanija.crtajkompaniju(document.body);