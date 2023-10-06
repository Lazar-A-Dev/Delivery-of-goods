using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Models
{
    [ApiController]
    [Route("[controller]")]
    public class KompanijaController : ControllerBase
    {
        public Context _context;

        public KompanijaController(Context context)
        {
            _context = context;
        }

        [Route("VratiSveKompanije")]
        [HttpGet]
        public async Task<ActionResult> VratiSveKompanije()
        {
            try
            {
                var komp = await _context.Kompanije.Include(v => v.Vozila).ToListAsync();
                if (komp == null)
                    return BadRequest("Nema postojecih kompanija");

                return Ok(komp);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("VratiTrazeneKompanije/{zapremina}/{tezina}/{prijem}/{predaja}/{cenaOd}/{cenaDo}")]
        [HttpGet]
        public async Task<ActionResult> VratiTrazeneKompanije(int zapremina, int tezina, DateTime prijem, DateTime predaja, int cenaOd, int cenaDo)
        {
            try
            {
                var komp = await _context.Kompanije.Include(v => v.Vozila).ToListAsync();
                if (komp == null)
                    return BadRequest("Nema postojecih kompanija");

                // Filtriraj vozila za svaku kompaniju
                foreach (var kompanija in komp)
                {
                    kompanija.Vozila = kompanija.Vozila.Where(v =>
                        v.Zapremina >= zapremina &&
                        v.Tezina >= tezina &&
                        v.DatumPrijema >= prijem &&
                        v.DatumDostave >= predaja &&
                        v.CenaDostave >= cenaOd &&
                        v.CenaDostave <= cenaDo
                    ).ToList();
                }

                // Uklonite kompanije koje nemaju nijedno vozilo koje ispunjava kriterijume
                komp = komp.Where(k => k.Vozila.Any()).ToList();

                return Ok(komp);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [Route("NapraviKompaniju")]
        [HttpPost]
        public async Task<ActionResult> NapraviKompaniju(Kompanija komp)
        {
            try
            {
                _context.Kompanije.Add(komp);
                await _context.SaveChangesAsync();

                return Ok("Uspesno napravljena kompanija");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("DodajKompanijiVozilo")]
        [HttpPut]
        public async Task<ActionResult> DodajKompanijiVozilo(int idKomp, int idVoz)
        {
            try
            {
                var komp = await _context.Kompanije.Include(v => v.Vozila).FirstOrDefaultAsync(k => k.ID == idKomp);
                if (komp == null)
                    return BadRequest("Kompanija sa ovim id-jem ne postoji");

                var vozilo = await _context.Vozila.FindAsync(idVoz);
                if (vozilo == null)
                    return BadRequest("Vozilo sa ovim id-jem ne postoji");

                komp.Vozila.Add(vozilo);
                await _context.SaveChangesAsync();

                return Ok("Uspesno je vozilo dodato kompaniji");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("IsporuciVozilo/{idVoz}")]
        [HttpPut]
        public async Task<ActionResult> IsporuciVozilo(int idVoz)
        {
            try
            {
                var vozilo = await _context.Vozila.FindAsync(idVoz);
                if (vozilo == null)
                    return BadRequest("Vozilo sa ovim id-jem ne postoji");

                var kompanija = await _context.Kompanije.FirstOrDefaultAsync(k => k.Vozila.Any(v => v.ID == idVoz));

                if (kompanija == null)
                    return BadRequest("Konpanija za dato vozilo ne postoji");

                kompanija.ProsecniBrojac++;
                kompanija.ProsecnaZarada += vozilo.CenaDostave;
                kompanija.ProsecnaZarada /= kompanija.ProsecniBrojac;
                await _context.SaveChangesAsync();

                return Ok("Uspesno isporuceno vozilo");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}