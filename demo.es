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

GET /innereye/_search
{
    "query":{
        "match_all":{}
    }
}

GET /innereye/_mapping


GET /innereye/_search
{
    "query": {
        "nested" : {
            "path" : "memberInfo",
          
            "query" : {
                "bool" : {
                    "must" : [
                    { "match" : {"memberInfo.fullname.keyword" : "刘坡"} }
                    ]
                }
            }
        }
    }
}

GET /innereye/screening/_search
{
    "query":{
       "match" : {"memberInfo.fullname" : "刘坡" }
    }
}