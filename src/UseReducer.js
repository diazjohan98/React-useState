import React from "react";


const SECURITY_CODE = 'paradigma';

function UseReducer({ name }) {

    const [state, dispatch] = React.useReducer(reducer, initialState);

    const onConfirm = () => dispatch({ type: actionTypes.confirm});
    const onError = () => dispatch({ type: actionTypes.error});
    const onCheck = () => dispatch({ type: actionTypes.check});
    const onDelete = ()=> dispatch({ type: actionTypes.delete});
    const onReset = () => dispatch({ type: actionTypes.reset});

    const onWrite = (newValue)=>{
        dispatch({ type: actionTypes.write, payload: newValue})
    }

    React.useEffect(() => {
        console.log("empezando el efecto");

        if (!!state.loading) {
            setTimeout(() => {
                console.log("Haciendo la validacion");

                if (state.value === SECURITY_CODE) {
                    onConfirm();

                } else {
                    onError();
                }

                console.log("Terminando la validacion");
            }, 3000);
        }

        console.log("terminando el efecto");
    }, [state.loading]);

    if (!state.deleted && !state.confirmed) {
        return (
            <div>
                <h2>Eliminar {name}</h2>

                <p>Por favor, escribe el codigo de seguirdad</p>

                {(state.error && !state.loading) && (
                    <p>Error: el codigo es incorrecto</p>
                )}

                {state.loading && (
                    <p>Cargando ...</p>
                )}
                <input
                    placeholder="codigo de seguridad"
                    value={state.value}
                    onChange={(event) => {
                        // dispatch({ type: actionTypes.write, payload: event.target.value });
                        onWrite (event.target.value);
                    }
                    } />
                <button
                    onClick={onCheck}>
                    Comprobar
                </button>

            </div>
        );
    } else if (!!state.confirmed && !state.deleted) {
        return (
            <React.Fragment>
                <p>Pedimos confirmación. ¿Estás seguro?</p>

                <button onClick={onDelete}>
                    Si, Eliminar
                </button>
                <button onClick={onReset}>
                    No, volver
                </button>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <p>Eliminado con exito</p>
                <button onClick={onReset}>
                    Resetear, volver atrás
                </button>
            </React.Fragment>
        )
    }
}


const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
}

const actionTypes = {
    confirm: 'CONFIRM',
    error: 'ERROR',
    delete: 'DELETE',
    write: 'WRITE',
    reset: 'RESET'
}

const reducerObject = (state, payload) => ({
    [actionTypes.confirm]: {
        ...state,
        error: false,
        loading: false,
        confirmed: true,
    },
    [actionTypes.error]: {
        ...state,
        error: true,
        loading: false,
    },
    [actionTypes.write]: {
        ...state,
        value: payload,
    },
    [actionTypes.check]: {
        ...state,
        loading: true,
        error: false,
    },
    [actionTypes.delete]: {
        ...state,
        deleted: true,

    },
    [actionTypes.reset]:{
        ...state,
        confirmed: false,
        deleted: false,
        value: '',
    }

});


const reducer = (state, action) => {
    if (reducerObject(state)[action.type]) {
        return reducerObject(state, action.payload)[action.type];
    } else {
        return state;
    }
}

export { UseReducer }