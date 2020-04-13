import { getRandomInt } from "@shared/functions";
import { MockDaoMock } from "./MockDb/MockDao.mock";

export interface Documents {
  id: number;
  title: string;
  description: string;
}

export interface IDocumentsDao {
  getAll: () => Promise<Documents[]>;
  get: (id: number) => Promise<Documents | null>;

  add: (title: string, description: string) => Promise<void>;
}

export class DocumentsDao extends MockDaoMock implements IDocumentsDao {
  public async getAll(): Promise<Documents[]> {
    try {
      const db = await super.openDocumentsDb();
      return db.documents;
    } catch (err) {
      throw err;
    }
  }

  public async get(id: number): Promise<Documents | null> {
    try {
      const db = await super.openDocumentsDb();
      for (const docs of db.documents) {
        if (docs.id === id) {
          return docs;
        }
      }
      throw new Error("Document not found");
    } catch (err) {
      throw err;
    }
  }

  public async add(title: string, description: string): Promise<void> {
    try {
      const db = await super.openDocumentsDb();
      const docs: Documents = {
        id: getRandomInt(),
        title,
        description,
      };
      db.documents.push(docs);
      await super.saveDocumentsDb(db);
    } catch (err) {
      throw err;
    }
  }
}
