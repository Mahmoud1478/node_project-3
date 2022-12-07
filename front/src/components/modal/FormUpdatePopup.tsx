import React, { SetStateAction, Dispatch, useState, ChangeEvent, FormEvent } from 'react';

type inputOption = {
    name: string;
    type: string;
    label?: boolean;
};
type Input = Record<string, inputOption>;
interface Props {
    inputs: Input;
    buttons?: {
        close: string;
        save: string;
    };
    id: string;
    title: string;
    onSubmit: CallableFunction;
    values: Record<string, number | string>;
    setValues: Dispatch<SetStateAction<any>>;
}

const FormUpdatePopup = ({
    inputs,
    values,
    setValues,
    id,
    onSubmit,
    title,
    buttons = {
        close: 'close',
        save: 'save',
    },
}: Props) => {
    const [err, setErr] = useState<string[]>([]);
    return (
        <div
            className="modal fade"
            id={id}
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <form
                    onSubmit={async (event: FormEvent) => {
                        event.preventDefault();
                        await onSubmit(setErr);
                    }}
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                {title}
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            {err.length ? (
                                <ul className="alert alert-danger py-1" role="alert">
                                    {err.map((e, idx) => (
                                        <li key={idx}>{e}</li>
                                    ))}
                                </ul>
                            ) : null}
                            {Object.entries(inputs).map(([label, options], idx) => (
                                <div key={idx} className="mb-3">
                                    {options.label && (
                                        <label htmlFor="recipient-name" className="col-form-label">
                                            {label}
                                        </label>
                                    )}
                                    <input
                                        type={options.type}
                                        name={options.name}
                                        placeholder={options.label ? undefined : label}
                                        value={values[options.name]}
                                        onChange={(e: ChangeEvent) => {
                                            const input = e.target as HTMLInputElement;
                                            setValues((prev: Record<string, any>) => {
                                                const state = {
                                                    ...prev,
                                                };
                                                state[options.name] = input.value;
                                                return state;
                                            });
                                        }}
                                        className="form-control"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-outline-danger"
                                data-bs-dismiss="modal"
                            >
                                {buttons.close}
                            </button>
                            <button type="submit" className="btn btn-outline-dark">
                                {buttons.save}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default FormUpdatePopup;
