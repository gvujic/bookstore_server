using BookStore2.Data;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace BookStore2.Controllers
{
    [Route("api/[Controller]")]

    public class CommentsController : Controller
    {
        private readonly IBookStoreRepository _repository;

        public CommentsController(IBookStoreRepository repository)
        {
            this._repository = repository;
        }


        [HttpGet]
        public ActionResult<IEnumerable<Comment>> GetAllComments() 
        {
            try
            {
                return Ok(_repository.GetAllComments());
            }
            catch (Exception)
            {
                return BadRequest("Failed to fetch comments");
            }
        }
        [HttpGet("{id}")]
        public ActionResult<Comment> GetCommentByBookId(int bookId)
        {
            try
            {
                return Ok(_repository.GetCommentsForBook(bookId));
            }
            catch (Exception ex)
            {

                return BadRequest($"Failed to get comment by book id: {bookId}");
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] Comment newComment)
        {
            try
            {
                _repository.CommentTheBook(newComment);
                if (_repository.SaveAll())
                {
                    return Ok(newComment);
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
