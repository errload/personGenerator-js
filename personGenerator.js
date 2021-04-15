const personGenerator = {
    surnameJson: `{  
        "count": 15,
        "list": {
            "id_1": "Иванов",
            "id_2": "Смирнов",
            "id_3": "Кузнецов",
            "id_4": "Васильев",
            "id_5": "Петров",
            "id_6": "Михайлов",
            "id_7": "Новиков",
            "id_8": "Федоров",
            "id_9": "Кравцов",
            "id_10": "Николаев",
            "id_11": "Семёнов",
            "id_12": "Славин",
            "id_13": "Степанов",
            "id_14": "Павлов",
            "id_15": "Александров",
            "id_16": "Морозов"
        }
    }`,
    firstNameMaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Александр",
            "id_2": "Максим",
            "id_3": "Иван",
            "id_4": "Артем",
            "id_5": "Дмитрий",
            "id_6": "Никита",
            "id_7": "Михаил",
            "id_8": "Даниил",
            "id_9": "Егор",
            "id_10": "Андрей"
        }
    }`,
    firstNameFemaleJson: `{
        "count": 10,
        "list": {
            "id_1": "Валерия",
            "id_2": "Алёна",
            "id_3": "Виктория",
            "id_4": "Кристина",
            "id_5": "Марина",
            "id_6": "Лолина",
            "id_7": "Екатерина",
            "id_8": "Ксения",
            "id_9": "Ольга",
            "id_10": "Наталья"
        }
    }`,
    lastNameJson: `{
        "count": 10,
        "list": {
            "id_1": "Олегович",
            "id_2": "Николаевич",
            "id_3": "Петрович",
            "id_4": "Асланович",
            "id_5": "Дмитриевич",
            "id_6": "Александрович",
            "id_7": "Денисович",
            "id_8": "Темирканович",
            "id_9": "Владимирович",
            "id_10": "Вячеславович"
        }
    }`,
    professionMaleJson: `{
        "count": 10,
        "list": {
            "id_1": "солдат",
            "id_2": "шахтер",
            "id_3": "слесарь",
            "id_4": "сварщик",
            "id_5": "водитель",
            "id_6": "электрик",
            "id_7": "программист",
            "id_8": "парикмахер",
            "id_9": "грузчик",
            "id_10": "пилот"
        }
    }`,
    professionFemaleJson: `{
        "count": 10,
        "list": {
            "id_1": "бухгалтер",
            "id_2": "официант",
            "id_3": "мастер маникюра",
            "id_4": "продавец",
            "id_5": "парикмахер",
            "id_6": "модель",
            "id_7": "доярка",
            "id_8": "повар",
            "id_9": "врач",
            "id_10": "секретарь"
        }
    }`,

    GENDER_MALE: 'Мужчина',
    GENDER_FEMALE: 'Женщина',

    randomIntNumber: (max = 1, min = 0) => Math.floor(Math.random() * (max - min + 1) + min),
    // рандом пола (1 = true = мужской, 0 = false = женский)
    randomGender: Math.floor(Math.random() * 2),

    // рандом объекта с данными (фамилия, имя, отчество)
    randomValue: function (json) {
        const obj = JSON.parse(json);
        const prop = `id_${this.randomIntNumber(obj.count, 1)}`;  // this = personGenerator
        return obj.list[prop];
    },

    // генерация случайной даты рождения
    randomDate: function() {
        let randomDay = this.randomIntNumber(31, 1);
        let randomMonth = this.randomIntNumber(11, 0);
        let randomYear = this.randomIntNumber(2002, 1930);
        
        let month = [
            'января',
            'февраля',
            'марта',
            'апреля',
            'мая',
            'июня',
            'июля',
            'августа',
            'сентября',
            'октября',
            'ноября',
            'декабря'
        ];

        let d = new Date(randomYear, randomMonth, randomDay);

        for (let i = 0; i < month.length; i++) {
            if (d.getMonth() == i) randomMonth = month[i];
        }

        return `${d.getDate()} ${randomMonth} ${d.getFullYear()}г.`;
    },    

    // если randomGender = true, берем фамилию, иначе фамилию с окончанием 'а'
    randomSurname: function() {
        let surname = this.randomValue(this.surnameJson);
        return this.randomGender ? surname : surname + 'а';
    },

    // если randomGender = true, берем мужское имя, иначе женское
    randomFirstName: function() {
        let nameMale = this.randomValue(this.firstNameMaleJson);
        let nameFemale = this.randomValue(this.firstNameFemaleJson);
        return this.randomGender ? nameMale : nameFemale;
    },

    // если randomGender = true, берем отчество, иначе обрезаем на 2 символа
    //  и добавляем 'на' для женских имен
    randomLastName: function() {
        let lastName = this.randomValue(this.lastNameJson);
        if (this.randomGender) return lastName;
        else {
            lastName = lastName.slice(0, lastName.length - 2);
            return lastName + 'на';
        }
    },

    // если randomGender = true, берем мужские профессии, иначе женские
    randomProfession: function() {
        let professionMaleJson = this.randomValue(this.professionMaleJson);
        let professionFemaleJson = this.randomValue(this.professionFemaleJson);
        return this.randomGender ? professionMaleJson : professionFemaleJson;
    },

    getPerson: function () {
        this.person = {};
        this.person.gender = this.randomGender ? this.GENDER_MALE : this.GENDER_FEMALE; // пол
        this.person.surname = this.randomSurname(); // фамилия
        this.person.firstName = this.randomFirstName(); // имя
        this.person.lastName = this.randomLastName(); // отчество
        this.person.year = this.randomDate(); // дата рождения
        this.person.profession = this.randomProfession(); // профессия
        return this.person;
    }
};
