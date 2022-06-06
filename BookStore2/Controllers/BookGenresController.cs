using BookStore2.Data;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore2.Controllers
{
    [Route("api/[Controller]")]
    public class BookGenresController : Controller
    {
        private readonly IBookStoreRepository _repository;

        public BookGenresController(IBookStoreRepository repository)
        {
            this._repository = repository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<BookGenre>> GetAllBookGenres() 
        {
            try
            {
                return Ok(_repository.GetAllBookGenres()); 
            }
            catch (Exception ex)
            {

                return BadRequest("Failed to fetch books");
            }
        }

    }
}
