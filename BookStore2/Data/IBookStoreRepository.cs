using System.Collections.Generic;

namespace BookStore2.Data
{
    public interface IBookStoreRepository
    {
        IEnumerable<Book> GetAllBooks();
        Book GetBookByTitle(string title);
        Book GetBookById(int id);
        void UpdateBook(Book updatedBook);
        void DeleteBook(int bookId);
        void InsertNewBook(Book newBook);

        IEnumerable<BookGenre> GetAllBookGenres();

        IEnumerable<User> GetAllUsers();

        void RegisterUser(User user);

        void DeleteUser(int userId);
        void UpdateUser(User updatedUser);

        void CommentTheBook(Comment comment);

        IEnumerable<Comment> GetAllComments();

        IEnumerable<Comment> GetCommentsForBook(int bookId);

        void SetThumbsUp(ThumbsUp thumbsUp);

        IEnumerable<ThumbsUp> GetAllThumbsUps();

        bool SaveAll();
    }
}