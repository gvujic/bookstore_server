using BookStore2.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BookStore2.Controllers
{
    [Route("api/[Controller]")]

    public class ThumbsUpController : Controller
    {
        private readonly IBookStoreRepository _repository;

        public ThumbsUpController(IBookStoreRepository repository)
        {
            this._repository = repository;
        }

        [HttpPost]
        public IActionResult Post([FromBody]ThumbsUp thumbsUp)
        {
            try
            {
                _repository.SetThumbsUp(thumbsUp);
                if (_repository.SaveAll())
                {
                    return Ok(thumbsUp);
                }
            }
            catch (Exception)
            {
                throw;
            }

            return BadRequest("Could not set thumbsUp");
        }

        [HttpGet]
        public ActionResult<IEnumerable<ThumbsUp>>Get()
        {
            try
            {
                return Ok(_repository.GetAllThumbsUps());
            }
            catch (Exception)
            {

                return BadRequest("Failed to fetch all thumbsUps");
            }
        }
    }
}
