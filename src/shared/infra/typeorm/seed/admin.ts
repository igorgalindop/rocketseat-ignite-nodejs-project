import { hash } from 'bcryptjs';
import { v4 as uuidV4 } from 'uuid';

import createConnection from '../index';

(async function create() {
    const connection = await createConnection('localhost');

    const id = uuidV4();
    const password = await hash('admin', 8);

    await connection.query(
        `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license
        VALUES('${id}', 'admin', 'admin@email.com', '${password}', true, 'now()', 'XXXXXXXX')
        `
    );

    await connection.close;
})().then(() => console.log('User admin created!'));
