window.onload = winLoad;

function winLoad(){
    surnameOutput = document.querySelector('#surnameOutput'); // фамилия
    firstNameOutput = document.querySelector('#firstNameOutput'); // имя
    genderOutput = document.querySelector('#genderOutput'); // пол
    birthYearOutput = document.querySelector('#birthYearOutput'); // год рождения
    lastNameOutput = document.querySelector('#lastNameOutput'); // отчество
    professionOutput = document.querySelector('#professionOutput'); // профессия

    const initPerson = personGenerator.getPerson();

    surnameOutput.textContent = initPerson.surname; // фамилия
    firstNameOutput.textContent = initPerson.firstName; // имя
    lastNameOutput.textContent = initPerson.lastName; // отчество
    genderOutput.textContent = initPerson.gender; // пол
    birthYearOutput.textContent = initPerson.year; // год рождения
    professionOutput.textContent = initPerson.profession; // профессия
};

// запуск personGenerator при клике на кнопку Обновить
document.querySelector('#btnRefresh').addEventListener('click', winLoad);
// Очищаем форму
document.querySelector('#btnClear').addEventListener('click', () => {
    surnameOutput.textContent = 'Фамилия'; // фамилия
    firstNameOutput.textContent = 'Имя'; // имя
    lastNameOutput.textContent = 'Отчество'; // отчество
    genderOutput.textContent = 'пол'; // пол
    birthYearOutput.textContent = 'дата рождения'; // год рождения
    professionOutput.textContent = 'профессия'; // профессия
});