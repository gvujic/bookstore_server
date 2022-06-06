using BookStore2.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);

            optionsBuilder.UseSqlServer(_config["ConnectionStrings:BookStoreContextDb"]);
        }
    }
}
