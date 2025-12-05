function ViewAPIKeys() {
    return (
        <table className="api-keys-table">
            <thead className="ak-head">
                <tr className="ak-head-row">
                    <th className="ak-col ak-col-key">API Key</th>
                    <th className="ak-col ak-col-project">Project</th>
                    <th className="ak-col ak-col-created">Created On</th>
                </tr>
            </thead>

            <tbody className="ak-body">

                <tr className="ak-row">
                    <td className="ak-cell ak-cell-key">sk_live_9f23b1c8a4ef12cd</td>
                    <td className="ak-cell ak-cell-project">User Service</td>
                    <td className="ak-cell ak-cell-date">2025-01-21</td>
                </tr>

                <tr className="ak-row">
                    <td className="ak-cell ak-cell-key">sk_live_72ffaa19d31e092b</td>
                    <td className="ak-cell ak-cell-project">Payments API</td>
                    <td className="ak-cell ak-cell-date">2025-01-18</td>
                </tr>

                <tr className="ak-row">
                    <td className="ak-cell ak-cell-key">sk_live_5e91e7cd0bb29e01</td>
                    <td className="ak-cell ak-cell-project">Notifications Service</td>
                    <td className="ak-cell ak-cell-date">2025-01-11</td>
                </tr>

                <tr className="ak-row">
                    <td className="ak-cell ak-cell-key">sk_live_f1ceb2a9c0de7aa3</td>
                    <td className="ak-cell ak-cell-project">Analytics Engine</td>
                    <td className="ak-cell ak-cell-date">2025-01-09</td>
                </tr>

                <tr className="ak-row">
                    <td className="ak-cell ak-cell-key">sk_live_baa7f41fc2a3e917</td>
                    <td className="ak-cell ak-cell-project">Search Service</td>
                    <td className="ak-cell ak-cell-date">2025-01-06</td>
                </tr>

                <tr className="ak-row">
                    <td className="ak-cell ak-cell-key">sk_live_0c2e19b84f77d13e</td>
                    <td className="ak-cell ak-cell-project">File Storage API</td>
                    <td className="ak-cell ak-cell-date">2025-01-03</td>
                </tr>

            </tbody>
        </table>
    );
}

export default ViewAPIKeys;
