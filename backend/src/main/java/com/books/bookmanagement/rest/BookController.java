package com.books.bookmanagement.rest;

import com.books.bookmanagement.dto.BookDto;
import com.books.bookmanagement.model.Book;
import com.books.bookmanagement.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/book-master")
public class BookController {

    @Autowired
    BookService bookService;

    @PostMapping("/create")
    public ResponseEntity<Book> createBook(@RequestBody BookDto bookDto) throws Exception {
        ResponseEntity response = bookService.createBook(bookDto);
        return response;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Book>> getAllBook() throws Exception {
        ResponseEntity response = bookService.getAllBook();
        return response;
    }
}
