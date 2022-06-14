using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace BookStore2.Data
{
    public class BookStoreContext : DbContext
    {
        private readonly IConfiguration _config;
        public BookStoreContext(IConfiguration config)
        {
            this._config = config;
        }

        public DbSet<Book> Books { get; set; }
        public DbSet<BookGenre> BookGenres { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<ThumbsUp> ThumbsUps { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);

            optionsBuilder.UseSqlServer(_config["ConnectionStrings:BookStoreContextDb"]);
        }
    }
}
