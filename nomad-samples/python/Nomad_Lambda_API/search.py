from libraries import *

def search(query, token, url):

    headers = {
        "Authorization": "Bearer " +  token,
        "Content-Type": "application/json"
    }

    try:
        api_response = requests.post(url, headers=headers, data=json.dumps(query), timeout=5)
        return api_response
    except requests.exceptions.HTTPError as errh:
        raise Exception("HTTP Error " + errh.args[0])
    except requests.exceptions.ReadTimeout as errt:
        raise Exception("Timeout")
    except requests.exceptions.ConnectionError as errcon:
        raise ConnectionError("Connection Error")
    except requests.exceptions.RequestException as errex:
        raise Exception("Exeption request")
