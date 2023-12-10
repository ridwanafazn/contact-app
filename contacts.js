const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator')

// check directory
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
}

// check file
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8')
}

const loadContact = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer);

    return contacts;
}

const simpanContact = (name, email, noHP) => {
    const contact = { name, email, noHP };
    // const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    // const contacts = JSON.parse(fileBuffer);

    const contacts = loadContact();
    // cek duplikat
    const duplikat = contacts.find((contact) => contact.name === name);
    if (duplikat) {
        console.log(
            chalk.red.inverse.bold('Nama sudah terdaftar!')
        )
        return false;
    }
    // cek email
    if (email) {
        if (!validator.isEmail(email)) {
            console.log(
                chalk.red.inverse.bold('Email tidak valid!')
            )
            return false;
        }
    }

    // cek nomor hp
    if (!validator.isMobilePhone(noHP, 'id-ID')) {
        console.log(
            chalk.red.inverse.bold('Nomor HP tidak valid!')
        )
        return false;
    }

    contacts.push(contact);

    console.log(contacts);
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

    console.log(
        chalk.green.inverse.bold('---- ty bang!')
    )

    // rl.close();
};

const listContact = () => {
    const contacts = loadContact();
    console.log(
        chalk.cyan.inverse.bold(' Daftar Kontak : ')
    );

    contacts.forEach((contact, i) => {
        console.log(`${i + 1}. ${contact.name} - ${contact.noHP}`);
    })
};

const detailContact = (name) => {
    const contacts = loadContact();
    const contact = contacts.find(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (!contact) {
        console.log(
            chalk.red.inverse.bold(`${name} tidak ditemukan!`)
        );
        return false;
    }
    console.log(chalk.cyan.inverse.bold(contact.name));
    console.log(contact.noHP);
    if(contact.email){
        console.log(contact.email);
    }
};

const deleteContact = (name) => {
    const contacts = loadContact();
    const newContacts = contacts.filter(
        (contact) => contact.name.toLowerCase() !== name.toLowerCase()
    );

    if (contacts.length === newContacts.length) {
        console.log(chalk.red.inverse.bold(`${name} tidak ditemukan!`));
        return false;
    };

    fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts));

    console.log(
        chalk.green.inverse.bold(`data contact ${name} berhasil dihapus`)
    )
};




module.exports = { simpanContact, listContact, detailContact, deleteContact };