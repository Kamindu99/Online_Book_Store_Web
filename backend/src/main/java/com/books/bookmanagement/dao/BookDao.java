package com.books.bookmanagement.dao;


import com.books.bookmanagement.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookDao extends JpaRepository<Book,Integer> {
    Optional<Book> findByBookName(String bookName);
}
