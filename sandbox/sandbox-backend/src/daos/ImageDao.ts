import { getRandomInt } from '@shared/functions';
import { MockDaoMock } from './MockDb/MockDao.mock';

export interface Image {
    id: number;
    title: string;
    description: string;
    source: string;
}


export interface IImagesDao {
    get: (id: number) => Promise<Image | null>;
    getAll: () => Promise<Image[]>;

    add: (title: string, description: string, source: string) => Promise<void>;
    delete: (id: number) => Promise<void>;
}

export class ImageDao extends MockDaoMock implements IImagesDao {


    public async get(id: number): Promise<Image | null> {
        try {
            const db = await super.openDb();
            for (const img of db.images) {
                if (img.id === id) {
                    return img;
                }
            }
            throw new Error('Image not found');
        } catch (err) {
            throw err;
        }
    }


    public async getAll(): Promise<Image[]> {
        try {
            const db = await super.openDb();
            return db.images;
        } catch (err) {
            throw err;
        }
    }


    public async add(title: string, description: string, source: string): Promise<void> {
        try {
            const db = await super.openDb();
            const img: Image = {
                id: getRandomInt(),
                title,
                description,
                source,
            }
            db.images.push(img);
            await super.saveDb(db);
        } catch (err) {
            throw err;
        }
    }


    public async delete(id: number): Promise<void> {
        try {
            const db = await super.openDb();
            if (!db.images.find(i => i.id === id)) {
                throw new Error('Image not found');
            }

            db.images = db.images.filter(i => i.id !== id);
            await super.saveDb(db);
        } catch (err) {
            throw err;
        }
    }
}
