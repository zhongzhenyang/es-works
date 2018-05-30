#!/usr/bin/env python
# coding:utf-8

from datetime import datetime
from elasticsearch_dsl import DocType, Date, Integer, Keyword, Text
from elasticsearch_dsl.connections import connections

connections.create_connection(hosts=['localhost'])


class Article(DocType):
    title = Text(analyzer='snowball', fields={'raw': Keyword()})
    body = Text(analyzer='snowball')
    tags = Keyword()
    published_from = Date(default_timezone='UTC')
    lines = Integer()
    created_at = Date(default_timezone='UTC')

    class Meta:
        index = 'blog'
        doc_type = 'article'

    def save(self, **kwargs):
        self.lines = len(self.body.split())
        return super(Article, self).save(kwargs)

    def is_published(self):
        return datetime.now() >= self.published_from


Article.init()


def create_article():
    now = datetime.utcnow()
    article = Article(meta={'id': 1}, title='Hello elasticsearch!', tags=['elasticsearch'])
    article.body = '''looong text'''
    article.published_from = now
    article.created_at = now
    article.save()
    return article


def get_article():
    article = Article.get(id=1)
    print(article.to_dict())


def update_article():
    article = Article.get(id=1)
    article.body = 'this is test body'
    article.tags = ['elasticsearch', 'hello']
    article.save()

    # you can also update just individual fields which will call the update API
    # and also update the document in place
    article.update(body='Today is good day!', published_by='me')


def delete_article():
    article = Article.get(id=1)
    article.delete()


if __name__ == '__main__':
    create_article()
