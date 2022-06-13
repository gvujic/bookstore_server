using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore2.Data
{
    public class Comment
    {
        public int Id { get; set; }
        public string PlainComment { get; set; }
        public string UserName { get; set; }
        public DateTime Date { get; set; } 
        [ForeignKey("Book")]
        public int BookId { get; set; }
    }
}
