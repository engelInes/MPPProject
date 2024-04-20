import {Book} from '../../../models/Book';
import {BookFormType} from '../../../types/BookFormProps.types';
import {FormEntry} from '../Form Entry/FormEntry';

import './BookForm.css';

type FormEntryType = {
    label: string;
    ref: React.RefObject<HTMLInputElement>;
    placeHolder: string;
    defaultValue: string;
    disabled: boolean;
};

function setFormEntriesForBook(
    formEntries: FormEntryType[],
    givenBook: Book | undefined,
) {
    if (givenBook !== undefined) {
        formEntries[0].disabled = true;

        formEntries[0].defaultValue = givenBook.id.toString();
        formEntries[1].defaultValue = givenBook.title;
        formEntries[2].defaultValue = givenBook.author;
        formEntries[3].defaultValue = givenBook.genre;
        formEntries[4].defaultValue = givenBook.pictureUrl;
    }

    return formEntries;
}

function createFormEntries(props: BookFormType) {
    let formEntries = [
        {
            label: 'ID',
            ref: props.idInput,
            placeHolder: 'ID',
            defaultValue: '',
            disabled: false,
        },
        {
            label: 'Title',
            ref: props.titleInput,
            placeHolder: 'Title',
            defaultValue: '',
            disabled: false,
        },
        {
            label: 'Author',
            ref: props.authorInput,
            placeHolder: 'Author',
            defaultValue: '',
            disabled: false,
        },
        {
            label: 'Genre',
            ref: props.genreInput,
            placeHolder: 'Genre',
            defaultValue: '',
            disabled: false,
        },
        {
            label: 'URL',
            ref: props.urlInput,
            placeHolder: 'URL',
            defaultValue: '',
            disabled: false,
        },
    ];

    formEntries = setFormEntriesForBook(formEntries, props.givenBook);

    return formEntries;
}

export function BookForm(props: BookFormType) {
    const formEntries = createFormEntries(props);

    return (
        <div className='form-div' data-testid='book-form'>
            <form className='book-form'>
                {formEntries.map((entry) => (
                    <FormEntry
                        key={entry.label}
                        ref={entry.ref}
                        label={entry.placeHolder}
                        placeHolder={entry.placeHolder}
                        defaultValue={entry.defaultValue}
                        disabled={entry.disabled}
                    />
                ))}
            </form>
        </div>
    );
}
