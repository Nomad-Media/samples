from libraries import *
from login import *
from refresh_token import *
from search import *

LOGGING = True
session = boto3.session.Session()
client = session.client(service_name='secretsmanager')

CONTENT_DEFINITION_ID = "909a11ec-d0b6-4164-8337-bc06be05de81"
US_ENGLISH_LANGUAGE_LOOKUP_ID = "c66131cd-27fc-4f83-9b89-b57575ac0ed8"

def get_secret():
    secret_name = "sfal-secrets"

    try:
        get_secret_value_response = client.get_secret_value(SecretId=secret_name)
        # Decrypts secret using the associated KMS key.
        secret_response = get_secret_value_response['SecretString']
        return json.loads(secret_response)
    except ClientError as e:
        if e.response['Error']['Code'] == 'ResourceNotFoundException':
            raise Exception("The requested secret " + secret_name + " was not found")
        elif e.response['Error']['Code'] == 'InvalidRequestException':
            raise Exception("The request was invalid due to:", e)
        elif e.response['Error']['Code'] == 'InvalidParameterException':
            raise Exception("The request had invalid params:", e)
        elif e.response['Error']['Code'] == 'DecryptionFailure':
            raise Exception("The requested secret can't be decrypted using the provided KMS key:", e)
        elif e.response['Error']['Code'] == 'InternalServiceError':
            raise Exception("An error occurred on service side:", e)
                    

def lambda_handler(event, context):
    logger = logging.getLogger()
    logger.setLevel(logging.INFO)
    if (not LOGGING):
        logging.disable(logging.INFO)

    logger.info('## ENVIRONMENT VARIABLES \r' + jsonpickle.encode(dict(**os.environ)))
    logger.info('## EVENT \r' + jsonpickle.encode(event))
    logger.info('## CONTEXT \r' + jsonpickle.encode(context))

    login_response = login(get_secret())

    login_info = json.loads(login_response.text)
    logger.info("## Loggin info \r" + jsonpickle.encode(login_response))
    logger.info(login_info)
    status_code = login_response.status_code
        
    print_token = login_info["token"][:10] + '*' * (len(login_info["token"]) - 10)
    logger.info('## Response Information ' + print_token)
    
    countries_query = {
        "filters": [
            {
                "fieldName": "contentDefinitionId",
                "operator": "Equals",
                "values": "ed1edc64-21a5-413e-8cf6-a21285d51e7f"
            }
        ]
    }
    
    adam_query = {
        "pageOffset":0,
        "pageSize":50,
        "filters": [
            {
                "fieldName":"contentDefinitionId",
                "operator":"Equals"
                ,"values":"3ff29f61-bd0b-4c17-b855-49db5a292aeb"
            },
            {
                "fieldName":"assetType",
                "operator":"Equals",
                "values":2
            },
            {
                "fieldName":"parentId",
                "operator":"Equals",
                "values":"07f35297-a4c2-467d-af8c-de8910e9fd35"
            },
            {
                "fieldName":"assetStatus",
                "operator":"Equals",
                "values":1
            }
        ],
        "returnedFieldNames": [
            "identifiers.assetType",
            "identifiers.createdDate",
            "identifiers.previewImageUrl",
            "identifiers.previewImageFullUrl",
            "identifiers.mediaTypeDisplay"
        ],
        "fullUrlFieldNames": [
            "previewImageUrl",
            "thumbnailImageUrl"
        ],
        "sortFields": [
            {
                "fieldName":"createdDate",
                "sortType":"Descending"
            }
        ]
    }
    
    admin_url = "https://admin-app.dev-05.demos.media/api/admin/search"
    portal_url = "https://app-api.dev-05.demos.media/api/portal/search"
    search_response_country = search(countries_query, login_info["token"], admin_url)
    
    search_info_country = json.loads(search_response_country.text)
    
    if not search_info_country['hasItems']:
        logger.info("## Search Response \rThe search you queried has no responses")
    else:
        logger.info('## Search Response \r' + jsonpickle.encode(search_info_country))

    search_response_adam = search(adam_query, login_info["token"], portal_url)
    
    search_info_adam = json.loads(search_response_adam.text)
    
    if not search_info_adam['hasItems']:
        logger.info("## Search Response \rThe search you queried has no responses")
    else:
        logger.info('## Search Response \r' + jsonpickle.encode(search_info_adam))

    if('detail-type' in event):
        if(event['detail-type'] == 'Scheduled Event'):
            login_response = refresh_token(login_info["refreshToken"])
            login_info = json.loads(login_response.text)


    return(login_info["firstName"])
