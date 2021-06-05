const notes = [];
const db = firebase.firestore().collection("Notes");
const div = document.getElementById("result");
let searchQuery;

window.onload = () => {
    getNotes();
};

async function getNotes() {
    const response = await db.get();
    notes.splice(0, notes.length);
    response.forEach( note => {
        const data = note.data();
        notes.push(
            new Note(data.book, data.author, data.page, data.title, data.subTitle, data.tags, data.paragraph)
        );
    });
}

function addNote() {
    const note = new Note(Get(["Book"])[0], 
                        Get(["Author"])[0], 
                        Get(["Page"])[0], 
                        Get(["Title"])[0], 
                        Get(["SubTitle"])[0], 
                        Get(["Tags"])[0], 
                        Get(["Paragraph"])[0])

    const docID = "Notes_" + notes.length;
    const doc = db.doc(docID).set({
        book: note.book,
        author: note.author,
        page: note.page,
        title: note.title,
        subTitle: note.subTitle,
        tags: note.tags.toLowerCase(),
        paragraph: note.paragraph
    });

    getNotes();
    SetElements([
        {
            id: "Book",
            txt: ""
        },
        {
            id: "Author",
            txt: "" 
        },
        {
            id: "Page",
            txt:  ""
        },
        {
            id: "Title",
            txt:  ""
        },
        {
            id: "SubTitle",
            txt:  ""
        },
        {
            id: "Tags",
            txt:  ""
        },
        {
            id: "Paragraph",
            txt:  ""
        }
    ]);
    console.log("Note added");
}

function Get(ids) {
    const values = [];
    
    ids.forEach(element => {
        const el = document.getElementById(element);
        values.push(el.value);
    });

    return values;
}

function SetElements(elements) {

    elements.forEach( el => {
        const parent = document.getElementById(el.id);

        if (parent) {
            parent.placeholder = el.txt;
        }
    });
    
}

async function search(option) {
    const query = await db.where(option.field, ">=", option.search).get();
    console.log("searching");
    if (!query.empty) {
        query.docs.forEach( doc => {
            addResult(doc.data());
        });
    } else {
        console.log("Empty query");
    }
}

function searchNote() {
    document.getElementById("result").innerHTML = "";
    const fields = ["book", "author", "page", "title", "subTitle", "tags", "paragraph"];
    const strings = Get(["search-Book", "search-Author", "search-Page", "search-Title", "search-SubTitle", "search-Tags", "search-Paragraph"]);
    for (let i = 0; i < strings.length; i++) {
        const query = {
            field: fields[i],
            search: i == 5 ? strings[i].toLowerCase() : strings[i]
        };

        if (strings[i]) {
            search(query);
        }
    }
}

function addResult(data) {
    console.log(data);
    const parent = document.createElement("div");

    const bookEl = document.createElement("h2");
    const authorEl = document.createElement("h4");
    const pageEl = document.createElement("h5");
    const titleEl = document.createElement("h3");
    const subTitleEl = document.createElement("h4");
    const tagsEl = document.createElement("h5");
    const paragraphEl = document.createElement("p");

    bookEl.innerHTML      =  "Book: "      +  data.book;
    authorEl.innerHTML    =  "Author: "    +  data.author;
    pageEl.innerHTML      =  "Pages: "     +  data.page;
    titleEl.innerHTML     =  "Title: "     +  data.title;
    subTitleEl.innerHTML  =  "Sub-Title: " +  data.subTitle;
    tagsEl.innerHTML      =  "Tags: "      +  data.tags;
    paragraphEl.innerHTML =  "Paragraph: " +  data.paragraph;

    parent.appendChild(bookEl);
    parent.appendChild(authorEl);
    parent.appendChild(pageEl);
    parent.appendChild(titleEl);
    parent.appendChild(subTitleEl);
    parent.appendChild(tagsEl);
    parent.appendChild(paragraphEl);

    div.appendChild(parent);
}