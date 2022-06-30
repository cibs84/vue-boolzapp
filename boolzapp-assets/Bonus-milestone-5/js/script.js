// Descrizione:
// Milestone 5
// Cancella messaggio: cliccando sul messaggio appare un menu a tendina che permette di cancellare il messaggio selezionato
// Visualizzazione ora e ultimo messaggio inviato/ricevuto nella lista dei contatti

var app = new Vue (
    {
        el: '#root',
        data: {
            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    shownByFilter: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Ricordati di dargli da mangiare',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            text: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: false,
                    shownByFilter: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            text: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            text: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: false,
                    shownByFilter: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            text: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            text: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            text: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Luisa',
                    avatar: '_4',
                    visible: false,
                    shownByFilter: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                }
            ],
            inputMessage: '',
            newMessage: {
                date: "",
                text: "",
                status: 'sent'
            },
            indexVisibleContact: null,
            inputFilterContacts: "",
            indexClickedMessage: null,
            showMessage: false
        },
        methods: {
            setActiveContact(index) {
                this.resetContactVisibleStatus();
                this.contacts[index].visible = true;
            },
            resetContactVisibleStatus() {
                this.contacts.forEach(singleContact => {
                    singleContact.visible = false;
                });
            },
            checkIndexVisibleContact() {
                // Per ogni contatto:
                this.contacts.forEach((singleContact, indexSingleContact) => {
                    // SE la proprietà visible è true ALLORA assegno il suo index a indexVisibleContact
                    if (singleContact.visible) {
                        this.indexVisibleContact = indexSingleContact;
                    }
                });
            },
            getDate() {
                return dayjs().format("DD/MM/YYYY HH:mm:ss");
            },
            createNewMessage() {
                // Crea un nuovo messaggio solo SE nel campo di input è stato scritto qualcosa che non siano solo spazi bianchi 
                if (this.newMessage.text.trim() !== "") {
                    // Prendo l'indice del contatto attualmente visibile per poi selezionare l'esatto array dove pushare
                    this.checkIndexVisibleContact();
                    // Aggiorno la data al momento esatto della creazione del nuovo messaggio
                    this.newMessage.date = this.getDate();
                    // Pusho il nuovo oggetto messaggio nell'array del contatto attivo al momento dell'invio
                    this.contacts[this.indexVisibleContact].messages.push({...this.newMessage});
                    // Resetto l'input per l'inserimento di un nuovo messaggio
                    this.newMessage.text = "";
                    // SE il messaggio è stato inviato da noi, dopo 1 sec. creo un nuovo messaggio di risposta
                    if (this.newMessage.status === "sent") {
                        setTimeout(this.createNewReplyMessage, 1000);
                    // ALTRIMENTI resetto lo stato dell'oggetto newMessage su 'received' per prepararlo ad un nuovo invio da parte dell'utente
                    } else {
                        this.newMessage.status = "sent";
                    }
                }
            },
            // Crea uun messaggio di risposta automatico dopo l'invio di un nostro messaggio
            createNewReplyMessage() {
                this.newMessage.status = "received";
                this.newMessage.text = "ok";
                this.createNewMessage();
            },
            showFilteredContacts() {
                // Per ogni contatto:
                this.contacts.forEach(thisContact => {
                    // Normalizzo le stringhe da confrontare rendendo tutte le lettere minuscole
                    const inputFilterLower = this.inputFilterContacts.toLowerCase();
                    const contactNameLower = thisContact.name.toLowerCase();
                    // SE la stringa del filtro è presente nella proprietà name del contatto ALLORA imposta la sua proprietà 'shownByFilter' su true
                    if (contactNameLower.includes(inputFilterLower)) {
                        thisContact.shownByFilter = true;
                    // ALTRIMENTI la imposteremo su false
                    } else {
                        thisContact.shownByFilter = false;
                    }
                });
            },
            setClickedMessage(indexSingleMsg) {
                this.indexClickedMessage = indexSingleMsg;
                this.showMessage = this.indexClickedMessage === indexSingleMsg;
                // this.showMessage = !this.showMessage;
            }
        }
    }
);