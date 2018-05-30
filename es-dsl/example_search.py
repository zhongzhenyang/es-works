# coding:utf-8

import datetime
from elasticsearch import Elasticsearch
from elasticsearch_dsl import Search

from .example1 import Article

client = Elasticsearch({"host": "localhost", "port": 9200})
s = Search(using=client)


def add_article(id_, title, body, tags):
    now = datetime.datetime.utcnow()
    article = Article(meta={'id': id_}, title=title, tags=tags)
    article.body = body
    article.published_from = now
    article.created_at = now
    article.save()
    return article


def init_test_data():
    add_article(2, 'Python is good!', 'Python is good!', ['python'])
    add_article(3, 'Elasticsearch', 'Distributed, open source search and analytics engine', ['elasticsearch'])
    add_article(4, 'Python very quickly', 'Python very quickly', ['python'])
    add_article(5, 'Django', 'Python Web framework', ['python', 'django'])


