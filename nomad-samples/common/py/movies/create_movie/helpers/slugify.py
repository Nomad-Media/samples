import re

def slugify(text):
    text = text.lower()
    return re.sub(r'[\W_]+', '-', text)