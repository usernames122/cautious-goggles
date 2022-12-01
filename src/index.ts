import fetch from "node-fetch";
import { config } from "dotenv";
import { decode, Decoder, number, string, array } from "typescript-json-decoder";
config(); // initialize environment variables(.env) to access .ROBLOSECURITY

const token = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_89FF92A5C1147D1EBB0F9ED5A5C630C64B5B6AC750E328497A3BA76F4546120AC9CD4266F944879764DDDD1E2C9892EFE9CFFCF5A0853C848E6597B16370A19D085C8376FDFE8105C9A4F0CE92AE10842B9EA620BC78D68C2EFF9AC27BE7BA53BBD7230DCD454909681B746DFD69EB8E8B137AD6C4CA1B0BC1E2771958F5DC8ACEC3B029876EA7C14C97BFCE518CB8435127995192E73DB47567662D3A00E55FD8AE110FD5261C00F6F4FE2B0ED608C8567CDEBF5CB7801C62EF196971775367B23376DD9D38D865AF02AC8B9431FEC030B49639675CBCC790C7A56D302A07B35F90494235EC30A2D924BB70C109B5937D0A63C5AA78DA5E6360AAD2CE6FF7BDE18FA026ABD5309BEB193E08C88AF478AC330AA1B5F563492F49318DCE0AA57E75A01781F1621EEAEE2DAB5E8AF39371415ECD50AB197E683BB32DF23ABA705A35F604EB7EABB408A09FDD85A6DC99B5FBBA65B2A2B74878EB8B987658286AF95CE43ECB16A0F5301FA5128206216163E382A042D10082FB925DC47719204B8BF750FA373879B5F3BA7C59376EBBC842C92B0B96"; // .ROBLOSECURITY\
var postData = {};
const sleep = async (milliseconds) => {
    await new Promise(resolve => {
        return setTimeout(resolve, milliseconds)
    });
};
async function getNextYear() {
    const date = new Date(); // make new date object
    const currentYear = date.getUTCFullYear(); // get the current UTC year.
    const nextYear = currentYear + 1; // add 1 to the current UTC year, as this will be our next year

    return nextYear;
}

async function getCsrfToken() {
    // here's the process:
    // send in a friend request to a random user, of which will fail. Grab x-csrf-token
    // from the response, and return.

    try {
        const response = await fetch(
            "https://auth.roblox.com/v2/logout",
            {
                method: "POST",
                headers: {
                    Cookie: `.ROBLOSECURITY=roblosecurity here`,
                },
            }
        );
        console.log(response.status);
        if (response.status === 403) {
            console.log(response.headers.get("x-csrf-token"));
            return response.headers.get("x-csrf-token"); // get x-csrf-token from headers
        }
    } catch (e) {
        console.log(`Failed to get x-csrf-token because: ${e.message}`);
    }
    return "cannot get token";
}

async function setAboutPage() {
    try {
        const csrfToken = await getCsrfToken(); // get x-csrf-token
        const timeLeft = await getTimeUntilNewYears(); // get time until new years
        const resposnse = await fetch(
            "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single",
          );
       postData = await resposnse.json();
        // send request
        const response = await fetch(
            "https://accountinformation.roblox.com/v1/description",
            {
                method: "POST",
                headers: {
                    Cookie: `.ROBLOSECURITY=roblosecurity here`,
                    "Content-Type": "application/json",
                    "x-csrf-token": csrfToken,
                },
                body: JSON.stringify({
                    description: `I'm the Crese Car! I will have an random joke every time you refresh!
                    `.concat(postData.joke),
                }),
            }
        );

       if (!(response.status == 429)) {
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
       }else {
        console.log("Too many requests, waiting.")
        await sleep(30000);
       }

        console.log("set about page");

        const data = await response.json();
        return data;
    } catch (e) {
        console.log(`failed to set about page because: ${e.message}`);
    }}
async function getTimeUntilNewYears() {
    const nextYear = await getNextYear(); // get the nextyear value
    const nextYearTimestamp = `${nextYear}-01-01T12:00:00.00Z`; // this will be the timestamp for when next year comes.

    const nextYearDate = new Date(nextYearTimestamp);
    const currentDate = new Date();

    const timeleft = nextYearDate.getTime() - currentDate.getTime();

    const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    return {
        days,
        hours,
        minutes,
        seconds,
    };
}
// next getNextYear function

getTimeUntilNewYears().then((timeLeft) => {
    console.log(timeLeft);
});
getCsrfToken().then((csrf) => {
    console.log(csrf);
    console.log(typeof(csrf));
});
setAboutPage();