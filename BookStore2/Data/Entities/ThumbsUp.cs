using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore2.Data
{
    public class ThumbsUp
    {
        public int Id { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        public string UserName { get; set; }

        [ForeignKey("Book")]
        public int BookId { get; set; }

    }
}
