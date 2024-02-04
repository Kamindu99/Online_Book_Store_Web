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
            book.setNoOfPage(bookDto.getNoOfPage());
            book.setAddedDate(bookDto.getAddedDate());
            book.setStatusId(1);

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

    public ResponseEntity getBookById(Integer id) throws Exception {
        try{
            Optional<Book> optionalBook = bookDao.findById(id);
            if(optionalBook.isPresent()){
                Book book = optionalBook.get();
                return ResponseEntity.ok(book);
            }
            else{
                throw new Exception("Data not found for given id");
            }
        }
        catch (Exception e){
            log.error(e.getMessage());
            throw new Exception(e.getMessage());
        }
    }

    public ResponseEntity updateBook(BookDto bookDto) throws Exception {
        try{
            if(bookDto.getBookId()==null){
                throw new Exception("Book id not found");
            }
            Optional<Book> optionalBook = bookDao.findById(bookDto.getBookId());

            if(optionalBook.isPresent()){
                Book book = optionalBook.get();
                book.setBookName(bookDto.getBookName());
                book.setAuthor(bookDto.getAuthor());
                book.setPrice(bookDto.getPrice());
                book.setNoOfPage(bookDto.getNoOfPage());
                book.setAddedDate(bookDto.getAddedDate());
                book.setStatusId(Integer.parseInt(bookDto.getStatusId()));

                Book updatedBook = bookDao.save(book);

                if(updatedBook==null){
                    throw new Exception("Error Saving");
                }
                else{
                    return ResponseEntity.ok(book);
                }
            }
            else{
                throw new Exception("Data not found for given id");
            }
        }
        catch (Exception e){
            log.error(e.getMessage());
            throw new Exception(e.getMessage());
        }
    }

    public ResponseEntity deleteBookById(Integer id) throws Exception {
        try{
            Optional<Book> optionalBook = bookDao.findById(id);
            if(optionalBook.isPresent()){
                bookDao.deleteById(id);
                return ResponseEntity.ok("Delete Success");
            }
            else{
                throw new Exception("Data not found for given id");
            }
        }
        catch (Exception e){
            log.error(e.getMessage());
            throw new Exception(e.getMessage());
        }
    }

    public ResponseEntity approveBookById(Integer id) throws Exception {
        try {
            Optional<Book> optionalBook = bookDao.findById(id);
            if(optionalBook.isPresent()){
                Book book = optionalBook.get();
                book.setStatusId(2);
                Book updatedBook = bookDao.save(book);
                if(updatedBook==null){
                    throw new Exception("Error Saving");
                }
                else{
                    return ResponseEntity.ok(book);
                }
            }
            else{
                throw new Exception("Data not found for given id");
            }
        }
        catch (Exception e){
            log.error(e.getMessage());
            throw new Exception(e.getMessage());
        }
    }
}
