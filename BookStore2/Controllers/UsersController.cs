using BookStore2.Data;
using BookStore2.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BookStore2.Controllers
{
    [Route("api/[Controller]")]
    public class UsersController : Controller
    {
        private readonly IBookStoreRepository _repository;

        public UsersController(IBookStoreRepository repository)
        {
            this._repository = repository;
        }

        [HttpGet]
        public IActionResult GetAllUsers() 
        {
            try
            {
                return Ok(_repository.GetAllUsers());
            }
            catch (Exception)
            {

                return BadRequest("Failed to fetch users");
            }
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody]User user)
        {
            if (user == null)
            {
                return BadRequest();
            }

            try
            {
                _repository.RegisterUser(user);
                if (_repository.SaveAll())
                {
                    return Ok(user);
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return BadRequest();
        }

        [HttpPost]
        public IActionResult Login([FromBody] User userInput)
        {
            if (userInput == null)
            {
                return BadRequest();
            }

            IEnumerable<User> allUsers = _repository.GetAllUsers();
            foreach (User user in allUsers)
            {
                if (user.UserName == userInput.UserName && 
                    user.Password == userInput.Password)
                {
                    var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                    var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                    var claims = new List<Claim>
                        {
                            new Claim(ClaimTypes.Name, user.UserName),
                             new Claim(ClaimTypes.Role, user.Role)
                        };

                    var tokenOptions = new JwtSecurityToken(
                        issuer: "https://localhost:13960",
                        audience: "https://localhost:13960",
                        claims: claims,
                        expires: DateTime.Now.AddMinutes(5),
                        signingCredentials: signingCredentials

                        );

                    var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

                    return Ok(new { Token = tokenString, User = user.UserName, Role = user.Role });


                }
            }

            return Unauthorized();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            try
            {
                _repository.DeleteUser(id);
                if (_repository.SaveAll())
                {
                    return Ok();
                }
            }
            catch (Exception)
            {

                throw;
            }

            return BadRequest();
        }

        [HttpPut]
        public IActionResult UpdateUser([FromBody] User user)
        {
            try
            {
                _repository.UpdateUser(user);
                if (_repository.SaveAll())
                {
                    return Ok();
                }
            }
            catch (Exception)
            {

                throw;
            }

            return BadRequest();
        }
    }
}
