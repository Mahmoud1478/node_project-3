import Loader from './Loader';

interface Prop {
    headers: Record<
        string,
        {
            name: string;
        }
    >;
    actions: boolean;
    editString?: string;
    deleteString?: string;
    data: unknown[];
    isLoading: boolean;
    onDelete?: CallableFunction;
    onEdit?: CallableFunction;
}

const DataTable = ({ actions, headers, data, isLoading, onDelete, onEdit }: Prop) => {
    return (
        <>
            <div className="container" style={{ minHeight: '44.2vh' }}>
                <table className="table my-5">
                    <thead className="table-dark" style={{ maxHeight: '50px' }}>
                        <tr>
                            {Object.values(headers).map(({ name }, idx) => (
                                <th key={idx} scope="col">
                                    {name}
                                </th>
                            ))}
                            {actions ? <th scope="col">Actions</th> : null}
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr
                                className="text-center"
                                style={{ height: '200px', position: 'relative' }}
                            >
                                <td colSpan={Object.keys(headers).length + 1}>
                                    {
                                        <Loader
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%,-50%)',
                                            }}
                                        />
                                    }
                                </td>
                            </tr>
                        ) : data.length ? (
                            data.map((item, idx) => {
                                return (
                                    <tr key={idx}>
                                        {Object.keys(headers).map((header, idx) => (
                                            <th key={idx} scope="row">
                                                {(item as Record<string, string | number>)[header]}
                                            </th>
                                        ))}
                                        {actions ? (
                                            <td>
                                                {onEdit ? (
                                                    <button
                                                        className="btn btn-outline-dark"
                                                        style={{ marginInlineEnd: '5px' }}
                                                        onClick={async () => await onEdit(item)}
                                                    >
                                                        edit
                                                    </button>
                                                ) : null}
                                                {onDelete ? (
                                                    <button
                                                        className="btn btn-outline-dark"
                                                        onClick={async () => await onDelete(item)}
                                                    >
                                                        delete
                                                    </button>
                                                ) : null}
                                            </td>
                                        ) : null}
                                    </tr>
                                );
                            })
                        ) : (
                            <tr
                                className="text-center"
                                style={{ height: '200px', position: 'relative' }}
                            >
                                <td colSpan={Object.keys(headers).length + 1}>
                                    {
                                        <h3
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%,-50%)',
                                            }}
                                        >
                                            No Available Data
                                        </h3>
                                    }
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};
export default DataTable;
