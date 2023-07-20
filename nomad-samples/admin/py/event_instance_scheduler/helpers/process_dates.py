import datetime

DAY_OF_WEEK = {
    'Sunday': {"SORT_ORDER": 7, "DAY_ID": '3fc3b5ec-88be-41c9-be8f-5199735f3603'},
    'Monday': {"SORT_ORDER": 1, "DAY_ID": '16bebfa8-65cc-451e-9744-d09d6c761e4a'},
    'Tuesday': {"SORT_ORDER": 2, "DAY_ID": '02782764-f644-43fa-89cb-40cd3a3c3ece'},
    'Wednesday': {"SORT_ORDER": 3, "DAY_ID": '1ca7cf91-5460-479f-84e5-e02cd51ca3f9'},
    'Thursday': {"SORT_ORDER": 4, "DAY_ID": '2691d391-e1b1-43b6-97e2-5fc6b39479ef'},
    'Friday': {"SORT_ORDER": 5, "DAY_ID": 'b1897795-37a3-4a6e-a702-93643fe2ecab'},
    'Saturday': {"SORT_ORDER": 6, "DAY_ID": 'cf4c7688-417f-48d4-8b9d-fc6e6132d34e'}
}

def process_dates(DATES, START_TIME):
    SORTED_DATES = sorted(DATES, key=lambda day: list(DAY_OF_WEEK.keys()).index(day))

    DATE_LIST = []

    for DATE in SORTED_DATES:
        date_map = {
            "description": DATE,
            "id": DAY_OF_WEEK[DATE]["DAY_ID"],
            "properties": {
                "abbreviation": DATE[:3],
                "name": DATE,
                "sortOrder": str(DAY_OF_WEEK[DATE]["SORT_ORDER"])
            }
        }
        DATE_LIST.append(date_map)

    DATETIME = datetime.datetime.now()

    start_idx = 1
    minimum = DAY_OF_WEEK[SORTED_DATES[0]]["SORT_ORDER"] - 1 - DATETIME.weekday()
    while minimum < 0:
        diff = DAY_OF_WEEK[SORTED_DATES[start_idx]]["SORT_ORDER"] - 1 - DATETIME.weekday()
        if diff > 0 or (diff == 0 and int(START_TIME[:2]) - DATETIME.hour >= 1):
            minimum = diff

    for DATE_IDX in range(start_idx, len(SORTED_DATES)):
        diff = DAY_OF_WEEK[SORTED_DATES[DATE_IDX]]["SORT_ORDER"] - 1 - DATETIME.weekday()
        if diff < minimum:
            if diff == 0 and int(START_TIME[:2]) - DATETIME.hour < 1:
                continue
            else:
                minimum = diff

    FIRST_DATE = datetime.timedelta(days=minimum)
    FIRST_DATE += DATETIME
    return {"startDate": FIRST_DATE.strftime("%Y-%m-%d"), "dateList": DATE_LIST}
