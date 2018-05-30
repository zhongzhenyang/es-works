DELETE /blog

GET /blog/_mapping


GET /blog/_mapping/article


GET /blog/_search
{
    "query":{
        "type":{
            "value":"article"
        }
    }
}

GET /blog/article/1


GET /blog/_search
{
    "query":{
        "match_all":{}
    }
}

POST /blog/doc/_delete_by_query
{
    "query":{
        "match_all":{}
    }
}

GET /blog/_search?pretty=true&q=django

POST /blog/_search
{
    "query": {
        "bool": {
            "must": [
                {
                    "match": {
                        "title": "python"
                    }
                },
                {
                    "match": {
                        "body": "good"
                    }
                }
            ]
        }
    }
}

POST /blog/_search
{
    "query": {
        "bool": {
            "filter": [
                {
                    "term": {
                        "title": "python"
                    }
                }
            ]
        }
    }
}

POST /blog/_search
{
    "query": {
        "match_all": {}
    },
    "aggs": {
        "tags_terms": {
            "terms": {
                "field": "tags"
            }
        }
    }
}

POST /_analyze
{
  "text": [
    "Lucene is cool",
    "Elasticsearch builds on top of lucene",
    "Elasticsearch rocks",
    "Elastic is the company behind ELK stack",
    "elk rocks",
    "elasticsearch is rock solid"
  ]
}

POST /blog/_search
{
    "suggest":{
        "my-suggestion":{
            "text": "Python is quck",
            "term":{
                "suggest_mode": "missing",
                "field":"title"
            }
        }
    }
}

POST /blog/_search
{
    "suggest": {
        "my-suggestion": {
            "text": "python good",
            "phrase": {
                "field": "body",
                "highlight": {
                    "pre_tag": "<em>",
                    "post_tag": "</em>"
                }
            }
        }
    }
}

POST _bulk/?refresh=true
{ "index" : { "_index" : "blog", "_type" : "tech" } }
{ "body": "Lucene is cool"}
{ "index" : { "_index" : "blog", "_type" : "tech" } }
{ "body": "Elasticsearch builds on top of lucene"}
{ "index" : { "_index" : "blog", "_type" : "tech" } }
{ "body": "Elasticsearch rocks"}
{ "index" : { "_index" : "blog", "_type" : "tech" } }
{ "body": "Elastic is the company behind ELK stack"}
{ "index" : { "_index" : "blog", "_type" : "tech" } }
{ "body": "elk rocks"}
{ "index" : { "_index" : "blog", "_type" : "tech" } }
{  "body": "elasticsearch is rock solid"}
