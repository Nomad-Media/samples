from libraries import requests, json

def login(secret):
        
    api_url = "https://app-api.dev-05.demos.media/api/account/login"

    headers = {
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(api_url, headers=headers, data=json.dumps(secret), timeout=5)
        return response
    except requests.exceptions.HTTPError as errh:
        raise Exception("HTTP Error " + errh.args[0])
    except requests.exceptions.ReadTimeout as errt:
        raise Exception("Timeout")
    except requests.exceptions.ConnectionError as errcon:
        raise ConnectionError("Connection Error")
    except requests.exceptions.RequestException as errex:
        raise Exception("Exeption request")
            
   
