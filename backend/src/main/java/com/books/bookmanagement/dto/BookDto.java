package com.books.bookmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookDto {
    private Integer bookId;
    private String bookName;
    private String author;
    private String category;
    private Integer price;
    private Integer noOfPage;
    private String addedDate;
    private String statusId;
}
