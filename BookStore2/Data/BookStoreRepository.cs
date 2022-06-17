using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore2.Data
{
    public class BookStoreRepository : IBookStoreRepository 
    {
        private readonly BookStoreContext _context;

        public BookStoreRepository(BookStoreContext context)
        {
            this._context = context;
        }

        public IEnumerable<Book> GetAllBooks()
        {
            return _context.Books
                .Include(x => x.Comments)
                .Include(x => x.ThumbsUps)
                .OrderBy(b => b.Title)
                .ToList();
        }

        public Book GetBookByTitle(string title)
        {
            return _context.Books
                .Where(b => b.Title == title)
                .FirstOrDefault();
        }

        public bool SaveAll()
        {
            return _context.SaveChanges() > 0;
        }

        public void InsertNewBook(Book newBook)
        {
           _context.Books.Add(newBook);
        }

        public void UpdateBook(Book updatedBook)
        {
            Book current = _context.Books.Find(updatedBook.Id);
            if (current != null)
            {
                _context.Entry(current).CurrentValues.SetValues(updatedBook);
                _context.Entry(current).State = EntityState.Modified;
            }
        }

        public void DeleteBook(int bookId)
        {
            Book book = _context.Books.Where( b => b.Id == bookId).FirstOrDefault();
            if (book != null)
            {
                _context.Books.Remove(book);
            }
        }

        public IEnumerable<BookGenre> GetAllBookGenres()
        {
            return _context.BookGenres
                .Include(x => x.Books)
                .ThenInclude(x => x.ThumbsUps)
                .Include(x => x.Books)
                .ThenInclude(x => x.Comments)
                .ToList();
              
        }

        public Book GetBookById(int id)
        {
            return _context.Books
                .Where(b => b.Id == id)
                .FirstOrDefault();
        }

        public IEnumerable<User> GetAllUsers()
        {
            return _context.Users
                .Include(x => x.ThumbsUps)
                .ToList();
        }

        public void RegisterUser(User user)
        {
            if (string.IsNullOrEmpty(user.Role))
            {
                user.Role = "user";
            }
            _context.Users.Add(user);
        }

        public void DeleteUser(int userId)
        {

            User user = _context.Users.Where(u => u.Id == userId).FirstOrDefault();

            if (user != null)
            {
                _context.Users.Remove(user);
            }
        }

        public void UpdateUser(User updatedUser)
        {
            User current = _context.Users.Find(updatedUser.Id);
            if (current != null)
            {
                _context.Entry(current).CurrentValues.SetValues(updatedUser);
                _context.Entry(current).State = EntityState.Modified;
            }
        }

        public void CommentTheBook(Comment comment)
        {
            comment.Date = comment.Date.ToLocalTime();
            _context.Comments.Add(comment);
        }

        public IEnumerable<Comment> GetAllComments()
        {
            return _context.Comments.ToList();
        }

        public IEnumerable<Comment> GetCommentsForBook(int bookId)
        {
            return _context.Comments
                .Where(x => x.BookId == bookId)
                .ToList();
        }

        public void SetThumbsUp(ThumbsUp thumbsUp)
        {
            _context.ThumbsUps.Add(thumbsUp);
        }

        public IEnumerable<ThumbsUp> GetAllThumbsUps()
        {
            return _context.ThumbsUps.ToList();
        }
    }
}
