export default function getCheckboxedFields(CHECKBOX_ELEMS)
{
    const FIELDS = [];
    for(let idx = 0; idx < CHECKBOX_ELEMS.length; ++idx)
    {
        if (CHECKBOX_ELEMS[idx].checked)
        {
            let val = CHECKBOX_ELEMS[idx].value
            let map = {};
            if (val != "image" || val != "movieFile")
            {
                map = {
                    name: val
                }
            }
            else
            {
                map = {
                    name: val,
                    SearchResultFields: [
                        {
                            name: "fullUrl",
                        },
                    ],
                }
            }

            FIELDS.push(map);
        }
    }

    return FIELDS;
}