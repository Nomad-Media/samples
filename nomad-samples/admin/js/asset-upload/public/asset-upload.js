const START_FORM = document.getElementById("startForm");

START_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const FORM_DATA = new FormData();

    for (let input of START_FORM)
    {
        if (input.tagName === "INPUT" || input.tagName === "SELECT")
        {
            if (input.type === "file")
            {
                FORM_DATA.append(input.id, input.files[0]);
            }
            else
            {
                FORM_DATA.append(input.id, input.value);
            }
        }
        else if (input.type === "file")
        {
            console.log(input.id);
            FORM_DATA.append(input.id, input.files[0]);
        }
    }
    
    console.log(FORM_DATA);
    try
    {
        const RESPONSE = await fetch("/uploadAsset", { method: "POST", body: FORM_DATA });

        if (RESPONSE.ok)
        {
            const DATA = await RESPONSE.json();
            console.log(DATA);
        }
        else
        {
            const INFO = await RESPONSE.json();
            console.error(JSON.stringify(INFO, null, 4));
            console.error("HTTP-Error: " + RESPONSE.status);
        }
    }
    catch (error)
    {
        console.error(error);
    }
});