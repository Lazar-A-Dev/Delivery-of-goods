using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Models
{
    [ApiController]
    [Route("[controller]")]
    public class VoziloController : ControllerBase
    {
        public Context _context;

        public VoziloController(Context context)
        {
            _context = context;
        }

        [Route("VratiSvaVozila")]
        [HttpGet]
        public async Task<ActionResult> VratiSveKompanije(){
            try{
                var vozilo = await _context.Vozila.ToListAsync();
                if(vozilo == null)
                return BadRequest("Nema postojecih vozila");

                return Ok(vozilo);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [Route("NapraviVozilo")]
        [HttpPost]
        public async Task<ActionResult> NapraviVozilo(Vozilo vozilo){
            try{
                _context.Vozila.Add(vozilo);
                await _context.SaveChangesAsync();

                return Ok("Uspesno napravljeno vozilo");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
    }
}