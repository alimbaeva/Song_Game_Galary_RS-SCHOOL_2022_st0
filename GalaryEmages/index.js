
const containerIMG = document.querySelector('.containerIMG');
const input = document.querySelector('input');
const button = document.querySelector('button');
input.focus();


async function fetchHandler(inputValue) {
    inVal = inputValue === undefined ? 'spring' : inputValue;
    const url = `https://api.unsplash.com/search/photos?query=${inVal}&per_page=12&orientation=landscape&client_id=DK5E9lgR-nCDarfQ588wsBPb_TsnneE-ZqAVDzbsXvQ`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        data.results.forEach((el) => {
            let hhtp = (el.urls.regular);
            createIMG(hhtp);
        });
    } catch (error) {
        console.log(error)
    }
}

function createIMG(hhtp) {
    const div = document.createElement('div');
    const img = document.createElement('img');
    div.setAttribute('class', 'img')
    img.setAttribute('src', hhtp)
    img.setAttribute('alt', 'foto')
    div.appendChild(img)
    containerIMG.append(div)
}


// button.addEventListener('click', () => {
//     let i = document.querySelectorAll('main .containerIMG .img');
//     i.forEach((el) => {
//         el.remove('.img')
//     })
//     inputValue = input.value;
//     fetchHandler(inputValue)
//     console.log(input.value)

// })

document.addEventListener('keyup', event => {
    if (event.code === 'Enter') {
        let i = document.querySelectorAll('main .containerIMG .img');
        i.forEach((el) => {
            el.remove('.img')
        })
        inputValue = input.value;
        fetchHandler(inputValue)
        console.log(input.value)
    };
});

button.addEventListener('click', () => {
    input.value = '';
    input.focus();
})
fetchHandler();