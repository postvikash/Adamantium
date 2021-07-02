package org.techvestor.models;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TopHeadlines {
    long totalArticles;
    NewsArticle[] articles;

}
