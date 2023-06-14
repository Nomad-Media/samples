import requests

def refresh_token(refreshToken):
    api_url = "https://app-api.dev-05.demos.media/api/account/refresh-token"

    headers = {
        "Content-Type": "application/json"
    }
    
    try:
        api_response = requests.post(api_url, headers=headers, data=refreshToken, timeout=5)
        return api_response

    except requests.exceptions.HTTPError as errh:
        raise Exception("HTTP Error " + errh.args[0])
    except requests.exceptions.ReadTimeout as errt:
        raise Exception("Timeout")
    except requests.exceptions.ConnectionError as errcon:
        raise ConnectionError("Connection Error")
    except requests.exceptions.RequestException as errex:
        raise Exception("Exeption request")
    
    return api_response
