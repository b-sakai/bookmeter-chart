# Usae: python scraping.py
# Description: Scraping data from bookmeter.com and save it as json file

import json
import requests
from bs4 import BeautifulSoup
from datetime import datetime

def get_data_from_bookmeter(aurl):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}

    site = requests.get(aurl, headers=headers)
    data = BeautifulSoup(site.content, 'html.parser')

    bookTagList = data.findAll(class_="detail__title")
    bookList = [tag.text for tag in bookTagList]
    print(bookList)    
    pageTagList = data.findAll(class_="detail__page")
    pageList = [tag.text for tag in pageTagList]
    print(pageList)
    dateTagList = data.findAll(class_="detail__date")    
    dateList = [tag.text if tag.text != "日付不明" else "2010/01/01" for tag in dateTagList]
    print(dateList)    
    return {"pages": pageList, "dates": dateList, "books": bookList}

def get_all_data(urlBase):
    allData = {"pages": [], "dates": [], "books": []}
    i = 0
    while True:
        i += 1
        if i == 1:
            print(urlBase)
            data = get_data_from_bookmeter(urlBase)
        else:
            url = urlBase + "&page=" + str(i)
            print(url)
            data = get_data_from_bookmeter(url)
            print(data["dates"])
        allData["pages"] += data["pages"]
        allData["dates"] += data["dates"]
        allData["books"] += data["books"]        
        if len(data["pages"]) == 0 or len(data["dates"]) == 0 or len(data["books"]) == 0:
            break
    return allData

if __name__ == '__main__':
    urlBase = "https://bookmeter.com/users/780800/books/read?display_type=list"
    allData = get_all_data(urlBase)
    allData["pages"].reverse()
    allData["dates"].reverse()
    allData["books"].reverse()    

    # JSON形式で出力
    with open("book_data.json", "w") as json_file:
        json.dump(allData, json_file)
