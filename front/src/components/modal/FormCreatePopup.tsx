import React, { FormEvent, SetStateAction, Dispatch, useState, useRef } from 'react';

type Input = {
    name: string;
    type: string;
    placeholder?: string;
    label?: string;
};
interface Props {
    inputs: Input[];
    buttons?: {
        close: string;
        save: string;
    };
    id: string;
    title: string;
    onError: (e: unknown, s: Dispatch<SetStateAction<string[]>>) => void;
    onSubmit: CallableFunction;
}

const FormCreatePopup = ({
    inputs,
    id,
    onSubmit,
    onError,
    title,
    buttons = {
        close: 'close',
        save: 'save',
    },
}: Props) => {
    const [err, setErr] = useState<string[]>([]);
    const fieldsRef = useRef([]);
    const formData = (): Record<string, string | number> => {
        const result: Record<string, string | number> = {};
        fieldsRef.current.forEach((input: HTMLInputElement) => {
            if (input) result[input.name] = input.value;
        });
        return result;
    };
    const onSubmitFn = async (event: FormEvent) => {
        try {
            event.preventDefault();
            const data = formData();
            await onSubmit(data);
        } catch (error) {
            onError(error, setErr);
        }
    };
    return (
        <div
            className="modal fade"
            id={id}
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <form onSubmit={onSubmitFn}>
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
                            {inputs.map(({ type, name, label, placeholder }, idx) => (
                                <div key={idx} className="mb-3">
                                    {label && (
                                        <label htmlFor="recipient-name" className="col-form-label">
                                            {label}
                                        </label>
                                    )}
                                    <input
                                        ref={(element) => {
                                            fieldsRef.current.push(element as never);
                                        }}
                                        type={type}
                                        name={name}
                                        placeholder={placeholder}
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
export default FormCreatePopup;
