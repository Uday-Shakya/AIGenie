import multar from 'multer';

const storage = multar.diskStorage({});


export const upload = multar({ storage });