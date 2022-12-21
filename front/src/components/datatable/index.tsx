import Loader from './Loader';

interface Prop {
    headers: Record<
        string,
        {
            name: string;
        }
    >;
    actions: Record<string, CallableFunction>;
    editString?: string;
    deleteString?: string;
    data: unknown[];
    isLoading: boolean;
}

const DataTable = ({ actions, headers, data, isLoading }: Prop) => {
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

                                        {Object.keys(actions).length ? (
                                            <td>
                                                {Object.entries(actions).map((btn, idx) => (
                                                    <button
                                                        key={idx}
                                                        className="btn btn-outline-dark"
                                                        style={{ marginInlineEnd: '5px' }}
                                                        onClick={async () => await btn[1](item)}
                                                    >
                                                        {btn[0]}
                                                    </button>
                                                ))}
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
