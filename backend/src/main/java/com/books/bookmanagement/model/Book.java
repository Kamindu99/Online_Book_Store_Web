package com.books.bookmanagement.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="BOOK")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY,generator = "BOOK")
    @Column(name="bookId")
    private Integer bookId;

    @Column(name="bookName")
    private String bookName;

    @Column(name="author")
    private String author;

    @Column(name="category")
    private String category;

    @Column(name="price")
    private Integer price;

    @Column(name="noOfPage")
    private Integer noOfPage;

    @Column(name="addedDate")
    private String addedDate;

    @Column(name="statusId")
    private Integer statusId;
}
