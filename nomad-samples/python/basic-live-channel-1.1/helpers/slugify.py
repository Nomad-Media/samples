from libraries import re, unicodedata

'''
 * Slugify
 *
 * @param {string} text
 *
 * @returns Slugify string of text
'''
def slugify(text):
    if (not text or len(text.strip()) == 0):
        return ""
    else:
        text = str(text)
        text = unicodedata.normalize("NFD", text)
        text = re.sub(r'[\u0300-\u036f]', '', text)
        text = text.lower()
        text = text.strip()
        text = re.sub(r'\s+', '-', text)
        text = re.sub(r'[^\w-]+', '', text)
        text = re.sub(r'--+', '-', text)
        return text

