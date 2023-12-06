const yargs = require('yargs');
const contacts = require('./contacts');

yargs.command({
    command: 'add',
    describe: 'Menambahkan kontak baru',
    builder: {
        name: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string',
        },
        email: {
            describe: 'Email',
            demandOption: false,
            type: 'string',
        },
        noHP: {
            describe: 'Nomor Handphone',
            demandOption: true,
            type: 'string',
        }
    },

    handler(argv) {

        contacts.simpanContact(argv.name, argv.email, argv.noHP)
        //  const  contact = {
        //     name: argv.name,
        //     email: argv.email,
        //     noHP: argv.noHP,
        //  }   
        //  console.log(contact);
    }
}).demandCommand();

// menampilkan nama semua kontak
yargs.command({
    command: 'list',
    describe: 'Menampilkan semua nama dan no hp',
    handler(){
        contacts.listContact();
    },
})

yargs.parse();























// const contacts = require ('./contacts');

// const main = async () => {
//     const name = await contacts.pertanyaans('Nama Lengkap : ')
//     const email = await contacts.pertanyaans('Email : ')
//     const noHP = await contacts.pertanyaans('Nomor HP : ')

//     contacts.simpanContact(name, email, noHP);
// }

// main();