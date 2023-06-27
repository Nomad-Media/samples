const Lookup = (key, value) => ({
    key: key,
    value: value,
});

const DAY_OF_WEEK = {
    Sunday: Lookup("7", '3fc3b5ec-88be-41c9-be8f-5199735f3603'),
    Monday: Lookup("1", '16bebfa8-65cc-451e-9744-d09d6c761e4a'),
    Tuesday: Lookup("2", '02782764-f644-43fa-89cb-40cd3a3c3ece'),
    Wednesday: Lookup("3", '1ca7cf91-5460-479f-84e5-e02cd51ca3f9'),
    Thursday: Lookup("4", '2691d391-e1b1-43b6-97e2-5fc6b39479ef'),
    Friday: Lookup("5", 'b1897795-37a3-4a6e-a702-93643fe2ecab'),
    Saturday: Lookup("6", 'cf4c7688-417f-48d4-8b9d-fc6e6132d34e'),
};

export default function getCheckboxDates(DATE_CHECKBOX, startTime)
{
// goes through checkbox elements and 
    const DATE_LIST = [];

    for(let dateIdx = 0; dateIdx < DATE_CHECKBOX.length; ++dateIdx)
    {
        if (DATE_CHECKBOX[dateIdx].checked)
        {
            let dateCheckboxDay = DATE_CHECKBOX[dateIdx].value;
            let dateMap = {
                description: dateCheckboxDay,
                id: DAY_OF_WEEK[dateCheckboxDay].value,
                properties: {
                    abbreviation: dateCheckboxDay.substr(0, 3),
                    name: dateCheckboxDay,
                    sortOrder: DAY_OF_WEEK[dateCheckboxDay].key
                }
            };
            DATE_LIST.push(dateMap);
        }
    }

    /*  calculates the first day instance is going to be set to based of of first day of week
        choosen by user
    */ 
    const DATE = new Date();
    
    let startIdx = 1;
    let minimum = DAY_OF_WEEK[DATE_CHECKBOX[0].value].key - DATE.getDay();
    
    while (minimum < 0)
    {
        let diff = DAY_OF_WEEK[DATE_CHECKBOX[dateIdx].value].key - DATE.getDay();
        if (diff > 0 || (diff === 0 && parseInt(startTime.substr(0,2)) - DATE.getHours() >= 1))
        {
            minimum = diff;
        }
    }

    console.log(minimum);
    for(let dateIdx = startIdx; dateIdx < DATE_CHECKBOX.length; ++dateIdx)
    {
        if (DATE_CHECKBOX[dateIdx].checked)
        {
            let diff = DAY_OF_WEEK[DATE_CHECKBOX[dateIdx].value].key - DATE.getDay();
            if (diff < minimum)
            {
                if (diff === 0 && parseInt(startTime.substr(0,2)) - DATE.getHours() < 1)
                {
                    continue;
                }
                else
                {
                    minimum = diff;
                }
            }
        }
    }

    DATE.setDate(DATE.getDate() + minimum);

    return { startDate : DATE, dates: DATE_LIST }
}