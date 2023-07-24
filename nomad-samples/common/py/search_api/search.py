from helpers.get_search_result import *
from search_api.get_search import *
from search_api.post_search import *

import json

def get_search_main(AUTH_TOKEN):
    try:
        ID = input("Enter the content id of the content you are searching for: ")
        IS_ADMIN = True if input("Do you want to search by admin or portal?: ") == "admin" else False

        print("Searching")
        CONTENT = get_search(AUTH_TOKEN, ID, IS_ADMIN)
        print(json.dumps(CONTENT, indent=4))
    except:
        raise Exception()

def post_search_main(AUTH_TOKEN):
    try:
        PAGE_OFFSET = input("Enter page offset: ") if input("Do you want to add a page offset (y/n): ") == "y" else ""
        PAGE_SIZE = input("Enter page size: ") if input("Do you want to add a page size (y/n): ") == "y" else ""

        SEARCH_QUERY = input("Enter a search query: ") if input("Do you want to add a search query (y/n): ") == "y" else ""

        FILTER_YN = True if input("Do you want to add a filter (y/n)?: ") == "y" else False

        FILTERS = []
        #fieldName1 = "contentDefinitionId"
        #operator1="Equals"
        #value1="eb710e28-7c44-492e-91f9-8acd0cd9331c"
        #print(f"Enter field name: {fieldName1}")
        #print(f"Enter operator: {operator1}")
        #print(f"Enter value: {value1}")
        #filter1 = { 
        #        "fieldName": fieldName1,
        #        "operator": operator1,
        #        "values": value1
        #    }
        #FILTERS.append(filter1)
#
        #fieldName2 = "languageId"
        #value2="c66131cd-27fc-4f83-9b89-b57575ac0ed8"
        #print(f"Enter field name: {fieldName2}")
        #print(f"Enter operator: {operator1}")
        #print(f"Enter value: {value2}")
        #filter2 = { 
        #        "fieldName": fieldName2,
        #        "operator": operator1,
        #        "values": value2
        #    }
        #FILTERS.append(filter2)

        while FILTER_YN:
            FIELD_NAME = input("Enter field name: ")
            OPERATOR = input("Enter operator: ")
            VALUE = input("Enter value: ")

            FILTER = { 
                "fieldName": FIELD_NAME,
                "operator": OPERATOR,
                "value": VALUE
            }

            FILTERS.append(FILTER)

            if input("Do you want to add another field (y/n)?: ") != "y": 
                break

        if input("Do you want to sort the fields (y/n): ") == "y":
            SORT_FIELDS_NAME = input("Enter field name you want to sort by: ")
            SORT_FIELDS_ORDER = input("Enter the order you want to sort the field by (ascending/descending): ")
        else:
            SORT_FIELDS_NAME = SORT_FIELDS_ORDER = ""

        RESULT_FIELDS_YN = True if input("Do you want to enter the names of the fields you want to "\
                                      "include in your search results (y/n)?: ") == "y" else False

        RESULT_FIELDS = []
        if RESULT_FIELDS_YN: 
            while True:
                RESULT_FIELDS.append(get_search_result())

                if input("Do you want to add another search result field (y/n)?: ") != "y":
                    break

        IS_ADMIN = True if input("Do you want to search by admin or portal?: ") == "admin" else False

        print("Searching")
        CONTENT = post_search(AUTH_TOKEN, PAGE_OFFSET, PAGE_SIZE, SEARCH_QUERY, FILTERS, 
                              SORT_FIELDS_NAME, SORT_FIELDS_ORDER, RESULT_FIELDS, IS_ADMIN)
        print(json.dumps(CONTENT, indent=4))
    except:
        raise Exception()
    
if __name__ == "__main__":
    AUTH_TOKEN = "eyJraWQiOiJkSkpRa3ZxdWxDekpqZEFmWTR0UGwrSytyWldVTE5OTkR1YitYVnljaFNRPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlYjc1MzI5OC0wODAzLTQyYWEtOTFkMi01NjE3OGE0OTI4NWQiLCJjdXN0b206Y29udGFjdF9pZCI6ImU5YWIxNDFmLWMxMjgtNDE5Yi04YTQ3LWIzNTg1MTQwMzZkNyIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0yX1ZHRXhveTY0aSIsImNvZ25pdG86dXNlcm5hbWUiOiJlYjc1MzI5OC0wODAzLTQyYWEtOTFkMi01NjE3OGE0OTI4NWQiLCJnaXZlbl9uYW1lIjoiU2NvdHQiLCJvcmlnaW5fanRpIjoiODMwYjg0YzktNzQ5ZC00ZDkyLWJkNzQtYmJmMmM1Nzg0NWMyIiwiYXVkIjoiNWUybm92MXAzYTZxNHM1MHZjamo1ZXNqYjciLCJldmVudF9pZCI6ImUxY2VkNDQ2LTk4MDYtNDk0Yy05MGExLTkyNjk3Y2NlNjBhOCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjg5OTY5MTY4LCJleHAiOjE2ODk5NzI3NjgsImlhdCI6MTY4OTk2OTE2OCwiZmFtaWx5X25hbWUiOiJGYWx1ZGkiLCJqdGkiOiI2OGQyMTU0Ni0xZGJjLTQ2NGYtYjEzOC1kN2MzYmEyYjI2NmQiLCJlbWFpbCI6InNmYWx1ZGlAbm9tYWQtY21zLmNvbSJ9.S_BKlxyDZPg3oAJRB-pSMTJw8MIZAMaWnZ8NZGXOPFsLDD1BMxNGhQ2beQciUp7XBnC-L4rnSShUGhtLm83SfMJtv8-kna4xY_2B2r8_4whKygpe14kbjFOKkEhv1m6NlPuk8f7xYrQO9NVLtFG98X7H1FIlPpyHWByKLDQwzPgmTrrMufEPzhTWxqOKxcjeYZVPZtZ4ln20zbUpnlsCAIajKLqidbYHBk4gU8uCJyfTwoZRW66fFvdYPbtZI5iygElAn8JJUG7KjaLMbUeKQgngQs8ca0Xm5r2fqzTTdRaU6GbChNgdEErIE3I9EC9GnR_1_4iI4W7jxB7qdoHpkA"
    print(f"Enter authorization token: {AUTH_TOKEN}")

    while True:
        USER_INPUT = input("Do you want to search by id, search, or exit?\nEnter id, "\
                           "search, or exit for each option above respectivly: ")
        
        if USER_INPUT == "id":
            get_search_main(AUTH_TOKEN)

        elif USER_INPUT == "search":
            post_search_main(AUTH_TOKEN)

        elif USER_INPUT == "exit":
            break

        else:
            print("Invalid input")
