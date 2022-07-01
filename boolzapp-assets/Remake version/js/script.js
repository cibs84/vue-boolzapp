// Descrizione:
// Come detto questa mattina ogni giorno vi verranno assegnate una o più milestone che io correggerò il giorno seguente all'assegnazione in classe alle 9.30 del mattino.
// Oggi iniziamo con la milestone 1:
// Milestone 1
// Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse
// Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto
// Consigli utili:
// I pulsanti e le icone possono non funzionare (a parte l’invio del messaggio)

var app = new Vue (
    {
        el: '#root',
        data: {
            indexActiveContact: 0,
            inputTextNewMessage: "",
            inputContactsFilter: "",
            optionMsgIsVisible: false,
            indexClickedMessage: null,
            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
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
                    visible: true,
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
                    visible: true,
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
                    visible: true,
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
                },
            ]
        },
        methods: {
            setIndexActiveContact(indexSingleContact) {
                this.indexActiveContact = indexSingleContact;
            },
            createNewMessage(textMessage, statusMessage) {
                const newMessage = {
                    date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                    text: textMessage.trim(),
                    status: statusMessage
                }

                this.contacts[this.indexActiveContact].messages.push(newMessage);
            },
            sendNewMessage() {
                if (this.inputTextNewMessage !== "") {
                    this.createNewMessage(this.inputTextNewMessage, 'sent');
                    this.inputTextNewMessage = "";
                    
                    setTimeout(this.receivedNewMessage, 1000);
                }
            },
            receivedNewMessage() {
                this.createNewMessage('ok', 'received');
            },
            filterVisibleContacts() {
                this.contacts.forEach(contact => {
                    const inputContactsFilterLower = this.inputContactsFilter.toLowerCase();

                    const contactNameLower = contact.name.toLowerCase();

                    if (!contactNameLower.includes(inputContactsFilterLower)) {
                        contact.visible = false;
                    } else {
                        contact.visible = true;
                    }
                });
            },
            toggleShowOptionsMessage() {
                this.optionMsgIsVisible = !this.optionMsgIsVisible;
            },
            assignIndexClickedMessage(indexSingleMessage) {
                this.indexClickedMessage = indexSingleMessage;
                this.indexClickedContact = this.indexActiveContact;
            }
        }
    }
);