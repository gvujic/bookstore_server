USE [BookStoreContextDb]
GO

/****** Object: Table [dbo].[Books] Script Date: 4/13/2022 7:35:36 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Books] (
    [Id]          INT            IDENTITY (1, 1) NOT NULL,
    [Title]       NVARCHAR (MAX) NULL,
    [Author]      NVARCHAR (MAX) NULL,
    [PagesNumber] INT            NOT NULL,
    [Description] NVARCHAR (MAX) NULL,
    [GenreId]     INT            NULL
);


GO
CREATE NONCLUSTERED INDEX [IX_Books_GenreId]
    ON [dbo].[Books]([GenreId] ASC);


GO
ALTER TABLE [dbo].[Books]
    ADD CONSTRAINT [PK_Books] PRIMARY KEY CLUSTERED ([Id] ASC);


GO
ALTER TABLE [dbo].[Books]
    ADD CONSTRAINT [FK_Books_BookGenres_GenreId] FOREIGN KEY ([GenreId]) REFERENCES [dbo].[BookGenres] ([Id]);


INSERT INTO [dbo].[Books] (Title, Author, Description, BookGenreId, PagesNumber, Price)
VALUES ('Dervis i smrt','Mesa Selimovic','simple dedsadsascr', 4, 350, 50)
INSERT INTO [dbo].[Books] (Title, Author, Description, BookGenreId, PagesNumber, Price)
VALUES ('Making History','Stephen Fry','simple dedsadsascr', 2, 350, 50)
INSERT INTO [dbo].[Books] (Title, Author, Description, BookGenreId, PagesNumber, Price)
VALUES ('Najkraća istorija Nemačke','Džejms Hoz','simple dedsadsascr', 5, 350, 50)
INSERT INTO [dbo].[Books] (Title, Author, Description, BookGenreId, PagesNumber, Price)
VALUES ('When Nietzsche Wept','Irwin Yalom','simple dedsadsascr', 4, 350, 50)
INSERT INTO [dbo].[Books] (Title, Author, Description, BookGenreId, PagesNumber, Price)
VALUES ('Animal Farm','George Orvel','simple descr', 4, 350, 11)
INSERT INTO [dbo].[Books] (Title, Author, Description, BookGenreId, PagesNumber, Price)
VALUES ('The Picture of Dorian Gray','Oscar Wilde','simple descr', 3, 350, 11)
INSERT INTO [dbo].[Books] (Title, Author, Description, BookGenreId, PagesNumber, Price)
VALUES ('Fortress','Mesa Selimovic','simple descr', 4, 350, 11)
INSERT INTO [dbo].[Books] (Title, Author, Description, BookGenreId, PagesNumber, Price)
VALUES ('I Know You Got Soul','Jeremy Clarkson','simple descr', 2, 350, 11)
INSERT INTO [dbo].[Books] (Title, Author, Description, BookGenreId, PagesNumber, Price)
VALUES ('The World According to Clarkson','Jeremy Clarkson','simple descr', 4, 350, 11)
INSERT INTO [dbo].[Books] (Title, Author, Description, BookGenreId, PagesNumber, Price)
VALUES ('Majstor i Margarita','Mihail Bulgakov','simple descr', 4, 350, 11)
INSERT INTO [dbo].[Books] (Title, Author, Description, BookGenreId, PagesNumber, Price)
VALUES ('Nulti broj','Umberto Eko','simple descr', 4, 350, 11)
INSERT INTO [dbo].[Books] (Title, Author, Description, BookGenreId, PagesNumber, Price)
VALUES ('Na Drini cuprija','Ivo Andric','simple descr', 4, 350, 11)





