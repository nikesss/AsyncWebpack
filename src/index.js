
import '../styles/main.scss';
import "core-js/stable";
import "regenerator-runtime/runtime";
let f = document.getElementById('mark');
let status_url;
let array = [];
let status_animal;

document.getElementById('cat').addEventListener('click', () => {
    document.querySelector('#new_animal').classList.add('list_mark');
    f.style.opacity = '1';
    document.querySelector('.info').innerHTML = '';
    createPicture('https://api.thecatapi.com/v1/images/search');
    status_animal = 'cat';
});

document.getElementById('dog').addEventListener('click', () => {
    document.querySelector('#new_animal').classList.add('list_mark');
    f.style.opacity = '1';
    document.querySelector('.info').innerHTML = '';
    createPicture('https://api.thedogapi.com/v1/images/search');
    status_animal = "dog";
});

document.getElementById('like').addEventListener('click', () => {


    array.push({ status: 2, link: status_url });
    document.querySelector('.info').innerHTML = '';
    f.style.opacity = '1';
    if (status_animal == 'cat') {
        createPicture('https://api.thecatapi.com/v1/images/search');
    } else {
        createPicture('https://api.thedogapi.com/v1/images/search');
    }


    console.log(array);
})
document.getElementById('dislike').addEventListener('click', () => {


    array.push({ status: 1, link: status_url });
    document.querySelector('.info').innerHTML = '';
    f.style.opacity = '1';
    if (status_animal == 'cat') {
        createPicture('https://api.thecatapi.com/v1/images/search');
    } else {
        createPicture('https://api.thedogapi.com/v1/images/search');
    }

    console.log(array);
})

const getResource = async (url) => {
    try {
        const res = await fetch(url);
        return res.json();
    } catch (e) {
        console.log(`ERROR ${res.status}`)
    }

}

const getAnimal = async (url) => {
    try {
        const res = await getResource(url);
        return res;
    } catch (e) {
        console.log(`ERROR ${res.status}`)
    }

}
const createPicture = async (url) => {
    try {
        const data = await getAnimal(url);
        let img = document.createElement('img');
        img.setAttribute('class', 'main_img');
        img.src = data[0].url;
        status_url = data[0].url;
        let p = document.createElement('p');
        p.setAttribute('class', 'main_info');
        document.querySelector('.info').appendChild(img);
        if (data[0].breeds[0]) {

            p.innerHTML = `Name: ${data[0].breeds[0].name}, life-span: ${data[0].breeds[0].life_span}`
            document.querySelector('.info').appendChild(p);
        } else {
            p.innerHTML = `little information`;
            document.querySelector('.info').appendChild(p);
        }
    } catch (e) {
        console.log(`ERROR IN CREATING`)
    }

}
document.getElementById('end_mark').addEventListener('click', () => {
    f.style.opacity = '0';
    document.querySelector('.info').innerHTML = '';
    document.querySelector('.list_mark').classList.remove('list_mark');
    document.querySelector('#like_mark').innerHTML = '';
    document.querySelector('#dislike_mark').innerHTML = '';

    for (let i = 0; i < array.length; i++) {
        let li = document.createElement('li');
        li.style.listStyle = 'none';
        if (array[i].status == 2) {
            let img = document.createElement('img');
            img.src = array[i].link;
            li.append(img);

            document.querySelector('#like_mark').appendChild(li);
        } else {
            let img = document.createElement('img');
            img.src = array[i].link;
            li.append(img);

            document.querySelector('#dislike_mark').appendChild(li);
        }
    }
})