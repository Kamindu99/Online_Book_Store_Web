package com.books.bookmanagement.service;

import com.books.bookmanagement.dao.BookDao;
import com.books.bookmanagement.dto.BookDto;
import com.books.bookmanagement.model.Book;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static java.lang.Integer.parseInt;

@Service
@Slf4j
public class BookService {
    @Autowired
    BookDao bookDao;

    public ResponseEntity createBook(BookDto bookDto) throws Exception {
        try{
            Book book = new Book();
            book.setBookName(bookDto.getBookName());
            book.setAuthor(bookDto.getAuthor());
            book.setPrice(bookDto.getPrice());
            book.setAddedDate(bookDto.getAddedDate());
            book.setStatusId(parseInt(bookDto.getStatusId()));

            Book savedBook = bookDao.save(book);

            if (savedBook==null){
                throw new Exception("Error saving");
            }
            else {
                return ResponseEntity.ok(savedBook);
            }
        }
        catch (Exception e){
            log.error(e.getMessage());
            throw new Exception(e.getMessage());
        }
    }

    public ResponseEntity getAllBook() throws Exception {
        try{
            List<Book> bookList = new ArrayList<>();
            bookList = bookDao.findAll();

            return ResponseEntity.ok(bookList);
        }
        catch (Exception e){
            log.error(e.getMessage());
            throw new Exception(e.getMessage());
        }
    }
}
