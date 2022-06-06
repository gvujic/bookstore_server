using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore2.Data 
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public int PagesNumber { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }

        [ForeignKey("BookGenre")]
        public int BookGenreId { get; set; }

    }
}
