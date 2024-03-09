import {useState} from 'react';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Link} from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/spinner';

import './searchChar.scss';

const setContent = (process, data) => {
    switch(process) {
        case 'waiting':
            return null;
            break;
        case 'loading':
            return <Spinner/>;
            break;
        case 'confirmed':
            return <div className="char__search-wrapper">
                        <div className="char__search-success">There is! Visit {data[0].name} page?</div>
                        <Link to={`/characters/${data[0].id}`} className="button button__secondary">
                            <div className="inner">To page</div>
                        </Link>
                    </div>;
            break;
        case 'error':
            return <div className="char__search-critical-error"><ErrorMessage /></div>;
            break;
        default:
            throw new Error('Unexpected procces state');
    }
}

const CharSearchForm = () => {
    const [char, setChar] = useState(null);
    const {loading, error, getCharacterByName, clearError, process, setProcess} = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = (name) => {
        clearError();

        getCharacterByName(name)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    }

    return (
        <div className="char__search-form">
            <Formik
                initialValues = {{
                    charName: ''
                }}
                validationSchema = {Yup.object({
                    charName: Yup.string().required('This field is required')
                })}
                onSubmit = { ({charName}) => {
                    updateChar(charName);
                }}
            >
                <Form>
                    <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <Field 
                            id="charName" 
                            name='charName' 
                            type='text' 
                            placeholder="Enter name"/>
                        <button 
                            type='submit' 
                            className="button button__main"
                            disabled={loading}>
                            <div className="inner">find</div>
                        </button>
                    </div>
                    <FormikErrorMessage component="div" className="char__search-error" name="charName" />
                </Form>
            </Formik>
            {setContent(process, char)}
        </div>
    )
}

export default CharSearchForm;