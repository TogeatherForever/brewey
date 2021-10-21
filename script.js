class BreweryModel{
    constructor(name,address,url,phoneno,type)
    {
        this.name = name;
        this.address = address;
        this.url = url
        this.phoneno = phoneno;
        this.type = type
    }
}

let brewery = [];

let cardContainer = document.getElementById("container");
cardContainer.classList.add("cardsContainer")
let breweryApi = "https://api.openbrewerydb.org/breweries";
fetchApi()
async function fetchApi()
{
    let breweryData = [];
    let response = await fetch(breweryApi)
    if(response.status!==200)
    {
        return;
    }
    breweryData = await response.json();
    breweryData.forEach(element => {
        if(element["website_url"]===null)
        {
            element["website_url"] = "No URL found"
        }
        if(element["name"] === null)
        {
            element["name"] = "No Name found"
        }
        if(element["address_2"] === null)
        {
            element["address_2"] = "No Address found"
        }
        if(element["phone"] === null)
        {
            element["phone"] = "No Contact Number found"
        }
        if(element["brewery_type"] === null)
        {
            element["brewery_type"] = "No Brewery Type found"
        }
        brewery.push(new BreweryModel("Name: "+element["name"],"Address: "+element["address_2"],element["website_url"]
                        ,"Phone: "+element["phone"],"Type: "+element["brewery_type"]));
    });

    ShowData()
}

function ShowData()
{
    for(item of brewery)
    {
        let cards = document.createElement("div");
        cards.classList.add("cards")
        cards.innerHTML = `<strong>${item.name}</strong><p>${item.type}</p><p>${item.address}</p><a href = ${item.url}>${item.url}</a><p>${item.phoneno}</p>`
        cardContainer.appendChild(cards)
    }
}