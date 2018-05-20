GET /_cat/indices?pretty

GET /_mapping

GET /country_v1/_mapping

GET /country_v1/_alias


DELETE /*

GET /order/_search
{
    "query":{
        "match_all":{

        }
    }
}

GET /_search
{
    "query":{
        "match_all":{

        }
    }
}

POST /order/_search
{
    "_source": {
        "includes": [
            "id",
            "customer.id"
        ]
    },
    "query": {
        "bool": {
            "filter": {
                "terms": {
                    "customer.id": [
                        2
                    ]
                }
            }
        }
    }
}