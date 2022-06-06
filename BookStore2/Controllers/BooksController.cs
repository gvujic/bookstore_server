using BookStore2.Data;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BookStore2.Controllers
{
    [Route("api/[Controller]")]
    public class BooksController : Controller
    {
        private readonly IBookStoreRepository _repository;

        public BooksController(IBookStoreRepository repository)
        {
            this._repository = repository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Book>> GetAllBooks()
        {
            try
            {
                JsonSerializerOptions options = new()
                {
                    ReferenceHandler = ReferenceHandler.Preserve,
                    WriteIndented = true
                };
                string jsonString = JsonSerializer.Serialize<Book>(_repository.GetAllBooks().FirstOrDefault(), options);
                return Ok(_repository.GetAllBooks());
            }
            catch (Exception ex)
            {

                return BadRequest("Failed to fetch books");
            }
        }

        [HttpGet("{id}")]
        public ActionResult<Book> GetBookById(int id) {
            try
            {
                return Ok(_repository.GetBookById(id));
            }
            catch (Exception ex)
            {

                return BadRequest($"Failed to get book by id: {id}");
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody]Book newBook) 
        {
            try
            {
                _repository.InsertNewBook(newBook);
                if (_repository.SaveAll())
                {
                    return Ok(newBook);
                }
            }
            catch (Exception ex)
            {

                throw;
            }

            return BadRequest();
        }

        [HttpPut]
        public IActionResult Put([FromBody]Book updatedBook)
        {
            try
            {
                _repository.UpdateBook(updatedBook);
                if (_repository.SaveAll())
                {
                    return Ok();
                }
            }
            catch (Exception ex)
            {

                throw;
            }

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _repository.DeleteBook(id);
                if (_repository.SaveAll())
                {
                    return Ok();
                }
            }
            catch (Exception ex)
            {

                throw;
            }

            return BadRequest();
        }


    }
}
