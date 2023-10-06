using System.ComponentModel.DataAnnotations;

namespace Models{
    public class Vozilo{
        [Key]
        public int ID{get; set;}
        public int Zapremina{get; set;}//(cm^3)
        public int Tezina{get; set;}//(kg)
        public int CenaDostave{get; set;}
        public string? Slika{get; set;}
        public DateTime DatumPrijema{get; set;}
        public DateTime DatumDostave{get; set;}

    }
}