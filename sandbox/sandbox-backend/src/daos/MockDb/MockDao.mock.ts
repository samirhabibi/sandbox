import jsonfile from "jsonfile";
import { Image } from "@daos/ImageDao";
import { Documents } from "../DocumentsDao";

interface MockDb {
  images: Image[];
  documents: Documents[];
}

export class MockDaoMock {
  private readonly dbFilePath = "src/daos/MockDb/MockDb.json";
  private readonly DocumentsFilePath = "src/daos/MockDb/MockDd.documents.json";

  protected openDb(): Promise<MockDb> {
    return jsonfile.readFile(this.dbFilePath);
  }
  protected saveDb(db: any): Promise<any> {
    return jsonfile.writeFile(this.dbFilePath, db);
  }

  protected openDocumentsDb(): Promise<MockDb> {
    return jsonfile.readFile(this.DocumentsFilePath);
  }

  protected saveDocumentsDb(db: any): Promise<any> {
    return jsonfile.writeFile(this.DocumentsFilePath, db);
  }
}
