let stage = 'dev';
const host = stage === 'dev' ? 'http://localhost:5000' : 'https://prussian-and-co.vercel.app';


const localStorageSession = localStorage.getItem('sessionId');



//if there is no local session then user will be redirected to the host page
if(!localStorageSession) {
    window.location.replace(host);
    return;
};


async function getSession(){

    const response = await axios.get(`${host}/checkout/session/${localStorageSession}`)

    if(response.data.success) { //if the localsession is a success
        console.log('Clearing local storage')

        localStorage.clear();  //then clear local storage
    } else {
        window.location.replace(host);  //else redirect to home page
    } 
};

document.addEventListener("DOMContentLoaded", () => {
    getSession();
});


getSession();