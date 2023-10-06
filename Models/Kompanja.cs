using System.ComponentModel.DataAnnotations;

namespace Models{
    public class Kompanija{
        [Key]
        public int ID{get; set;}
        public string? NazivKompanije{get; set;}
        public int ProsecnaZarada{get; set;}
        public int ProsecniBrojac{get; set;}
        public List<Vozilo>? Vozila{get; set;}
    }
}