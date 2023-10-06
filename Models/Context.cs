using Microsoft.EntityFrameworkCore;

namespace  Models{
    public class Context : DbContext{

        public DbSet<Kompanija> Kompanije{get; set;}
        public DbSet<Vozilo> Vozila{get; set;}
        public Context(DbContextOptions options) : base(options){

        }
    }
}