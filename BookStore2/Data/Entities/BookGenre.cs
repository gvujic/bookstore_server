using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore2.Data
{
    public class BookGenre
    {
        public int Id { get; set; }  
        public string Name { get; set; }

        public ICollection<Book> Books { get; set; } 
    }
}
